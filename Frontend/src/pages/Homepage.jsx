import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineServer, HiLightningBolt, HiOutlineDocumentText, HiOutlineTemplate } from "react-icons/hi"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LandingPage() {
    return (
        /* 🔧 FIXED: Removed 'pb-20' to let the layout flow naturally into the Footer without overlapping elements */
        <div className="text-black font-mono antialiased min-h-screen bg-[#FEFCE8] selection:bg-yellow-300 overflow-x-hidden flex flex-col justify-between">
            
            {/* MAIN CONTENT CONTAINER */}
            <div className="flex-grow w-full">
                {/* 📟 ANIMATED HARDWARE INFRASTRUCTURE TICKER STATUS */}
                <div className="w-full bg-black text-lime-400 font-bold py-2 border-b-4 border-black uppercase text-xs tracking-wider overflow-hidden select-none whitespace-nowrap relative z-30">
                    <div className="animate-ticker-stream flex gap-8">
                        <span>[CORE_ENGINE: ELKJS_HIERARCHICAL_LAYOUT_2026] • OPTIMIZED FOR LARGE-SCALE TOPOLOGIES • INSTANT UNTANGLE ACTIVATED</span>
                        <span>[CORE_ENGINE: ELKJS_HIERARCHICAL_LAYOUT_2026] • OPTIMIZED FOR LARGE-SCALE TOPOLOGIES • INSTANT UNTANGLE ACTIVATED</span>
                    </div>
                </div>

                {/* NAVBAR INTEGRATION */}
                <Navbar />

                {/* 🚀 BRUTALIST ANIMATED HERO SHOWCASE ZONE */}
                <header className="max-w-7xl mx-auto mt-12 mb-16 px-4">
                    <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_#000000] relative flex flex-col items-start gap-6 overflow-hidden group">

                        {/* ⚡ SVG Animated Dashed Blueprint Border Overlap Accent */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                            <rect
                                x="4" y="4"
                                width="calc(100% - 8px)"
                                height="calc(100% - 8px)"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                                className="blueprint-flow-border opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                            />
                        </svg>

                        <span className="bg-black text-white px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest relative z-10 animate-pulse">
                            System Architecture Sandbox active
                        </span>

                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black max-w-5xl leading-none relative z-10">
                            Visualize Huge Topologies.<br />
                            <span className="bg-cyan-300 border-2 border-black px-3 inline-block my-2 transform -rotate-1 shadow-[4px_4px_0px_0px_#000000] hover:rotate-0 hover:scale-105 transition-all duration-300 ease-out">
                                Instant Auto-Rearrange.
                            </span>
                        </h1>

                        <p className="text-sm md:text-base font-bold text-zinc-700 max-w-3xl leading-relaxed mt-2 relative z-10">
                            Stop struggling with sprawling, messy enterprise diagrams. ArchNote is built to map massive architectures with heavy node counts and extensive technical notes. Don't waste time dragging blocks around manually—let our layout engine instantly structure your entire network pipeline.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 relative z-10">
                            <Link
                                to="/playground"
                                className="bg-emerald-400 border-4 border-black font-black uppercase text-sm px-8 py-3.5 shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer text-center"
                            >
                                Launch Layout Board ➔
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ⚡ CORE USPs: ELASTIC SNAP HOVER CARDS */}
                <main className="max-w-7xl mx-auto px-4 mt-8 mb-12">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-black inline-block border-b-4 border-black pb-1 select-none">
                            System Specifications // Core USPs
                        </h3>
                    </div>

                    {/* 4-Column Responsive Utility Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* USP 1: AUTOMATED ENGINE */}
                        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_#000000] hover:bg-amber-50 flex flex-col items-start gap-4 group">
                            <div className="bg-lime-400 p-3 border-2 border-black text-black shadow-[2px_2px_0px_0px_#000000] group-hover:rotate-6 transition-transform duration-200">
                                <HiOutlineServer size={24} />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                Auto-Rearrange Engine
                            </h4>
                            <span className="text-[10px] bg-black text-yellow-300 font-bold px-1 py-0.5 uppercase tracking-wide">Flagship Feature</span>
                            <p className="text-xs font-bold text-zinc-600 leading-normal">
                                Our primary layout engine automatically untangles overlapping charts. One click runs an asynchronous tree compiler that perfectly aligns all pipelines from left to right.
                            </p>
                        </div>

                        {/* USP 2: LARGE SCALE STABILITY */}
                        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_#000000] hover:bg-yellow-50 flex flex-col items-start gap-4 group">
                            <div className="bg-yellow-300 p-3 border-2 border-black shadow-[2px_2px_0px_0px_#000000] group-hover:rotate-6 transition-transform duration-200">
                                <HiOutlineTemplate size={24} className="text-black" />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                Massive Scale Stability
                            </h4>
                            <p className="text-xs font-bold text-zinc-600 leading-normal">
                                Engineered specifically to support massive system architectures containing dozens of microservices, gateways, clusters, and complex routing maps without performance drops.
                            </p>
                        </div>

                        {/* USP 3: TECHNICAL NOTES */}
                        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_#000000] hover:bg-cyan-50 flex flex-col items-start gap-4 group">
                            <div className="bg-cyan-300 p-3 border-2 border-black shadow-[2px_2px_0px_0px_#000000] group-hover:rotate-6 transition-transform duration-200">
                                <HiOutlineDocumentText size={24} className="text-black" />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                Deep Technical Notes
                            </h4>
                            <p className="text-xs font-bold text-zinc-600 leading-normal">
                                Keep your layout clean while holding granular documentation. Each node includes an expanding markdown-compatible metadata field to store logs, secrets, and configurations.
                            </p>
                        </div>

                        {/* USP 4: FLOW CHANNELS */}
                        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_#000000] hover:bg-pink-50 flex flex-col items-start gap-4 group">
                            <div className="bg-pink-300 p-3 border-2 border-black shadow-[2px_2px_0px_0px_#000000] group-hover:rotate-6 transition-transform duration-200">
                                <HiLightningBolt size={24} className="text-black" />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                Animated Flow Diagnostics
                            </h4>
                            <p className="text-xs font-bold text-zinc-600 leading-normal">
                                Connections run in high-contrast, thick, right-angled paths. The active crawling dash animation lets you instantly see which databases and services are interconnected.
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            {/* MOUNT FOOTER APART FROM MAIN GRID CONTENT */}
            <Footer />
        </div>
    )
}