import React from 'react';
import toast from 'react-hot-toast';

export const brutalToast = (message, type = 'success') => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white border-4 border-black p-4 font-mono text-xs font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between pointer-events-auto transition-all`}
        >
            <div className="flex items-center gap-3">
                <span 
                    className={`inline-block w-4 h-4 border-2 border-black shadow-[2px_2px_0px_0px_#000000] ${
                        type === 'error' ? 'bg-red-500' : 'bg-emerald-400'
                    }`} 
                />
                <p className={type === 'error' ? 'text-black' : 'text-black'}>
                    {message}
                </p>
            </div>
            
            <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-4 border-2 border-black px-1.5 py-0.5 bg-yellow-300 font-bold hover:bg-black hover:text-white transition-all text-[10px] cursor-pointer shadow-[2px_2px_0px_0px_#000000]"
            >
                ✕
            </button>
        </div>
    ), { duration: 2500 });
};