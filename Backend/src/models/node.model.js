import mongoose from 'mongoose'


const nodeSchema = new mongoose.Schema({
    id: String,
    description: String,
    position: {
        x: Number,
        y: Number,
    },
    label: String
})


const Node = mongoose.model("Node", nodeSchema)
export default Node
