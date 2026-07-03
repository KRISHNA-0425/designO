import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineCode, HiArrowUp } from "react-icons/hi"

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="w-full bg-black text-white border-t-4 border-black font-mono mt-20 relative z-30 select-none">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8">

                {/* 🎨 BRAND COLUMN BLOCK */}
                <div className="flex flex-col items-start gap-3 max-w-sm">
                    <div className="flex items-center gap-2">

                        <img src="https://res.cloudinary.com/dflf8j84g/image/upload/v1783102931/favicon_kltkho.svg" alt="website logo" className='size-12' />

                        <span className="text-xl font-black uppercase tracking-tighter ">
                            DesignO <span className="text-xs bg-white text-black px-1.5 py-0.5 ml-1">v1.0</span>
                        </span>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-400 leading-normal">
                        Enterprise-grade canvas blueprints deployed with automated engine mechanics. Built to map large-scale topologies seamlessly.
                    </p>
                </div>

                {/* 🗺️ INTERACTIVE DIRECTORY LINKS */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-black uppercase tracking-wider">
                    <Link
                        to="/"
                        className="text-zinc-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                        Home // Portal
                    </Link>
                    <Link
                        to="/playground"
                        className="text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                        Workspace Board
                    </Link>
                    
                </div>

                {/* ⚡ UTILITY ACTUATOR: BACK TO TOP BUTTON */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t border-neutral-800 md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right font-bold text-[10px] tracking-widest text-lime-400 uppercase">
                        <div>[STATUS: ALL_SYSTEMS_GO]</div>
                        <div className="text-zinc-500 mt-0.5">© 2026 ARCHNOTE STUDIO</div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        title="Scroll to Top"
                        className="bg-zinc-900 border-2 border-zinc-700 text-white p-2.5 shadow-[3px_3px_0px_0px_#52525b] hover:bg-white hover:text-black hover:border-white hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer flex items-center justify-center"
                    >
                        <HiArrowUp size={16} />
                    </button>
                </div>

            </div>
        </footer>
    )
}

export default Footer