import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore' // Points directly to your store [cite: 493]
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE OMNIDIRECTIONAL NODE COMPONENT
const CustomBrutalistNode = ({ id, data }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode) // [cite: 495]

    return (
        <>
            {/* Added pb-12 so long node names never stretch over your absolute trash bin icon */}
            <div className="p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] min-w-[160px] font-mono relative transition-all hover:bg-yellow-50 pb-12">
                {/* OMNIDIRECTIONAL PORTS (Targets = Black | Sources = Lime) */}
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
                <div className="text-xs font-black uppercase text-black mb-3 tracking-tight">
                    {data.label}
                </div>

                {/* INTERACTIVE DELETE BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation() // [cite: 499]
                        deleteNode(id)      // [cite: 499]
                    }}
                    className="absolute bottom-2 right-2 bg-red-500 text-white border-2 border-black p-1 flex items-center justify-center transition-all hover:bg-black cursor-pointer z-30"
                >
                    <MdDeleteForever size={14} />
                </button>
            </div>
        </>
    )
}

// 2. MAIN CANVAS VIEWPORT RENDERER
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteAll } = useDiagramStore() // [cite: 501]

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), []) // [cite: 501]

    return (
        <div className="w-full h-full relative">
            
            {/* 🔥 THE FIX: Positioned on top of the map layer with clear styling */}
            <button 
                onClick={deleteAll} 
                className="absolute top-4 left-4 z-50 text-xs font-black uppercase tracking-wider bg-red-500 text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            >
                Clear Canvas ✕
            </button>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes} // [cite: 501]
                onNodesChange={onNodesChange} // [cite: 502]
                onEdgesChange={onEdgesChange} // [cite: 502]
                onConnect={onConnect} // [cite: 502]
                fitView
            >
                <Background color="#000000" gap={16} opacity={0.15} />
                <Controls className="!border-2 !border-black !shadow-none !rounded-none" />
            </ReactFlow>
        </div>
    )
}

export default Addnode