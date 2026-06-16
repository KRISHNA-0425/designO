import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
// 🔥 IMPORT UPDATED: Added the Ionicons eye vectors
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { auth, provider } from '../utils/firebase';

const AuthPortal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    // ⚡ NEW ACCESSIBILITY STATE: Controls the hidden/visible string parameter switch
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Logging in with standard credentials:", { email, password });
        } else {
            console.log("Registering with standard credentials:", { username, email, password });
        }
    };

    const handleGoogleAuth = async () => {

        try {
            const res = await signInWithPopup(auth, provider);
            // console.log(res)

            const User = res.user;

            const name = User.displayName;
            const email = User.email;


        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="min-h-screen w-full bg-[#222222] font-mono flex flex-col md:flex-row items-stretch overflow-x-hidden">

            {/* VISUAL MATRIX SIDEBAR PANEL (ONE HALF) */}
            <div className="w-full md:w-1/2 bg-amber-100 flex flex-col items-center justify-center p-8 text-center border-b-4 md:border-b-0 md:border-r-4 border-black select-none gap-6 min-h-[300px] md:min-h-screen">
                <h1 className="text-4xl lg:text-7xl font-black uppercase text-black tracking-tighter">
                    {isLogin ? 'Welcome Back' : 'Join Us Here'}
                </h1>
                <p className="text-sm font-bold text-zinc-700 max-w-sm uppercase tracking-tight">
                    {isLogin
                        ? 'Access your saved board whiteboards and continue building wireframes instantly.'
                        : 'Create your credential mapping tokens and start nesting customizable nodes.'}
                </p>

                {/* STATE SWITCH TOGGLE TRIGGER CONTROL */}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setShowPassword(false); // Reset eye vector visibility when swapping between forms
                    }}
                    className="mt-4 text-xs font-black uppercase tracking-widest bg-yellow-300 text-black border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer"
                >
                    {isLogin ? 'Switch to Register ➔' : '➔ Switch to Login'}
                </button>
            </div>

            {/* INTERACTIVE FORM HUB PANEL (THE OTHER HALF) */}
            <div className="w-full md:w-1/2 bg-[#FEFCE8] flex flex-col items-center justify-center p-6 md:p-12 min-h-[550px] md:min-h-screen">
                <div className="w-full max-w-md bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000000]">

                    <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 border-b-4 border-black pb-2">
                        {isLogin ? 'Account Login' : 'Register Profile'}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* CONDITIONAL FIELD: USERNAME ONLY FOR REGISTRATION */}
                        {!isLogin && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-black">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your username..."
                                    required={!isLogin}
                                    className="w-full bg-white border-4 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                                />
                            </div>
                        )}

                        {/* EMAIL ADDRESS INPUT FIELD */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black uppercase tracking-wider text-black">
                                Email Address:
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@domain.com"
                                required
                                className="w-full bg-white border-4 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                            />
                        </div>

                        {/* PASSWORD INPUT FIELD WITH INTEGRATED REACT-ICON TOGGLE */}
                        <div className="flex flex-col gap-1.5 mb-2">
                            <label className="text-xs font-black uppercase tracking-wider text-black">
                                Security Password:
                            </label>

                            {/* ⚡ THE FIX CONTAINER: Made position 'relative' to anchor the absolute eye switch button */}
                            <div className="w-full relative flex items-stretch">
                                <input
                                    // Dynamically toggles field behavior between text mask string and password dots string mapping
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full bg-white border-4 border-black p-3 pr-14 text-sm font-bold shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-yellow-50 transition-all placeholder:text-zinc-400"
                                />

                                {/* 👁️ INTERACTIVE EYE TOGGLE ICON TRIGGER */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-emerald-500 p-1 flex items-center justify-center transition-all cursor-pointer z-10"
                                    title={showPassword ? "Hide Password" : "Show Password"}
                                >
                                    {showPassword ? <IoMdEyeOff size={22} /> : <IoMdEye size={22} />}
                                </button>
                            </div>
                        </div>

                        {/* MASTER FORM SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className="w-full text-xs font-black uppercase tracking-widest bg-emerald-400 text-black border-4 border-black p-3.5 mt-2 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center"
                        >
                            {isLogin ? 'Authenticate Access ✓' : 'Register Account +'}
                        </button>

                        {/* OR SEPARATION BREAK LINE */}
                        <div className="flex items-center justify-center my-2 gap-3 select-none">
                            <div className="h-1 bg-black flex-grow"></div>
                            <span className="text-xs font-black text-black uppercase tracking-wider">OR</span>
                            <div className="h-1 bg-black flex-grow"></div>
                        </div>

                        {/* NEO-BRUTALIST GOOGLE SIGNUP/LOGIN BUTTON */}
                        <button
                            type="button"
                            onClick={handleGoogleAuth}
                            className="w-full flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest bg-white text-black border-4 border-black p-3.5 shadow-[4px_4px_0px_0px_#000000] transition-all hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer text-center"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>{isLogin ? 'Continue with Google' : 'Sign up with Google'}</span>
                        </button>

                    </form>

                </div>
            </div>

        </div>
    );
};

export default AuthPortal;