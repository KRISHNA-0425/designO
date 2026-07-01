import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from '@xyflow/react';
import { create } from 'zustand';
import API from '../api/axios'; // Linked to your custom Axios utility

const HORIZONTAL_GAP = 180;
const VERTICAL_GAP = 60;

export const useDiagramStore = create((set, get) => ({
    // --- STATE FIELDS ---
    nodes: [],
    edges: [],
    reactFlowInstance: null,
    selectedNodeId: null, 
    
    // Server Synchronization Sync States
    isSaving: false,
    isFetching: false,
    diagramError: null,

    // --- SYNCHRONIZER ACTIONS ---
    setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),

    onNodesChange: (changes) => {
        const selectedId = get().selectedNodeId;
        const isDeleted = changes.some(c => c.type === 'remove' && c.id === selectedId);
        
        set({ 
            nodes: applyNodeChanges(changes, get().nodes),
            selectedNodeId: isDeleted ? null : selectedId
        });
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) })
    },

    onConnect: (connection) => {
        const customizedEdge = {
            ...connection,
            type: 'smoothstep',
            animated: true,
            selectable: true,
            style: {
                stroke: '#000000',
                strokeWidth: 2.5,
                strokeDasharray: '6,4',
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#000000',
            },
        };
        set({ edges: addEdge(customizedEdge, get().edges) })
    },

    // --- NODE MODIFICATION ACTIONS ---
    addNode: (customLabel, description = '') => {
        const { nodes, reactFlowInstance } = get();
        const nodeId = `node_${Date.now()}`;

        let spawnX = 150 + (nodes.length * 35);
        let spawnY = 150 + (nodes.length * 35);

        if (reactFlowInstance) {
            const center = reactFlowInstance.screenToFlowPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
            const jitter = (Math.random() - 0.5) * 40;
            spawnX = center.x + jitter - 100; 
            spawnY = center.y + jitter - 75;  
        }

        const newNode = {
            id: nodeId,
            type: 'brutalNode',
            style: { width: 200, height: 150 },
            data: { 
                label: customLabel,
                description: description 
            },
            position: { x: spawnX, y: spawnY },
        };

        set({ 
            nodes: [...nodes, newNode],
            selectedNodeId: nodeId 
        });
    },

    updateNodeData: (nodeId, updatedFields) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...updatedFields
                        }
                    };
                }
                return node;
            })
        });
    },

    onNodeResize: (nodeId, dimensions) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        style: {
                            ...node.style,
                            width: dimensions.width,
                            height: dimensions.height,
                        },
                    };
                }
                return node;
            }),
        });
    },

    deleteNode: (nodeToDelete) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeToDelete),
            edges: get().edges.filter((edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete),
            selectedNodeId: get().selectedNodeId === nodeToDelete ? null : get().selectedNodeId
        })
    },

    deleteEdge: (edgeIdToDelete) => {
        set({ edges: get().edges.filter((edge) => edge.id !== edgeIdToDelete) })
    },

    deleteAll: () => { set({ nodes: [], edges: [], selectedNodeId: null }) },

    // --- BACKEND DATABASE REST CHANNELS ---

    // 1. SAVE CANVAS (POST to /node/save)
    // ⚡ This is only ever triggered manually — by the "Save Architecture" button in Playground.jsx.
    // No other action in this store or in components calls this automatically.
    saveDiagram: async () => {
        set({ isSaving: true, diagramError: null });
        try {
            // Grab the absolute absolute current states using get() explicitly
            const currentNodes = get().nodes || [];
            const currentEdges = get().edges || [];
            
            // ⚡ FORCE STRICT ARRAY FALLBACK VALUES BEFORE TRANSMITTING
            const payload = {
                nodes: Array.isArray(currentNodes) ? currentNodes : [],
                edges: Array.isArray(currentEdges) ? currentEdges : []
            };

            const res = await API.post('/node/save', payload);

            set({ isSaving: false });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to backup canvas coordinates ✕";
            set({ isSaving: false, diagramError: msg });
            console.error("Zustand Save Error:", err.response?.data);
            return { success: false, error: msg };
        }
    },

    // 2. FETCH CANVAS (GET to /node)
    fetchDiagram: async () => {
        set({ isFetching: true, diagramError: null });
        try {
            const res = await API.get('/node');
            
            set({
                nodes: res.data.nodes || [],
                edges: res.data.edges || [],
                isFetching: false
            });

            // Automatically recalibrate active view boundaries
            const instance = get().reactFlowInstance;
            if (instance && res.data.nodes?.length > 0) {
                setTimeout(() => instance.fitView({ padding: 0.2, duration: 400 }), 100);
            }
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to download node coordinates ✕";
            set({ isFetching: false, diagramError: msg });
            return { success: false, error: msg };
        }
    },

    // 3. WIPE WORKSPACE DATABASE-SIDE (DELETE to /node/delete)
    clearBackendWorkspace: async () => {
        set({ isSaving: true, diagramError: null });
        try {
            await API.delete('/node/delete');
            
            // Wipe client state locally too
            set({ 
                nodes: [], 
                edges: [], 
                selectedNodeId: null,
                isSaving: false 
            });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to clear remote workspace ✕";
            set({ isSaving: false, diagramError: msg });
            return { success: false, error: msg };
        }
    },

    // --- AUTO LAYOUT ALGORITHM ENGINE (custom Sugiyama-style layered layout) ---
    // Guarantees: strict left → right layering, single in/out chains rendered
    // as a straight horizontal line, and multi-child fan-outs stacked top → bottom.
    autoLayout: () => {
        const { nodes, edges, reactFlowInstance } = get();
        if (nodes.length === 0) return;

        const nodeWidth = (n) => n.style?.width || 200;
        const nodeHeight = (n) => n.style?.height || 150;

        // Build adjacency maps
        const outgoing = {}; // id -> [targetIds]
        const incoming = {}; // id -> [sourceIds]
        nodes.forEach(n => { outgoing[n.id] = []; incoming[n.id] = []; });
        edges.forEach(e => {
            if (outgoing[e.source] && incoming[e.target]) {
                outgoing[e.source].push(e.target);
                incoming[e.target].push(e.source);
            }
        });

        // --- STEP 1: Assign layers (x-axis) via longest path from roots ---
        const layer = {};
        nodes.forEach(n => { layer[n.id] = 0; });

        let changed = true;
        let iterations = 0;
        const maxIterations = nodes.length + 5; // guards against cycles
        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;
            edges.forEach(e => {
                if (layer[e.source] === undefined || layer[e.target] === undefined) return;
                if (layer[e.target] < layer[e.source] + 1) {
                    layer[e.target] = layer[e.source] + 1;
                    changed = true;
                }
            });
        }

        // Group nodes by layer
        const layerGroups = {};
        nodes.forEach(n => {
            const l = layer[n.id];
            if (!layerGroups[l]) layerGroups[l] = [];
            layerGroups[l].push(n.id);
        });
        const sortedLayerKeys = Object.keys(layerGroups).map(Number).sort((a, b) => a - b);

        // --- STEP 2: Order nodes within each layer via barycenter of parents ---
        const orderIndex = {};
        nodes.forEach((n, i) => { orderIndex[n.id] = i; });

        layerGroups[sortedLayerKeys[0]].sort((a, b) => orderIndex[a] - orderIndex[b]);
        layerGroups[sortedLayerKeys[0]].forEach((id, idx) => { orderIndex[id] = idx; });

        for (let i = 1; i < sortedLayerKeys.length; i++) {
            const layerKey = sortedLayerKeys[i];
            const group = layerGroups[layerKey];

            const barycenters = {};
            group.forEach(id => {
                const parents = incoming[id].filter(p => layer[p] < layerKey);
                barycenters[id] = parents.length > 0
                    ? parents.reduce((sum, p) => sum + orderIndex[p], 0) / parents.length
                    : orderIndex[id];
            });

            group.sort((a, b) => barycenters[a] - barycenters[b]);
            group.forEach((id, idx) => { orderIndex[id] = idx; });
        }

        // --- STEP 3: X position per layer (left → right) ---
        const layerX = {};
        let cumulativeX = 0;
        sortedLayerKeys.forEach((layerKey) => {
            layerX[layerKey] = cumulativeX;
            const maxWidthInLayer = Math.max(
                ...layerGroups[layerKey].map(id => nodeWidth(nodes.find(n => n.id === id)))
            );
            cumulativeX += maxWidthInLayer + HORIZONTAL_GAP;
        });

        // --- STEP 4: Initial Y position per layer, stacked top → bottom in order ---
        const positions = {};
        sortedLayerKeys.forEach((layerKey) => {
            const group = [...layerGroups[layerKey]].sort((a, b) => orderIndex[a] - orderIndex[b]);
            let cumulativeY = 0;
            group.forEach((id) => {
                const node = nodes.find(n => n.id === id);
                const h = nodeHeight(node);
                positions[id] = { x: layerX[layerKey], y: cumulativeY };
                cumulativeY += h + VERTICAL_GAP;
            });
        });

        // --- STEP 5: Straighten pure 1-in/1-out chains, resolve overlaps by nudging down ---
        for (let i = 1; i < sortedLayerKeys.length; i++) {
            const layerKey = sortedLayerKeys[i];
            const group = [...layerGroups[layerKey]].sort((a, b) => orderIndex[a] - orderIndex[b]);

            let lastBottom = -Infinity;
            group.forEach((id) => {
                const parents = incoming[id];
                const node = nodes.find(n => n.id === id);
                const h = nodeHeight(node);

                let desiredY = positions[id].y;

                // Straight-line rule: single parent that has only this one child
                if (parents.length === 1 && outgoing[parents[0]].length === 1) {
                    desiredY = positions[parents[0]].y;
                }

                const minY = lastBottom === -Infinity ? desiredY : lastBottom + VERTICAL_GAP;
                const finalY = Math.max(desiredY, minY);

                positions[id] = { x: positions[id].x, y: finalY };
                lastBottom = finalY + h;
            });
        }

        const layoutNodes = nodes.map((node) => ({
            ...node,
            position: positions[node.id] || node.position,
            style: { ...node.style, transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }
        }));

        set({ nodes: layoutNodes });

        if (reactFlowInstance) {
            setTimeout(() => {
                reactFlowInstance.fitView({
                    duration: 700, 
                    padding: 0.35,  
                    includeHiddenNodes: false
                });
            }, 50);
        }

        setTimeout(() => {
            set({
                nodes: get().nodes.map(n => ({ ...n, style: { ...n.style, transition: undefined } }))
            });
        }, 750);
    }
}));