import React, { useEffect, useState } from 'react'
import { useDiagramStore } from '../store/useDiagramStore'
import Addnode from '../components/Addnode'

const Playground = () => {
    const { addNode } = useDiagramStore()
    const [data, setData] = useState('')

    const handleCreateNode = () => {
        const finalLabel = data.trim() !== '' ? data : 'No label 🤔'
        addNode(finalLabel)
        setData('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCreateNode()
        }
    }

    return (
        <>
            {/* ⚡ THE RESPONSIVE MATRIX:
                - Changed from standard 'flex' to 'flex-col md:flex-row'. 
                - Sits stacked vertically on mobile screens, then snaps side-by-side on desktop (md up)! */}
            <div className='bg-[#222222] min-h-screen w-full flex flex-col md:flex-row items-stretch justify-center font-mono overflow-hidden' >

                {/* 💻 CONTROL SIDEBAR PANEL
                    - Mobile: Takes full width, 30% viewport height, and features a bottom borders.
                    - Desktop (md:): Locks down onto 25% width, full screen height, and swaps borders to the right side. */}
                <div className='w-full md:w-[25%] h-auto min-h-[220px] md:h-screen bg-amber-100 flex flex-col items-stretch justify-center p-4 md:p-6 border-b-4 md:border-b-0 md:border-r-4 border-black gap-4 md:gap-6 select-none z-20' >

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Node Content Text:
                        </label>
                        <input
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type node text here..."
                            type="text"
                            className="w-full bg-white border-4 border-black p-2.5 md:p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <button
                        onClick={handleCreateNode}
                        className='text-xs font-black uppercase tracking-widest bg-emerald-400 text-black border-4 border-black p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center'
                    >
                        Add New Node +
                    </button>
                </div>

                {/* 🗺️ SYSTEM GRAPH VIEWPORT MAP
                    - Mobile: Fills the remaining 100% width and dynamic calculation height block area below the input header.
                    - Desktop (md:): Locks down cleanly into its 75% wide workspace board slot framework. */}
                <div className='w-full md:w-[75%] h-[calc(100vh-220px)] md:h-screen bg-[#FEFCE8] relative z-10' >
                    <Addnode />
                </div>
            </div>
        </>
    )
}

export default Playground