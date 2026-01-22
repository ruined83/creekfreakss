'use client';

import React from 'react';
import Link from 'next/link';
import { assistants } from '@/lib/mileena-data';
import { useMileenaMode } from '@/hooks/useMileenaMode';

function AssistantList() {
    const { isPremium } = useMileenaMode();

    return (
        <section className={`py-12 transition-colors duration-1000 ${isPremium ? 'bg-black' : 'bg-[#1a0000]'}`}>
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl font-bold mb-8 text-center transition-colors ${isPremium ? 'text-red-600' : 'text-red-500'}`}>
                    {isPremium ? "SELECT YOUR MISTRESS" : "Mileena's Siren Roster"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assistants.map((assistant) => (
                        <div key={assistant.id} className={`p-6 rounded-lg shadow-lg flex flex-col items-center transition-all duration-500 ${isPremium ? 'bg-neutral-900 border border-red-900/30' : 'bg-gray-800'}`}>
                            <div className="relative w-48 h-48 mb-4 group">
                                <img
                                    src={isPremium ? assistant.image.premium : assistant.image.standard}
                                    alt={assistant.name}
                                    className={`w-full h-full object-cover rounded-lg border-2 transition-all duration-500 ${isPremium ? 'border-red-600 shadow-[0_0_15px_#ff0000] grayscale-0' : 'border-gray-500 grayscale-[20%] group-hover:grayscale-0'}`}
                                />
                                {isPremium && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                                )}
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${isPremium ? 'text-red-100 font-gothic' : 'text-white'}`}>{assistant.name}</h3>
                            <p className="text-gray-400 text-center mb-4">{assistant.role}</p>
                            <div className="flex justify-center gap-4 mt-4 w-full">
                                {assistant.id === 'ms-mileena' && !isPremium ? (
                                    <button
                                        disabled
                                        className="flex-1 text-center py-2 px-4 rounded-lg bg-gray-700 text-gray-500 cursor-not-allowed font-bold tracking-wider border border-gray-600"
                                    >
                                        LOCKED
                                    </button>
                                ) : (
                                    <a
                                        href={`/mileena/chat/${assistant.id}`}
                                        className={`flex-1 text-center py-2 px-4 rounded-lg transition-all duration-300 font-bold tracking-wider ${isPremium
                                            ? 'bg-red-700 text-white hover:bg-red-600 hover:shadow-[0_0_20px_#ff0044]'
                                            : 'bg-red-600 text-white hover:bg-red-500'
                                            }`}
                                    >
                                        {isPremium ? "ENTER" : "ENGAGE"}
                                    </a>
                                )}
                                <a
                                    href={`/mileena/assistant/${assistant.id}`}
                                    className={`flex-1 text-center border py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center ${isPremium
                                        ? 'border-red-900 text-red-500 hover:bg-red-900/20'
                                        : 'border-white/20 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {isPremium ? "GALLERY" : "PROFILE"}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AssistantList;
