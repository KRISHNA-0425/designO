import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { create } from 'zustand'
import ELK from 'elkjs/lib/elk.bundled.js'

const elk = new ELK();

export const useDiagramStore = create((set, get) => ({
    nodes: [],
    edges: [],
    // ⚡ Keeps a reference to React Flow's viewport instance mapping
    reactFlowInstance: null,

    setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),

    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) })
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) })
    },

    onConnect: (connection) => {
        const customizedEdge = {
            ...connection,
            animated: true,
            selectable: true,
            style: { stroke: '#000000', strokeWidth: 3 },
        };
        set({ edges: addEdge(customizedEdge, get().edges) })
    },

    // 🚀 FIX 1: SMART SPAWNING POSITION MECHANICS
    addNode: (customLabel) => {
        const { nodes, reactFlowInstance } = get();
        const nodeId = `node_${Date.now()}`;

        // Default viewport coordinates
        let spawnX = 150 + (nodes.length * 35);
        let spawnY = 150 + (nodes.length * 35);

        // If the user has panned/zoomed, find the exact dead-center coordinates of their current view screen!
        if (reactFlowInstance) {
            const viewport = reactFlowInstance.getViewport();
            const center = reactFlowInstance.screenToFlowPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
            // Random jitter factor offset prevents exact overlaps if you hit Enter multiple times rapidly
            const jitter = (Math.random() - 0.5) * 40;
            spawnX = center.x + jitter - 90; // Center offset adjusted for node width (180/2)
            spawnY = center.y + jitter - 65; // Center offset adjusted for node height (130/2)
        }

        const newNode = {
            id: nodeId,
            type: 'brutalNode',
            style: { width: 180, height: 130 },
            data: { label: customLabel },
            position: { x: spawnX, y: spawnY },
        };

        set({ nodes: [...nodes, newNode] })
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

    // 🚀 FIX 2: CORRECTED SPACING + DYNAMIC ZOOM OUT REARRANGEMENT
    autoLayout: async () => {
        const { nodes, edges, reactFlowInstance } = get();
        if (nodes.length === 0) return;

        const graph = {
            id: "root",
            layoutOptions: {
                "elk.algorithm": "layered",
                "elk.direction": "RIGHT",

                // Gap BETWEEN columns/layers — this is the horizontal spacing
                // you actually see with elk.direction = RIGHT. The previous
                // "nodeNodeLayered" key isn't a real ELK option, so this gap
                // was silently falling back to ELK's tiny 20px default.
                "elk.layered.spacing.nodeNodeBetweenLayers": "180",

                // Gap between nodes stacked within the same column/layer
                "elk.spacing.nodeNode": "100",

                // Breathing room so edges routed between layers don't hug nodes
                "elk.layered.spacing.edgeNodeBetweenLayers": "60",

                "elk.padding": "[top=100,left=100,bottom=100,right=100]" // Extra outer layout bounding padding box cushion
            },
            children: nodes.map((node) => ({
                id: node.id,
                width: node.style?.width || 180,
                height: node.style?.height || 130,
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
                    // Bouncy easing curve creates a highly satisfying physical sliding transition animation effect
                    style: { ...node.style, transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }
                };
            });

            set({ nodes: layoutNodes });

            // 🚀 DYNAMIC SMART CAMERA ZOOM CODES:
            // Automatically sweeps the viewport backward to capture everything clearly inside frame boundaries
            if (reactFlowInstance) {
                setTimeout(() => {
                    reactFlowInstance.fitView({
                        duration: 700, // Syncs perfectly with the 0.7s node sliding translation duration
                        padding: 0.35,  // 🌟 INCREASED ZOOM BUFFER: 0.35 means 35% empty screen padding on all outer edges
                        includeHiddenNodes: false
                    });
                }, 50);
            }

            // Safely strip the CSS transition properties away after the animation ends to maintain fluid manual dragging
            setTimeout(() => {
                set({
                    nodes: get().nodes.map(n => ({ ...n, style: { ...n.style, transition: undefined } }))
                });
            }, 750);

        } catch (error) {
            console.error("The ELK Dynamic Rearrangement layout grid pass failed:", error);
        }
    },

    deleteNode: (nodeToDelete) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeToDelete),
            edges: get().edges.filter((edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete)
        })
    },
    deleteEdge: (edgeIdToDelete) => {
        set({ edges: get().edges.filter((edge) => edge.id !== edgeIdToDelete) })
    },
    deleteAll: () => { set({ nodes: [], edges: [] }) }
}))