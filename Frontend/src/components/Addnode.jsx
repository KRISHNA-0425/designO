import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE OMNIDIRECTIONAL NODE COMPONENT BLUEPRINT
const CustomBrutalistNode = ({ id, data, selected }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)

    return (
        <>
            {/* 📐 STARK NEO-BRUTALIST RESIZER CONTROL BOUNDS */}
            <NodeResizer
                isVisible={true} // Bounding layout handles stay rendered permanently
                minWidth={150}
                minHeight={80}
                lineClassName="!border-black !border-2" 
                handleClassName="!bg-black !w-2.5 !h-2.5 !rounded-none !border-2 !border-white" 
                
            />

            {/* FLUID INNER WRAPPER CELL */}
            <div className="w-full h-full p-4 pb-12 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] font-mono relative transition-all hover:bg-yellow-50 flex flex-col items-center justify-center text-center">
                
                {/* 🔴 OMNIDIRECTIONAL CONTEXT PORTS */}
                {/* TOP WALL PORTS */}
                <Handle type="target" position={Position.Top} id="t-top" className="!bg-black !w-2 !h-2 !rounded-none !left-[35%] !top-[-6px] z-40" />
                <Handle type="source" position={Position.Top} id="s-top" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[65%] !top-[-6px] z-40" />

                {/* BOTTOM WALL PORTS */}
                <Handle type="target" position={Position.Bottom} id="t-bot" className="!bg-black !w-2 !h-2 !rounded-none !left-[35%] !bottom-[-6px] z-40" />
                <Handle type="source" position={Position.Bottom} id="s-bot" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[65%] !bottom-[-6px] z-40" />

                {/* LEFT WALL PORTS */}
                <Handle type="target" position={Position.Left} id="t-left" className="!bg-black !w-2 !h-2 !rounded-none !left-[-6px] !top-[35%] z-40" />
                <Handle type="source" position={Position.Left} id="s-left" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !left-[-6px] !top-[65%] z-40" />

                {/* RIGHT WALL PORTS */}
                <Handle type="target" position={Position.Right} id="t-right" className="!bg-black !w-2 !h-2 !rounded-none !right-[-6px] !top-[35%] z-40" />
                <Handle type="source" position={Position.Right} id="s-right" className="!bg-lime-400 !border !border-black !w-2 !h-2 !rounded-none !right-[-6px] !top-[65%] z-40" />

                {/* ⚡ ISOLATED TYPOGRAPHY HUB CONTAINER */}
                <div className="w-full text-2xl lg:text-3xl font-black uppercase text-black tracking-tight break-all line-clamp-2 max-w-full px-2 overflow-hidden select-none">
                    {data.label}
                </div>

                {/* ATOMIC INLINE CARD DELETE TRASH TRIGGER */}
                <button
                    onClick={(e) => {
                        e.stopPropagation() // Stops click bubbling from selecting background canvas elements
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

// Global edge runtime behavioral formatting configuration rules
const defaultEdgeOptions = {
    selectable: true,
    style: { stroke: '#000000', strokeWidth: 3, cursor: 'pointer' }
};

// 2. PRIMARY VIEWPORT CONTAINER CANVAS
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteAll, deleteEdge } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    return (
        <div className="w-full h-full relative">

            {/* Master Clear Button */}
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
                    deleteEdge(edge.id); // Triggers snap deletion on edge line single mouse clicks
                }}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                className="[&_.react-flow__pane]:!cursor-grab [&_.react-flow__pane:active]:!cursor-grabbing"
            >
                <Background color="#000000" gap={16} opacity={0.15} />
                <Controls className="!border-2 !border-black !shadow-none !rounded-none" />
            </ReactFlow>
        </div>
    )
}

export default Addnode