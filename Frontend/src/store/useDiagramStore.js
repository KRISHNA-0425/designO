import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { create } from 'zustand'

export const useDiagramStore = create((set, get) => ({
    // Initial sandbox node and edge data arrays
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
            style: { stroke: '#000000', strokeWidth: 3 }, // Thick Neo-Brutalist wire threads
        };
        set({ edges: addEdge(customizedEdge, get().edges) })
    },

    // Dynamic node creator with preset starting base dimension variables
    addNode: (customLabel) => {
        const currentNode = get().nodes;
        const nodeId = `node_${Date.now()}`;

        const newNode = {
            id: nodeId,
            type: 'brutalNode',
            // style parameters are required for NodeResizer coordinates to calculate fluidly
            style: { width: 200, height: 150 }, 
            data: {
                label: customLabel
            },
            position: {
                x: 100 + (currentNode.length * 30),
                y: 100 + (currentNode.length * 30)
            },
        };

        set({ nodes: [...currentNode, newNode] })
    },

    // Targets and filters a node box along with its loose connection wires out of memory
    deleteNode: (nodeToDelete) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeToDelete),
            edges: get().edges.filter((edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete)
        })
    },
    
    // Snap-erases a single targeted connection edge thread
    deleteEdge: (edgeIdToDelete) => {
        set({
            edges: get().edges.filter((edge) => edge.id !== edgeIdToDelete)
        })
    },
    
    // Total master board flush
    deleteAll: () => {
        set({ nodes: [], edges: [] })
    }
}))