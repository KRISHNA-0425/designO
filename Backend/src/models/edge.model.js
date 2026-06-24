import mongoose from 'mongoose'

const edgeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // REACT FLOW EDGE ID: e.g., "xy-edge__node_1-node_2"
    edgeId: {
        type: String,
        required: true
    },
    source: {
        type: String, // The nodeId where the connection started
        required: true
    },
    target: {
        type: String, // The nodeId where the connection dropped
        required: true
    },
    sourceHandle: {
        type: String, // e.g., "port-left" or "port-right"
        required: true
    },
    targetHandle: {
        type: String, // e.g., "port-left" or "port-right"
        required: true
    },
    // Brutalist design styles matching your frontend configuration
    style: {
        stroke: { type: String, default: '#000000' },
        strokeWidth: { type: Number, default: 3 }
    }
}, {
    timestamps: true
});

const Edge = mongoose.model("Edge", edgeSchema);
export default Edge;