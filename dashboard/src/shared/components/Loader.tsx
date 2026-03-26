import { useEffect, useState } from "react";

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 300);
                    setTimeout(() => setDone(true), 700);
                    return 100;
                }
                return Math.min(p + Math.random() * 12, 100);
            });
        }, 180);
        return () => clearInterval(interval);
    }, []);

    if (done) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F5F8] transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* Background glow */}
            <div className="absolute w-80 h-80 rounded-full bg-[#5C65F6]/10 animate-pulse" />

            {/* Logo + spinner */}
            <div className="relative flex items-center justify-center mb-10 animate-[floatY_3s_ease-in-out_infinite]">
                {/* Spinning ring */}
                <svg
                    className="absolute animate-spin"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                >
                    <circle cx="36" cy="36" r="34" stroke="#E5E7EB" strokeWidth="2" />
                    <circle
                        cx="36"
                        cy="36"
                        r="34"
                        stroke="#5C65F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="50 164"
                        className="origin-center"
                    />
                </svg>

                {/* Icon box */}
                <div className="w-10 h-10 rounded-xl bg-[#5C65F6] flex items-center justify-center shadow-lg shadow-[#5C65F6]/30">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="4" y="4" width="5" height="12" rx="2" fill="white" />
                        <rect x="11" y="4" width="5" height="8" rx="2" fill="white" opacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* Label */}
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9CA3AF] mb-8 animate-[fadeUp_0.5s_ease_both]">
                Loading
            </p>

            {/* Progress bar */}
            <div className="w-48 h-[3px] bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5C65F6] to-[#A5B4FC] transition-all duration-200 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>

            {/* Percentage */}
            <p className="mt-3 text-xs font-medium text-[#A5B4FC] tabular-nums">
                {Math.min(Math.round(progress), 100)}%
            </p>

            <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}