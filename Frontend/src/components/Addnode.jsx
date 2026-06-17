import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE DUAL-PORT UNIVERSAL NODE COMPONENT
const CustomBrutalistNode = ({ id, data }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)

    return (
        <>
            {/* 📐 STARK NEO-BRUTALIST RESIZER CONTROL BOUNDS */}
            <NodeResizer
                isVisible={true} 
                minWidth={150}
                minHeight={80}
                lineClassName="!border-black !border-2 !cursor-pointer" 
                handleClassName="!bg-black !w-2.5 !h-2.5 !rounded-none !border-2 !border-white !cursor-pointer" 
                onResize={(event, params) => {
                    useDiagramStore.getState().onNodeResize(id, {
                        width: params.width,
                        height: params.height
                    });
                }}
            />

            {/* FLUID INNER WRAPPER CELL */}
            <div className="w-full h-full p-4 pb-12 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] font-mono relative transition-all hover:bg-yellow-50 flex flex-col items-center justify-center text-center !cursor-pointer">
                
                {/* 🔴 LEFT HUB (Target & Source Layered Perfectly) */}
                <Handle 
                    type="target" 
                    position={Position.Left} 
                    id="t-left" 
                    className="!bg-lime-400 !border-2 !border-black !w-3 !h-3 !rounded-none !left-[-8px] !top-[50%] -translate-y-1/2 z-40 !cursor-pointer" 
                />
                <Handle 
                    type="source" 
                    position={Position.Left} 
                    id="s-left" 
                    className="!bg-transparent !border-0 !w-3 !h-3 !rounded-none !left-[-8px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />

                {/* 🟢 RIGHT HUB (Target & Source Layered Perfectly) */}
                <Handle 
                    type="target" 
                    position={Position.Right} 
                    id="t-right" 
                    className="!bg-lime-400 !border-2 !border-black !w-3 !h-3 !rounded-none !right-[-8px] !top-[50%] -translate-y-1/2 z-40 !cursor-pointer" 
                />
                <Handle 
                    type="source" 
                    position={Position.Right} 
                    id="s-right" 
                    className="!bg-transparent !border-0 !w-3 !h-3 !rounded-none !right-[-8px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />

                {/* ⚡ ISOLATED TYPOGRAPHY HUB CONTAINER */}
                <div className="w-full text-2xl lg:text-3xl font-black uppercase text-black tracking-tight break-all line-clamp-2 max-w-full px-2 overflow-hidden select-none !cursor-pointer">
                    {data.label}
                </div>

                {/* ATOMIC INLINE CARD DELETE TRASH TRIGGER */}
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

// Global edge runtime behavioral formatting configuration rules
const defaultEdgeOptions = {
    selectable: true,
    style: { stroke: '#000000', strokeWidth: 3, cursor: 'pointer' }
};

// 2. PRIMARY VIEWPORT CONTAINER CANVAS
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteAll, deleteEdge, autoLayout } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    return (
        <div className="w-full h-full relative">

            {/* CONTROL HUB OVERLAY WRAPPER */}
            <div className="absolute top-4 left-4 z-50 flex flex-col sm:flex-row gap-3">
                <button
                    onClick={deleteAll}
                    className="text-xs font-black uppercase tracking-wider bg-red-500 text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
                >
                    Clear Canvas ✕
                </button>

                <button
                    onClick={autoLayout}
                    className="text-xs font-black uppercase tracking-wider bg-cyan-300 text-black border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
                >
                    Auto Arrange ✨
                </button>
            </div>
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={(instance) => useDiagramStore.getState().setReactFlowInstance(instance)}
                onEdgeClick={(event, edge) => {
                    deleteEdge(edge.id);
                }}
                defaultEdgeOptions={defaultEdgeOptions}
                className="[&_.react-flow__pane]:!cursor-grab [&_.react-flow__pane:active]:!cursor-grabbing"
                fitView
            >
                <Background color="#000000" gap={16} opacity={0.15} />
                <Controls className="!border-2 !border-black !shadow-none !rounded-none" />
            </ReactFlow>
        </div>
    )
}

export default Addnode