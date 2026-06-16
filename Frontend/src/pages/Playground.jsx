import React, { useState } from 'react'
import { useDiagramStore } from '../store/useDiagramStore'
import Addnode from '../components/Addnode'

const Playground = () => {
    const { addNode } = useDiagramStore()
    const [data, setData] = useState('')

    // Processes text validation before firing store mutations
    const handleCreateNode = () => {
        const finalLabel = data.trim() !== '' ? data : 'No label 🤔'
        addNode(finalLabel)
        setData('') // Resets field line string back to blank space state
    }

    return (
        <>
            <div className='bg-[#222222] h-screen w-full flex items-center justify-center font-mono overflow-hidden' >
                
                {/* LEFT CONTROL SIDEBAR PANEL */}
                <div className='w-[25%] bg-amber-100 h-screen flex flex-col items-stretch justify-center p-6 border-r-4 border-black gap-6 select-none z-20' >
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Node Content Text:
                        </label>
                        <input
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Type node text here..."
                            type="text"
                            className="w-full bg-white border-4 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <button
                        // 🔥 CLEAN FUNCTION TRIGGER OVERPASS CALL 
                        onClick={handleCreateNode}
                        className='text-xs font-black uppercase tracking-widest bg-emerald-400 text-black border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer text-center'
                    >
                        Add New Box +
                    </button>
                </div>

                {/* RIGHT SYSTEM GRAPH VIEWPORT MAP */}
                <div className='w-[75%] bg-[#FEFCE8] h-screen relative z-10' >
                    <Addnode />
                </div>
            </div>
        </>
    )
}

export default Playground