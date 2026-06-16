import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { create } from 'zustand'

export const useDiagramStore = create((set, get) => ({

    // initial states of the nodes and edges
    nodes: [],
    edges: [],

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
            style: { stroke: '#000000', strokeWidth: 1, width: 160, height: 100 },
        };
        set({ edges: addEdge(customizedEdge, get().edges) })
    },

    // 2. DYNAMIC TYPE ASSIGNMENT FOR NEW SPAWNS
    addNode: () => {
        const currentNode = get().nodes;
        const nodeId = `node_${Date.now()}`;

        const newNode = {
            id: nodeId,
            type: 'brutalNode', // 🔥 ADD THIS HERE TOO! Forces every new card to get the custom styles and buttons.
            data: {
                label: `hello_${currentNode.length + 1}`
            },
            position: {
                x: 100 + (currentNode.length * 30),
                y: 100 + (currentNode.length * 30)
            },
        };

        set({ nodes: [...currentNode, newNode] })
    },

    deleteNode: (nodeToDelete) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeToDelete),
            edges: get().edges.filter((edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete)
        })
    },
    deleteEdge: (edgeIdToDelete) => {
        set({
            edges: get().edges.filter((edge) => edge.id !== edgeIdToDelete)
        })
    },
    deleteAll: () => {
        set({ nodes: [], edges: [] })
    }
}))