import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE OMNIDIRECTIONAL NODE COMPONENT
// 🔥 FIX 1: Destructured 'selected' right here so the NodeResizer has its visual trigger!
const CustomBrutalistNode = ({ id, data, selected }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)

    return (
        <>
            {/* 📐 THE RESIZER COMPONENT */}
            <NodeResizer
                isVisible={true} //selected is when we select the node
                minWidth={150}
                minHeight={80}
                lineClassName="!border-black !border-2" 
                handleClassName="!bg-black !w-2.5 !h-2.5 !rounded-none !border-2 !border-white" 
            />

            {/* 🔥 FIX 2: Swapped out 'min-w-[160px]' for 'w-full h-full' so that the HTML 
                body elements dynamically scale alongside the NodeResizer bounding boxes! */}
            <div className="w-full h-full p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] font-mono relative transition-all hover:bg-yellow-50 flex flex-col justify-between pb-12">
                
                {/* TOP PORTS */}
                <Handle type="target" position={Position.Top} id="t-top" className="!bg-black !w-2 !h-2 !rounded-none !left-[35%] !top-[-6px]" />
                <Handle type="source" position={Position.Top} id="s-top" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[65%] !top-[-6px]" />

                {/* BOTTOM PORTS */}
                <Handle type="target" position={Position.Bottom} id="t-bot" className="!bg-black !w-2 !h-2 !rounded-none !left-[35%] !bottom-[-6px]" />
                <Handle type="source" position={Position.Bottom} id="s-bot" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[65%] !bottom-[-6px]" />

                {/* LEFT PORTS */}
                <Handle type="target" position={Position.Left} id="t-left" className="!bg-black !w-2 !h-2 !rounded-none !left-[-6px] !top-[35%]" />
                <Handle type="source" position={Position.Left} id="s-left" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[-6px] !top-[65%]" />

                {/* RIGHT PORTS */}
                <Handle type="target" position={Position.Right} id="t-right" className="!bg-black !w-2 !h-2 !rounded-none !right-[-6px] !top-[35%]" />
                <Handle type="source" position={Position.Right} id="s-right" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !right-[-6px] !top-[65%]" />

                {/* LABEL TEXT CONTAINER */}
                <div className="text-xs font-black uppercase text-black mb-3 tracking-tight select-none break-words">
                    {data.label}
                </div>

                {/* INTERACTIVE NODE DELETE BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteNode(id)
                    }}
                    className="absolute bottom-2 right-2 bg-red-500 text-white border-2 border-black p-1 flex items-center justify-center transition-all hover:bg-black cursor-pointer z-30"
                >
                    <MdDeleteForever size={14} />
                </button>
            </div>
        </>
    )
}

const defaultEdgeOptions = {
    selectable: true,
    style: { stroke: '#000000', strokeWidth: 3, cursor: 'pointer' } 
};

// 2. MAIN CANVAS VIEWPORT RENDERER
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteAll, deleteEdge } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    return (
        <div className="w-full h-full relative">

            <button
                onClick={deleteAll}
                className="absolute top-4 left-4 z-50 text-xs font-black uppercase tracking-wider bg-red-500 text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            >
                Clear Canvas ✕
            </button>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeClick={(event, edge) => {
                    deleteEdge(edge.id); 
                }}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
            >
                <Background color="#000000" gap={16} opacity={0.15} />
                <Controls className="!border-2 !border-black !shadow-none !rounded-none" />
            </ReactFlow>
        </div>
    )
}

export default Addnode