
import React from 'react';

export default function SinDiary({ isOpen, entries }) {
    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-[#0a0005]/95 backdrop-blur-xl border-l border-red-900/50 shadow-2xl transition-transform duration-500 z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 h-full flex flex-col font-gothic">
                <h2 className="text-2xl text-red-500 mb-2 border-b border-red-900/30 pb-4 tracking-widest uppercase text-center">
                    Subject Dossier
                </h2>

                <div className="flex-1 overflow-y-auto space-y-4 mt-6 custom-scrollbar">
                    {entries.length === 0 ? (
                        <p className="text-gray-500 italic text-center text-sm font-body">No data collected... yet.</p>
                    ) : (
                        entries.map((entry, idx) => (
                            <div key={idx} className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg animate-fade-in group hover:bg-red-900/20 transition-colors">
                                <div className="text-red-400 text-xs uppercase tracking-wider mb-1">{entry.label}</div>
                                <div className="text-white font-body text-sm">{entry.value}</div>
                                <div className="h-px w-0 group-hover:w-full bg-red-500/50 mt-2 transition-all duration-700"></div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-auto pt-6 border-t border-red-900/30">
                    <div className="text-[10px] text-red-500/50 text-center uppercase tracking-[0.2em]">
                        Surveillance Active
                    </div>
                    {/* Visual Decoder Decoration */}
                    <div className="flex justify-center gap-1 mt-2 opacity-30">
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0005; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b0000; 
          border-radius: 2px;
        }
      `}</style>
        </div>
    );
}
