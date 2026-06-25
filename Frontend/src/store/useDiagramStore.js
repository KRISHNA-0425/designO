import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from '@xyflow/react';
import { create } from 'zustand';
import ELK from 'elkjs/lib/elk.bundled.js';
import API from '../api/axios';

const elk = new ELK();

// 🎨 SINGLE SOURCE OF TRUTH FOR THE CRISP NEO-BRUTALIST ARCHITECTURAL STYLE
// Aligned with the exact look from your blueprint image!
const EDGE_VISUALS = {
    type: 'smoothstep', // Right-angle orthogonal turns
    animated: true,    // ⚡ THE FIX: Changed from false to true to activate data flow animation!
    selectable: true,
    style: { 
        stroke: '#000000', 
        strokeWidth: 3, 
        strokeDasharray: '6,6' // Sharp dashed line layout pattern
    },
    markerEnd: {
        type: MarkerType.ArrowClosed, 
        width: 20,
        height: 20,
        color: '#000000',
    },
};

export const useDiagramStore = create((set, get) => ({
    // --- STATE FIELDS ---
    nodes: [],
    edges: [],
    reactFlowInstance: null,
    selectedNodeId: null, 
    
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
        // Enforce centralized visuals on newly created edges instantly
        const customizedEdge = {
            ...connection,
            ...EDGE_VISUALS,
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
                        data: { ...node.data, ...updatedFields }
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
    saveDiagram: async () => {
        set({ isSaving: true, diagramError: null });
        try {
            const currentNodes = get().nodes || [];
            const currentEdges = get().edges || [];
            
            const payload = {
                nodes: Array.isArray(currentNodes) ? currentNodes : [],
                edges: Array.isArray(currentEdges) ? currentEdges : []
            };

            await API.post('/node/save', payload);
            set({ isSaving: false });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to backup canvas coordinates ✕";
            set({ isSaving: false, diagramError: msg });
            return { success: false, error: msg };
        }
    },

    fetchDiagram: async () => {
        set({ isFetching: true, diagramError: null });
        try {
            const res = await API.get('/node');
            const fetchedNodes = res.data.nodes || [];

            // Apply style configurations cleanly onto items from the server
            const fetchedEdges = (res.data.edges || []).map((edge) => ({
                ...edge,
                ...EDGE_VISUALS,
            }));

            set({
                nodes: fetchedNodes,
                edges: fetchedEdges,
                isFetching: false
            });

            const instance = get().reactFlowInstance;
            if (instance && fetchedNodes.length > 0) {
                setTimeout(() => instance.fitView({ padding: 0.2, duration: 400 }), 100);
            }
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to download node coordinates ✕";
            set({ isFetching: false, diagramError: msg });
            return { success: false, error: msg };
        }
    },

    clearBackendWorkspace: async () => {
        set({ isSaving: true, diagramError: null });
        try {
            await API.delete('/node/delete');
            set({ nodes: [], edges: [], selectedNodeId: null, isSaving: false });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to clear remote workspace ✕";
            set({ isSaving: false, diagramError: msg });
            return { success: false, error: msg };
        }
    },

    autoLayout: async () => {
        const { nodes, edges, reactFlowInstance } = get();
        if (nodes.length === 0) return;

        const graph = {
            id: "root",
            layoutOptions: {
                "elk.algorithm": "layered",
                "elk.direction": "RIGHT",
                "elk.layered.spacing.nodeNodeBetweenLayers": "180",
                "elk.spacing.nodeNode": "100",
                "elk.layered.spacing.edgeNodeBetweenLayers": "60",
                "elk.padding": "[top=100,left=100,bottom=100,right=100]" 
            },
            children: nodes.map((node) => ({
                id: node.id,
                width: node.style?.width || 200,   
                height: node.style?.height || 150, 
            })),
            edges: edges.map((edge) => ({
                id: edge.id,
                sources: [edge.source],
                targets: [edge.target],
            })),
        };

        try {
            const layoutGraph = await elk.layout(graph);

            const layoutNodes = nodes.map((node) => {
                const elkNode = layoutGraph.children.find((child) => child.id === node.id);
                return {
                    ...node,
                    position: { x: elkNode.x, y: elkNode.y },
                    style: { ...node.style, transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }
                };
            });

            const layoutEdges = edges.map((edge) => ({
                ...edge,
                ...EDGE_VISUALS,
            }));

            set({ nodes: layoutNodes, edges: layoutEdges });

            if (reactFlowInstance) {
                setTimeout(() => {
                    reactFlowInstance.fitView({ duration: 700, padding: 0.35, includeHiddenNodes: false });
                }, 50);
            }

            setTimeout(() => {
                set({
                    nodes: get().nodes.map(n => ({ ...n, style: { ...n.style, transition: undefined } }))
                });
            }, 750);

        } catch (error) {
            console.error("ELK Auto Layout failed:", error);
        }
    }
}));