import React, { useEffect, useState } from 'react'
import { useDiagramStore } from '../store/useDiagramStore'
import Addnode from '../components/Addnode'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCode } from "react-icons/hi"

const Playground = () => {
    // ⚡ EXTRACT DATABASE PERSISTENCE FIELDS ALONGSIDE BASE OPERATIONS
    const {
        addNode,
        deleteAll,
        autoLayout,
        selectedNodeId,
        nodes,
        updateNodeData,
        setSelectedNodeId,
        saveDiagram,           // 💾 Database Save Action
        fetchDiagram,          // 📥 Database Load Action
        clearBackendWorkspace, // 🗑️ Database Wipe Action
        isSaving,              // 🔄 Background Saving Tracker
        isFetching,            // 🔄 Background Fetching Tracker
        diagramError           // 🚨 Error Handler Reference
    } = useDiagramStore()

    const [data, useStateField] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    // 📥 STEP 1: DOWNSTREAM SYNC UPON MOUNTING
    useEffect(() => {
        fetchDiagram()
    }, [fetchDiagram])

    // Sync input fields whenever the active node selection changes on canvas
    const activeNode = nodes.find(n => n.id === selectedNodeId)

    useEffect(() => {
        if (activeNode) {
            useStateField(activeNode.data.label || '')
            setDescription(activeNode.data.description || '')
        } else {
            useStateField('')
            setDescription('')
        }
    }, [selectedNodeId, activeNode])

    // Handle mutations on the input fields
    const handleLabelChange = (value) => {
        useStateField(value)
        if (selectedNodeId) {
            updateNodeData(selectedNodeId, { label: value })
        }
    }

    const handleDescriptionChange = (value) => {
        setDescription(value)
        if (selectedNodeId) {
            updateNodeData(selectedNodeId, { description: value })
        }
    }

    const handleCreateNode = () => {
        const finalLabel = data.trim() !== '' ? data : 'No label 🤔'
        addNode(finalLabel, description.trim())

        useStateField('')
        setDescription('')
        setSelectedNodeId(null)
    }

    const handleDeselect = () => {
        useStateField('')
        setDescription('')
        setSelectedNodeId(null)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!selectedNodeId) handleCreateNode()
        }
    }

    return (
        <>
            {/* ⚡ THE RESPONSIVE MATRIX */}
            <div className='bg-[#222222] min-h-screen w-full flex flex-col md:flex-row items-stretch justify-center font-mono overflow-hidden' >

                {/* 💻 CONTROL SIDEBAR PANEL */}
                <div className='w-full md:w-[25%] h-auto min-h-[220px] md:h-screen bg-amber-100 flex flex-col items-stretch justify-start p-4 md:p-6 border-b-4 md:border-b-0 md:border-r-4 border-black gap-4 select-none z-20 overflow-y-auto' >

                    {/* 🔧 FIXED: CLEAN UNIFIED NEO-BRUTALIST NAVIGATION LINK */}
                    <button 
                        onClick={() => navigate("/")} 
                        className="w-full flex items-center justify-center gap-3 bg-cyan-300 text-black border-4 border-black p-2.5 font-black uppercase text-xs shadow-[4px_4px_0px_0px_#000000] hover:bg-yellow-300 transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
                    >
                        <HiOutlineCode size={18} />
                        <span>Return to Hub ➔</span>
                    </button>

                    <div className="flex items-center justify-between mt-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000000] ${selectedNodeId ? 'bg-cyan-300 text-black' : 'bg-white text-black'}`}>
                            Mode: {selectedNodeId ? 'Editing Selected' : 'Create Mode'}
                        </span>
                        {selectedNodeId && (
                            <button
                                onClick={handleDeselect}
                                className="text-[10px] font-black uppercase bg-white border-2 border-black px-1.5 py-0.5 hover:bg-black hover:text-white transition-all cursor-pointer"
                            >
                                New Node ➕
                            </button>
                        )}
                    </div>

                    {/* 🚨 BRUTALIST STORE ERROR ALERT POPUP */}
                    {diagramError && (
                        <div className="bg-red-500 text-white border-4 border-black p-2.5 text-[10px] font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_#000000]">
                            {diagramError}
                        </div>
                    )}

                    {/* Node Label Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Node Content Text:
                        </label>
                        <input
                            value={data}
                            onChange={(e) => handleLabelChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type node text here..."
                            type="text"
                            className="w-full bg-white border-4 border-black p-2.5 md:p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    {/* Description Textbox Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Description:
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                            placeholder="Type block notes or description..."
                            rows={6}
                            className="w-full bg-white border-4 border-black p-2.5 md:p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400 resize-none"
                        />
                    </div>

                    {!selectedNodeId ? (
                        <button
                            onClick={handleCreateNode}
                            className='w-full text-xs font-black uppercase tracking-widest bg-emerald-400 text-black border-4 border-black p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center mt-2'
                        >
                            Add New Node +
                        </button>
                    ) : (
                        <div className="text-[11px] font-bold text-zinc-600 bg-amber-200 border-2 border-dashed border-black p-2 mt-2 text-center rounded-none select-none">
                            ✨ Changes update canvas node values in real-time!
                        </div>
                    )}

                    {/* Horizontal Divider Line */}
                    <hr className="border-t-4 border-black my-2" />

                    {/* 💾 THE SYSTEM PERSISTENCE CONTROL (SAVE ARCHITECTURE) */}
                    <button
                        onClick={saveDiagram}
                        disabled={isSaving}
                        className="w-full text-xs font-black uppercase tracking-wider bg-yellow-300 text-black border-4 border-black p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center disabled:opacity-50"
                    >
                        {isSaving ? "Saving Backup... ⏳" : "Save Architecture 💾"}
                    </button>

                    {/* Utility Controls */}
                    <button
                        onClick={autoLayout}
                        className="w-full text-xs font-black uppercase tracking-wider bg-cyan-300 text-black border-4 border-black p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center"
                    >
                        Auto Arrange ✨
                    </button>

                    <button
                        onClick={clearBackendWorkspace}
                        className="w-full text-xs font-black uppercase tracking-wider bg-red-500 text-white border-4 border-black p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#000000] hover:bg-black hover:text-white transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center"
                    >
                        Clear Canvas ✕
                    </button>
                </div>

                {/* 🗺️ SYSTEM GRAPH VIEWPORT MAP */}
                <div className='w-full md:w-[75%] h-[calc(100vh-380px)] md:h-screen bg-[#FEFCE8] relative z-10' >
                    {isFetching ? (
                        /* Full screen loading block overlaying canvas area during downstream downloads */
                        <div className="absolute inset-0 bg-[#FEFCE8] flex items-center justify-center z-50 select-none">
                            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000000] font-black uppercase tracking-wider text-sm animate-pulse">
                                Downloading Node Layout Coordinates... 📂
                            </div>
                        </div>
                    ) : null}
                    <Addnode />
                </div>

            </div>
        </>
    )
}

export default Playground