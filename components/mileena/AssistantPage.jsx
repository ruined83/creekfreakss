'use client';

import React from 'react';
import { useMileenaMode } from '@/hooks/useMileenaMode';

function AssistantPage({ assistant }) {
    const { isPremium } = useMileenaMode();
    if (!assistant) return null;

    return (
        <section className={`py-12 min-h-screen transition-colors duration-1000 ${isPremium ? 'bg-black' : 'bg-gray-900'}`}>
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative inline-block mb-8 group">
                        <img
                            src={isPremium ? assistant.image.premium : assistant.image.standard}
                            alt={assistant.name}
                            className={`w-64 h-80 object-cover mx-auto rounded-lg shadow-2xl transition-all duration-500 ${isPremium
                                ? 'border-2 border-red-600 shadow-[0_0_30px_#ff0000]'
                                : 'border-2 border-red-900'
                                }`}
                        />
                        {isPremium && <div className="absolute inset-0 bg-red-500/10 rounded-lg animate-pulse"></div>}
                    </div>

                    <h1 className={`text-4xl font-bold mb-2 transition-colors ${isPremium ? 'text-red-600 font-gothic tracking-[0.2em]' : 'text-red-500'}`} style={{ fontFamily: isPremium ? 'Gothic A1, sans-serif' : 'Playfair Display, serif' }}>
                        {assistant.name.toUpperCase()}
                    </h1>
                    <h2 className={`text-2xl mb-4 font-light tracking-wide ${isPremium ? 'text-red-200' : 'text-white'}`}>{assistant.role}</h2>
                    <p className={`text-xl mb-8 italic ${isPremium ? 'text-gray-400' : 'text-gray-300'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        "{assistant.bio}"
                    </p>

                    <div className={`p-8 rounded-lg shadow-md border text-left transition-all duration-500 ${isPremium
                        ? 'bg-neutral-900 border-red-900/50 shadow-[0_0_20px_rgba(139,0,0,0.2)]'
                        : 'bg-gray-800 border-gray-700'
                        }`}>
                        <h3 className={`text-2xl font-semibold mb-4 ${isPremium ? 'text-red-500' : 'text-white'}`}>
                            {isPremium ? "HER DARKEST NATURE" : "Her Nature"}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {assistant.lore}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {assistant.traits.map(trait => (
                                <span key={trait} className={`px-3 py-1 rounded-full text-sm border transition-colors ${isPremium
                                    ? 'bg-red-950 text-red-500 border-red-800'
                                    : 'bg-red-900/30 text-red-400 border-red-900/50'
                                    }`}>
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12">
                        <a href={`/mileena/chat/${assistant.id}`} className={`py-4 px-12 rounded-lg transition-all duration-300 text-lg font-gothic tracking-widest shadow-lg inline-block ${isPremium
                            ? 'bg-red-800 text-white hover:bg-red-700 hover:shadow-[0_0_30px_#ff0000] animate-pulse border border-red-500'
                            : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_20px_#ff0044] shadow-red-900/20'
                            }`}>
                            {isPremium ? `ENTER ${assistant.name.toUpperCase()}` : `ENGAGE ${assistant.name.toUpperCase()}`}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AssistantPage;
