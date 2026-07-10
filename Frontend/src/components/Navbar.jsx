import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { HiOutlineCode } from "react-icons/hi"

const Navbar = () => {
    // ⚡ Extract authentication states from your global Zustand store
    const { user, isAuthenticated, logout } = useAuthStore()

    return (
        <nav className="w-full bg-white border-b-4 border-black p-4 font-mono select-none relative z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* 🎨 BRAND LOGO/ANCHOR LAYER */}
                <Link
                    to="/"
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <img src="https://res.cloudinary.com/dflf8j84g/image/upload/v1783102931/favicon_kltkho.svg" alt="website logo" className='size-12' />

                    <span className="text-xl font-black uppercase tracking-tighter text-black">
                        DesignO <span className="text-xs bg-black text-white px-1.5 py-0.5 ml-1">v1.0</span>
                    </span>
                </Link>

                {/* 🗺️ INTERACTIVE PLUGINS & CONTROLS LOOP */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        to="/playground"
                        className="text-sm font-black uppercase tracking-wide text-black hover:text-cyan-500 transition-all"
                    >
                        Workspace
                    </Link>

                    {/* DYNAMIC VISIBILITY SWITCH GATES */}
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-4">
                            {/* User Profile Identity Badge */}
                            <div className="hidden md:block bg-[#F7F7DD] border-2 border-black text-xs font-black uppercase px-3 py-1.5 shadow-[2px_2px_0px_0px_#000000]">
                                User: {user.name || user.username}
                            </div>

                            {/* Neo-Brutalist Logout Trigger Link */}
                            <button
                                onClick={logout}
                                className="text-xs font-black uppercase tracking-widest bg-red-500 text-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer"
                            >
                                Sign Out ➔
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="text-xs font-black uppercase tracking-widest bg-yellow-300 text-black border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer"
                        >
                            Portal Login ➔
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navbar