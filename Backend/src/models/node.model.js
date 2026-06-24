import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
    //  Connects this specific node to the User who created it
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //  REACT FLOW ID: React Flow uses custom strings for tracking (e.g., "node_1")
    nodeId: {
        type: String,
        required: [true, "React Flow node ID is required"]
    },
    type: {
        type: String,
        default: 'brutalNode' // Matches the nodeTypes key on your React Flow frontend canvas
    },
    label: {
        type: String,
        required: [true, "Node title/label is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    // MEASUREMENT EXTENSIONS: Tracks width/height updates triggered by your NodeResizer
    measured: {
        width: { type: Number, default: 180 },
        height: { type: Number, default: 120 }
    }
}, {
    timestamps: true
});

// Avoid duplicate node IDs within the context of a single user's diagram space
nodeSchema.index({ userId: 1, nodeId: 1 }, { unique: true });

const Node = mongoose.model("Node", nodeSchema)
export default Node

