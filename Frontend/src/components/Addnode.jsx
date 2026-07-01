import React, { useMemo } from 'react'
import { Background, Controls, ReactFlow, Handle, Position, NodeResizer, MarkerType } from '@xyflow/react'
import { useDiagramStore } from '../store/useDiagramStore'
import '@xyflow/react/dist/style.css'
import { MdDeleteForever } from "react-icons/md";

// 1. THE PERFECTED UNIVERSAL PORT NODE COMPONENT
const CustomBrutalistNode = ({ id, data, selected }) => {
    const deleteNode = useDiagramStore((state) => state.deleteNode)

    return (
        <>
            {/* 📐 Stark Transform Handler: Only visible when this card is actively selected */}
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
            <div className={`w-full h-full p-4 pb-12 border-4 border-black bg-white font-mono relative transition-all hover:bg-yellow-50 flex flex-col items-stretch justify-start text-left !cursor-pointer overflow-visible ${selected ? 'shadow-[4px_4px_0px_0px_#06b6d4]' : 'shadow-[4px_4px_0px_0px_#000000]'}`}>

                {/* 🔴 LEFT BLACK HANDLE */}
                <Handle
                    type="target"
                    position={Position.Left}
                    id="black-left"
                    isConnectableStart={true} // ⚡ Allows drawing connection wires OUT of this target handle
                    className="!bg-black !border-2 !border-black !w-2.5 !h-2.5 !rounded-none !left-[-8px] z-50 !cursor-pointer"
                />
                {/* 🟢 LEFT LIME HANDLE */}
                <Handle
                    type="source"
                    position={Position.Left}
                    id="lime-left"
                    className="!bg-lime-400 !border-2 !border-black !w-2.5 !h-2.5 !rounded-none !left-[-8px] !top-[35%] z-50 !cursor-pointer"
                />

                {/* 🔴 RIGHT BLACK HANDLE */}
                <Handle
                    type="target"
                    position={Position.Right}
                    id="black-right"
                    isConnectableStart={true} // ⚡ Allows drawing connection wires OUT of this target handle
                    className="!bg-black !border-2 !border-black !w-2.5 !h-2.5 !rounded-none !right-[-8px] z-50 !cursor-pointer"
                />
                {/* 🟢 RIGHT EMERALD HANDLE */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="emerald-right"
                    className="!bg-emerald-400 !border-2 !border-black !w-2.5 !h-2.5 !rounded-none !right-[-8px] !top-[65%] z-50 !cursor-pointer"
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
    type: 'smoothstep',
    selectable: true,
    animated: true,
    style: {
        stroke: '#000000',
        strokeWidth: 2.5,
        strokeDasharray: '6,4',
        cursor: 'pointer',
    },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#000000',
    },
};

// 2. PRIMARY VIEWPORT CONTAINER CANVAS
const Addnode = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteEdge, setSelectedNodeId, saveDiagram } = useDiagramStore()

    const nodeTypes = useMemo(() => ({ brutalNode: CustomBrutalistNode }), [])

    // ⚡ THE CUSTOM LOGIC GATE RULE (STRICT BLACK-TO-BLACK BLOCKER)
    const checkValidConnection = (connection) => {
        // Prevent a node from connecting handles to itself
        if (connection.source === connection.target) return false;

        const sourceHandleId = connection.sourceHandle || '';
        const targetHandleId = connection.targetHandle || '';

        // 🛑 STRICT GATEKEEPER: Discard connection immediately if both handle IDs contain 'black'
        if (sourceHandleId.includes('black') && targetHandleId.includes('black')) {
            console.warn("✕ Connection Denied: Black handles cannot link to other black handles!");
            return false;
        }

        return true; // Allows any other combination (black-to-lime, lime-to-emerald, etc.)
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
                defaultEdgeOptions={defaultEdgeOptions}

                // 🔒 PASS THE LOGIC GATEKEEPER INTERCEPTOR PROP HERE:
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