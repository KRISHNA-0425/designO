import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE CARDINAL 4-PORT NEOMORPHIC BRUTALIST NODE WITH PARSING ALIAS CORES
const CustomBrutalistNode = ({ id, data, selected }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)

    return (
        <>
            {/* Stark Transform Handler: Only visible when this card is actively selected */}
            <NodeResizer
                isVisible={selected} 
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
            <div 
                style={{ backgroundColor: data.bg || '#ffffff' }}
                className={`w-full h-full p-4 pb-12 border-4 border-black font-mono relative transition-all flex flex-col items-stretch justify-start text-left !cursor-pointer overflow-visible shadow-[4px_4px_0px_0px_#000000] ${selected ? 'shadow-[4px_4px_0px_0px_#06b6d4] !border-cyan-400' : ''}`}
            >
                
                {/* ⬆️ TOP CARDINAL HANDLE */}
                <Handle 
                    type="target" 
                    position={Position.Top} 
                    id="black-top" 
                    isConnectableStart={true}
                    className="!bg-black !border-2 !border-black !w-3 !h-3 !rounded-none !top-[-8px] !left-[50%] -translate-x-1/2 z-50 !cursor-pointer" 
                />

                {/* ⬇️ BOTTOM CARDINAL HANDLE */}
                <Handle 
                    type="target" 
                    position={Position.Bottom} 
                    id="black-bottom" 
                    isConnectableStart={true}
                    className="!bg-black !border-2 !border-black !w-3 !h-3 !rounded-none !bottom-[-8px] !left-[50%] -translate-x-1/2 z-50 !cursor-pointer" 
                />

                {/* ⬅️ LEFT CARDINAL SYSTEM */}
                <Handle 
                    type="target" 
                    position={Position.Left} 
                    id="black-left" 
                    isConnectableStart={true}
                    className="!bg-black !border-2 !border-black !w-3 !h-3 !rounded-none !left-[-8px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />
                {/* ⚡ HIDDEN ALIAS HUB: Resolves old cache strings from throwing canvas errors */}
                <Handle 
                    type="source" 
                    position={Position.Left} 
                    id="lime-left" 
                    className="!opacity-0 !w-0 !h-0 !absolute !left-0 !top-[50%] !pointer-events-none" 
                />

                {/* ➡️ RIGHT CARDINAL SYSTEM */}
                <Handle 
                    type="target" 
                    position={Position.Right} 
                    id="black-right" 
                    isConnectableStart={true}
                    className="!bg-black !border-2 !border-black !w-3 !h-3 !rounded-none !right-[-8px] !top-[50%] -translate-y-1/2 z-50 !cursor-pointer" 
                />
                {/* ⚡ HIDDEN ALIAS HUB: Resolves old cache strings from throwing canvas errors */}
                <Handle 
                    type="source" 
                    position={Position.Right} 
                    id="emerald-right" 
                    className="!opacity-0 !w-0 !h-0 !absolute !right-0 !top-[50%] !pointer-events-none" 
                />

                {/* TITLE LAYER HEADER */}
                <div className="w-full text-base font-black uppercase text-black tracking-tight break-words line-clamp-1 border-b-2 border-black pb-1 select-none !cursor-pointer">
                    {data.label}
                </div>

                {/* DESCRIPTION/SUBTITLE TEXT */}
                <div className="w-full mt-2 overflow-y-auto flex-1 nodrag cursor-text pr-1">
                    {data.description ? (
                        <p className="text-[11px] font-bold text-zinc-900 leading-tight whitespace-pre-wrap break-words">
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

// Default layout configurations matching your uniform store blueprint styles
const defaultEdgeOptions = {
    type: 'smoothstep',
    selectable: true,
    style: { 
        stroke: '#000000', 
        strokeWidth: 3, 
        strokeDasharray: '6,6', 
        cursor: 'pointer' 
    }
};

// 2. PRIMARY VIEWPORT CONTAINER CANVAS
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteEdge, setSelectedNodeId, saveDiagram } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    const checkValidConnection = (connection) => {
        if (connection.source === connection.target) return false;
        return true; 
    };

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
                onNodeDragStop={() => {
                    saveDiagram();
                }}
                defaultEdgeOptions={defaultEdgeOptions}
                isValidConnection={checkValidConnection}
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