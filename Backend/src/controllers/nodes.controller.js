import Node from '../models/node.model.js';
import Edge from '../models/edge.model.js';

// 1. SAVE COMPLETED CANVAS (OVERWRITE BATCH WRITE)
export const saveDiagram = async (req, res) => {
    try {
        const { nodes, edges } = req.body;
        
        //  Coming straight out of your isAuth middleware!
        const userId = req.user._id; 

        if (!Array.isArray(nodes) || !Array.isArray(edges)) {
            return res.status(400).json({ message: "Invalid payload format. Nodes and Edges must be arrays." });
        }

        // 🗑️ STEP 1: Clear out all previous canvas configurations for this user
        await Node.deleteMany({ userId });
        await Edge.deleteMany({ userId });

        // 🗺️ STEP 2: Map frontend React Flow elements to match our MongoDB Schema structures
        const nodesToInsert = nodes.map(node => ({
            userId,
            nodeId: node.id,
            type: node.type || 'brutalNode',
            label: node.data?.label || '',
            description: node.data?.description || '',
            position: {
                x: node.position.x,
                y: node.position.y
            },
            measured: {
                width: node.measured?.width || 180,
                height: node.measured?.height || 120
            }
        }));

        const edgesToInsert = edges.map(edge => ({
            userId,
            edgeId: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            style: edge.style || { stroke: '#000000', strokeWidth: 3 }
        }));

        // 🚀 STEP 3: Write both fresh data pools in a single parallel handshake operation
        await Promise.all([
            nodesToInsert.length > 0 ? Node.insertMany(nodesToInsert) : Promise.resolve(),
            edgesToInsert.length > 0 ? Edge.insertMany(edgesToInsert) : Promise.resolve()
        ]);

        return res.status(200).json({ message: "Diagram saved successfully!" });

    } catch (error) {
        console.error(" Save Diagram Error:", error);
        return res.status(500).json({ message: "Failed to save diagram configuration", error: error.message });
    }
};

// 2. FETCH SAVED CANVAS LAYOUT (RECONSTRUCT FOR REACT FLOW)
export const getDiagram = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch data from both collections at the same time
        const [savedNodes, savedEdges] = await Promise.all([
            Node.find({ userId }),
            Edge.find({ userId })
        ]);

        // 🛠️ Remap database structures to match the specific array objects React Flow parses
        const nodes = savedNodes.map(node => ({
            id: node.nodeId,
            type: node.type,
            position: { x: node.position.x, y: node.position.y },
            measured: { width: node.measured.width, height: node.measured.height },
            data: { 
                label: node.label, 
                description: node.description 
            }
        }));

        const edges = savedEdges.map(edge => ({
            id: edge.edgeId,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            style: edge.style
        }));

        return res.status(200).json({ nodes, edges });

    } catch (error) {
        console.error(" Get Diagram Error:", error);
        return res.status(500).json({ message: "Failed to retrieve diagram layout", error: error.message });
    }
};

// 3. WIPE WORKSPACE (RESET BACK TO BLANK CANVAS)
export const clearDiagram = async (req, res) => {
    try {
        const userId = req.user._id;

        await Promise.all([
            Node.deleteMany({ userId }),
            Edge.deleteMany({ userId })
        ]);

        return res.status(200).json({ message: "Canvas reset successfully." });
    } catch (error) {
        console.error(" Clear Diagram Error:", error);
        return res.status(500).json({ message: "Failed to wipe workspace", error: error.message });
    }
};