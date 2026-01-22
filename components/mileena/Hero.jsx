'use client';

import React from 'react';
import { useMileenaMode } from '@/hooks/useMileenaMode';

function Hero() {
    const { isPremium, togglePremium, isLoaded } = useMileenaMode();

    if (!isLoaded) return null; // or a skeleton

    return (
        <section className="bg-gray-800 py-12 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: isPremium ? '#1a0005' : '#1f2937' }}>
            {isPremium && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            )}
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center">
                    <h1 className={`text-4xl font-bold mb-4 transition-all duration-500 ${isPremium ? 'text-red-500 font-gothic tracking-widest' : 'text-white'}`}>
                        {isPremium ? "MILEENA'S HAREM" : "Mileena's Sirens"}
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        {isPremium
                            ? "Indulge in your deepest desires with our elite selection."
                            : "Discover your perfect digital companion from Mileena's exclusive roster."}
                    </p>
                    <div className="flex justify-center flex-col items-center gap-6">
                        {/* Toggle Switch */}
                        <button
                            onClick={togglePremium}
                            className={`relative w-64 py-3 px-6 rounded-full border transition-all duration-500 overflow-hidden group ${isPremium
                                ? 'bg-black border-red-600 shadow-[0_0_20px_#ff0000]'
                                : 'bg-gray-700 border-gray-500 hover:border-gray-400'
                                }`}
                        >
                            <span className={`relative z-10 font-bold tracking-wider transition-colors duration-300 ${isPremium ? 'text-red-500' : 'text-gray-300'}`}>
                                {isPremium ? "🔓 SIN MODE: ACTIVE" : "🔒 UNLOCK PREMIUM"}
                            </span>
                            {isPremium && (
                                <div className="absolute inset-0 bg-red-900/20 blur-xl group-hover:bg-red-900/40 transition-all"></div>
                            )}
                        </button>

                        {/* NSFW Warning */}
                        {isPremium && (
                            <div className="animate-pulse flex items-center gap-2 text-red-500 text-xs font-gothic tracking-widest border border-red-900/50 px-4 py-1 rounded bg-black/50">
                                <span>⚠️</span>
                                <span>WARNING: EXPLICIT / MATURE CONTENT ENABLED</span>
                                <span>⚠️</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
