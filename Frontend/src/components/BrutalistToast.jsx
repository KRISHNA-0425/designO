import toast from 'react-hot-toast';

/**
 * 🎨 Centralized Custom Neo-Brutalist Toast Component
 * @param {string} message - Feedback message text to show
 * @param {'success' | 'error' | 'info'} type - Custom style type selector
 */
export const brutalToast = (message, type = 'success') => {
    // Determine high-contrast neon backgrounds based on execution state
    const bgColors = {
        success: '#6ee7b7', // Emerald-300
        error: '#f87171',   // Red-400
        info: '#38bdf8',    // Sky-300
    };

    const icons = {
        success: '✓',
        error: '✕',
        info: '✨',
    };

    return toast.custom(
        (t) => (
            <div
                className={`
                    border-4 border-black p-4 flex items-center gap-3 font-mono text-xs font-black uppercase tracking-wider text-black
                    transition-all duration-300 transform shadow-[4px_4px_0px_0px_#000000]
                    ${t.visible ? 'animate-enter opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}
                style={{ background: bgColors[type] || bgColors.success }}
            >
                <span className="text-sm bg-black text-white w-5 h-5 flex items-center justify-center border border-black font-bold">
                    {icons[type]}
                </span>
                <div>{message}</div>
            </div>
        ),
        {
            duration: 3000,
            position: 'top-right',
        }
    );
};