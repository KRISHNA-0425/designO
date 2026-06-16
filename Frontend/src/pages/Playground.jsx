import React from 'react'
import { useDiagramStore } from '../store/useDiagramStore'
import Addnode from '../components/Addnode'

const Playground = () => {

    const { addNode } = useDiagramStore()

    return (
        <>
            <div className=' bg-[#3C3C3C] h-screen w-full flex items-center justify-center ' >
                {/* left side */}

                <div className='w-[20%]  bg-yellow-100 h-screen flex items-center justify-center ' >
                    <button
                        onClick={addNode}
                        className='text-2xl border px-4 py-2 cursor-pointer'
                    >add me</button>
                </div>

                {/* rightside */}

                <div className='w-[80%] bg-[#FEFCE8] h-screen ' >
                    <Addnode/>
                </div>
            </div>
        </>
    )
}

export default Playground