import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE UNIVERSAL BIDIRECTIONAL PORT NODE COMPONENT
const CustomBrutalistNode = ({ id, data }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)
    const selectedNodeId = useDiagramStore((state) => state.selectedNodeId)
    
    const isSelected = id === selectedNodeId

    return (
        <>
            {/* 📐 STARK NEO-BRUTALIST RESIZER CONTROL BOUNDS */}
            <NodeResizer
                isVisible={true} 
                minWidth={180}
                minHeight={120}
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
            <div className={`w-full h-full p-4 pb-12 border-4 border-black bg-white font-mono relative transition-all hover:bg-yellow-50 flex flex-col items-stretch justify-start text-left !cursor-pointer overflow-visible ${isSelected ? 'shadow-[4px_4px_0px_0px_#06b6d4]' : 'shadow-[4px_4px_0px_0px_#000000]'}`}>
                
                {/* 🔴 LEFT HUB - ACTS AS BOTH SOURCE & TARGET */}
                <Handle 
                    type="source" 
                    position={Position.Left} 
                    id="port-left" 
                    isConnectableStart={true}
                    isConnectableEnd={true}
                    className="!bg-lime-400 !border-2 !border-black !w-3 !h-3 !rounded-none !left-[-10px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />

                {/* 🟢 RIGHT HUB - ACTS AS BOTH SOURCE & TARGET */}
                <Handle 
                    type="source" 
                    position={Position.Right} 
                    id="port-right" 
                    isConnectableStart={true}
                    isConnectableEnd={true}
                    className="!bg-emerald-400 !border-2 !border-black !w-3 !h-3 !rounded-none !right-[-10px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />

                {/* ⚡ TITLE LAYER HEADER */}
                <div className="w-full text-base font-black uppercase text-black tracking-tight break-words line-clamp-2 border-b-2 border-black pb-1 select-none !cursor-pointer">
                    {data.label}
                </div>

                {/* ✨ DESCRIPTION INNER TEXT AREA BOX */}
                <div className="w-full mt-2 overflow-y-auto flex-1 nodrag cursor-text pr-1">
                    {data.description ? (
                        <p className="text-[11px] font-bold text-zinc-700 leading-tight whitespace-pre-wrap break-words">
                            {data.description}
                        </p>
                    ) : (
                        <p className="text-[11px] italic text-zinc-400 select-none">
                            No description added
                        </p>
                    )}
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

const defaultEdgeOptions = {
    selectable: true,
    style: { stroke: '#000000', strokeWidth: 3, cursor: 'pointer' }
};

// 2. PRIMARY VIEWPORT CONTAINER CANVAS
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteEdge, setSelectedNodeId } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    return (
        <div className="w-full h-full relative">
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={(instance) => useDiagramStore.getState().setReactFlowInstance(instance)}
                onNodeClick={(event, node) => {
                    setSelectedNodeId(node.id)
                }}
                onPaneClick={() => {
                    setSelectedNodeId(null)
                }}
                onEdgeClick={(event, edge) => {
                    deleteEdge(edge.id);
                }}
                defaultEdgeOptions={defaultEdgeOptions}
                
                // 🛠️ THE MAGIC LINE: Switches canvas into loose connection validation mode
                connectionMode="loose" 
                
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