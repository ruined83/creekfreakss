
import React from 'react';

const GlitchText = ({ text, as: Component = 'span', isActive = false, className = '' }) => {
    if (!isActive) return <Component className={className}>{text}</Component>;

    return (
        <Component className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#ff0044] opacity-70 animate-glitch-1" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#00ccff] opacity-70 animate-glitch-2" aria-hidden="true">
                {text}
            </span>

            <style jsx>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 2px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -2px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(0% 0 80% 0); transform: translate(-2px, 2px); }
        }
        .animate-glitch-1 {
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
      `}</style>
        </Component>
    );
};

export default GlitchText;
