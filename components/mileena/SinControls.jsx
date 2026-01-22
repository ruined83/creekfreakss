
import React from 'react';

export default function SinControls({ sinLevel, setSinLevel }) {
    // Calculate color based on sin level (starts dark red, gets brighter/neon)
    const intensity = sinLevel / 10;
    const glow = `0 0 ${sinLevel * 3}px rgba(255, 0, 68, ${intensity})`;

    return (
        <div className="fixed bottom-24 right-6 z-50 group">
            <div className="relative bg-[#1a000a] backdrop-blur-xl border border-red-900/50 p-4 rounded-2xl shadow-2xl transition-all duration-500 hover:border-red-500 w-16 group-hover:w-64 overflow-hidden h-64 flex flex-col items-center justify-between group-hover:items-stretch">

                {/* Label (Vertical when collapsed, horizontal when expanded) */}
                <div className="text-red-500 font-gothic tracking-widest text-xs uppercase transform -rotate-90 group-hover:rotate-0 transition-transform duration-300 whitespace-nowrap mb-4 group-hover:mb-2 text-center">
                    Sin Level: {sinLevel}
                </div>

                {/* The Slider Container */}
                <div className="flex-1 w-full relative flex items-center justify-center">
                    {/* The Track */}
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={sinLevel}
                        onChange={(e) => setSinLevel(parseInt(e.target.value))}
                        className="
                    appearance-none h-48 w-2 bg-gray-900 rounded-full outline-none
                    group-hover:h-2 group-hover:w-full group-hover:bg-gray-900
                    cursor-pointer z-10
                    slider-vertical group-hover:slider-horizontal
                "
                        style={{
                            background: `linear-gradient(to ${typeof window !== 'undefined' && window.innerWidth > 768 ? 'top' : 'right'}, #1a000a 0%, #8b0000 ${sinLevel * 10}%, #0a0005 100%)`
                        }}
                    />

                    {/* Visual Flair items that only show on hover/expand could go here */}
                </div>

                {/* Status Text */}
                <div className="mt-2 text-[10px] text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {sinLevel < 4 ? 'Professional' : sinLevel < 8 ? 'Intimate' : 'OBSESSIVE'}
                </div>
            </div>

            {/* Styles for the range input thumb */}
            <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #ff0044;
            cursor: pointer;
            box-shadow: ${glow};
            transition: all 0.3s ease;
        }
        .slider-vertical {
            writing-mode: bt-lr; /* IE/Edge */
            -webkit-appearance: slider-vertical; /* Webkit */
        }
        .group:hover .slider-horizontal {
             -webkit-appearance: slider-horizontal;
             writing-mode: lr-tb;
        }
      `}</style>
        </div>
    );
}
