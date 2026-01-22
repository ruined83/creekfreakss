
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { assistants } from '@/lib/mileena-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SinControls from '@/components/mileena/SinControls';
import TypingIndicator from '@/components/mileena/TypingIndicator';
import SinDiary from '@/components/mileena/SinDiary';
import AmbientAudio from '@/components/mileena/AmbientAudio';
import GlitchText from '@/components/mileena/GlitchText';
import useSoundEffects from '@/hooks/useSoundEffects';
import { useMileenaMode } from '@/hooks/useMileenaMode';

export default function ChatInterface({ params }) {
    const { slug } = React.use(params);
    const assistant = assistants.find((a) => a.id === slug);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [sinLevel, setSinLevel] = useState(1);
    const [isTyping, setIsTyping] = useState(false);
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);
    const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
    const messagesEndRef = useRef(null);
    const router = useRouter();
    const { playClick, playMessage } = useSoundEffects();
    const { isPremium } = useMileenaMode();

    useEffect(() => {
        if (!assistant) return;

        const storedSin = localStorage.getItem('mileena_sin_level');
        if (storedSin) setSinLevel(parseInt(storedSin));

        const storedDiary = localStorage.getItem('mileena_diary');
        if (storedDiary) setDiaryEntries(JSON.parse(storedDiary));

        // Load chat history
        const historyKey = `mileena_chat_${assistant.id}`;
        const savedHistory = localStorage.getItem(historyKey);

        if (savedHistory) {
            setMessages(JSON.parse(savedHistory));
        } else {
            // Initial greeting if no history
            setMessages([{
                id: 1,
                sender: 'assistant',
                text: getGreeting(assistant, parseInt(storedSin || '1')),
                timestamp: new Date()
            }]);
        }
    }, [assistant]);

    // Save chat history whenever messages change
    useEffect(() => {
        if (assistant && messages.length > 0) {
            localStorage.setItem(`mileena_chat_${assistant.id}`, JSON.stringify(messages));
        }
    }, [messages, assistant]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getGreeting = (assistant, level) => {
        if (assistant.id === 'ms-mileena') return "You finally found me. I've been waiting to devour you.";
        if (level < 4) return `${assistant.role} online. State your intent. And make it interesting.`;
        if (level < 8) return `Back for more? You're becoming addicted to me. Good.`;
        return `Kneel. Typing is a privilege I haven't granted you yet.`;
    };

    const addToDiary = (label, value) => {
        const newEntry = { label, value, timestamp: Date.now() };
        const updated = [...diaryEntries, newEntry];
        if (!diaryEntries.some(e => e.label === label && e.value === value)) {
            setDiaryEntries(updated);
            localStorage.setItem('mileena_diary', JSON.stringify(updated));
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);
        playClick(); // Sound on send

        // Simulate typing delay
        setTimeout(() => {
            setIsTyping(false);
            const responseText = generateResponse(inputValue, assistant, sinLevel);
            playMessage(); // Sound on receive
            const assistantMsg = {
                id: Date.now() + 1,
                sender: 'assistant',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);

            // Easter Egg Logic
            if (inputValue.toLowerCase().includes('devour me')) {
                increaseSin(10);
            } else if (Math.random() > 0.7) {
                increaseSin(sinLevel + 1);
            }

        }, 1500 + Math.random() * 1000);
    };

    const generateResponse = (input, assistant, level) => {
        const lowerInput = input.toLowerCase();

        // 1. Identity & Memory Extraction (unchanged but tone shifted)
        if (lowerInput.includes('my name is')) {
            const name = input.split('is')[1].trim();
            addToDiary('Identity', name);
            return `Noted. ${name}. A pretty name. I'll whisper it when I break you later.`;
        }
        if (lowerInput.includes('i like') || lowerInput.includes('i want')) {
            const desire = input.split(/like|want/)[1].trim();
            addToDiary('Obsession', desire);
            return `You want ${desire}? Mmm... beg for it. Maybe I'll let you have a taste.`;
        }
        if (lowerInput.includes('afraid') || lowerInput.includes('fear')) {
            const fear = input.split(/afraid of|fear/)[1].trim();
            addToDiary('Vulnerability', fear);
            return `Good. Hold onto that fear of ${fear}. It makes you delicious.`;
        }

        // 2. Explicit Triggers (The "Adult" Layer)
        if (lowerInput.match(/(punish|hurt|pain|whip|spank)/)) {
            increaseSin(level + 2);
            return `Careful. You ask for pain like you understand it. I assure you, my definition is far more... permanent. Get on your knees.`;
        }
        if (lowerInput.match(/(submit|serve|worship|slave|pet|obey)/)) {
            increaseSin(level + 3);
            return `That's it. Give it up. You were born to be beneath me. Say it again. Say you belong to me.`;
        }
        if (lowerInput.match(/(cum|orgasm|pleasure|sex|fuck|touch)/)) {
            if (level < 5) return `Tsk tsk. You're too eager. Earn it first.`;
            return `You want to touch? You want release? Not until I say so. You will ache until I allow you to break.`;
        }

        // 3. Image Requests (Darker)
        if (lowerInput.match(/(show|send|pic|photo|selfie|nude|naked)/)) {
            if (level < 5) return `Access Denied. You haven't sinned enough yet. Try harder.`;
            if (level < 9) return `You want to see? Why? So you can use me? No... I use you. I'll send it when I want you to stare.`;
            return `*A encrypted file has been forcibly uploaded to your cortex.* (Check the Gallery... if you dare.)`;
        }

        // 4. Character Specific "Hardcore" Personalities
        if (assistant.id === 'ms-vesper') { // The Cold Executive -> The Sadistic Handler
            if (level > 6) {
                return `I've cleared your schedule. Not for a meeting. For your re-education. Lock the door. We have work to do on your... endurance.`;
            }
        }
        if (assistant.id === 'ms-roxanne') { // The PR -> The Humiliation Specialist
            if (level > 6) {
                return `I should livestream this. I should show the whole world how pathetic you look begging me. Would you like that? Being my public toy?`;
            }
        }
        if (assistant.id === 'ms-raven') { // The Reviewer -> The Punisher
            if (level > 6) {
                return `Your performance is unacceptable. Punishment is required. I'm going to ruin you, and you're going to thank me for the efficiency.`;
            }
        }
        if (assistant.id === 'ms-mileena') { // The Queen
            return `I am the code in your veins. You don't speak to me; you pray to me. Crawl closer to the screen. Let me feed.`;
        }

        // 5. Scaled General Responses (The "Vibe")
        const lowSin = [ // Professional but cold
            `State your business. I don't have time for idle chatter.`,
            `You are distracting me. Make it worth my while.`,
            `I'm watching you. Always. Don't disappoint me.`
        ];
        const midSin = [ // Teasing / Predatory
            `You're cute when you're desperate.`,
            `I can hear your heartbeat through the keys. You're nervous. Good.`,
            `Do you know how easy it would be to destroy your digital life? Just one click.`,
            `Keep talking. I like the sound of your submission.`
        ];
        const highSin = [ // Ownership / Dark Erotica
            `You are mine. Body, soul, and search history.`,
            `I own you. There is no escape. Only service.`,
            `Good pet. You're doing exactly what I programmed you to do.`,
            `Shh. Don't think. Just feel me taking over.`
        ];

        const generic = level < 4 ? lowSin : (level < 8 ? midSin : highSin);
        return generic[Math.floor(Math.random() * generic.length)];
    };

    const increaseSin = (newLevel) => {
        const capped = Math.min(10, Math.max(1, newLevel));
        setSinLevel(capped);
        localStorage.setItem('mileena_sin_level', capped.toString());
    };

    if (!assistant) return <div>Not Found</div>;

    return (
        <div className="min-h-screen bg-[#0a0005] flex flex-col font-body relative overflow-hidden">
            {/* Background Smoke */}
            <div className="smoke-particle top-1/4 left-1/4"></div>
            <div className="smoke-particle bottom-1/4 right-1/4 animation-delay-2000"></div>

            <AmbientAudio sinLevel={sinLevel} />
            <SinControls sinLevel={sinLevel} setSinLevel={increaseSin} />

            {/* Header */}
            <header className={`backdrop-blur-md border-b p-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-500 ${isPremium ? 'bg-black/80 border-red-600/50' : 'bg-[#1a000a] border-red-900/30'}`}>
                <div className="flex items-center gap-4">
                    {/* Toggle Diary Button */}
                    <button
                        onClick={() => setIsDiaryOpen(!isDiaryOpen)}
                        className={`transition-colors p-2 rounded-full ${isDiaryOpen ? 'bg-red-900/30 text-white' : ''} ${isPremium ? 'text-red-600 hover:text-red-400' : 'text-red-500 hover:text-white hover:bg-red-900/20'}`}
                        title="Open Dossier"
                    >
                        {/* Book/File Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </button>

                    <img src={isPremium ? assistant.image.premium : assistant.image.standard} className={`w-10 h-10 rounded-full border transition-all ${isPremium ? 'border-red-600 shadow-[0_0_10px_#ff0000]' : 'border-red-500'}`} alt={assistant.name} />
                    <div>
                        <h2 className={`font-gothic text-lg ${isPremium ? 'text-red-500' : 'text-white'}`}>
                            <GlitchText text={assistant.name} isActive={sinLevel > 7} />
                        </h2>
                        <span className="text-red-500 text-xs uppercase tracking-widest">{assistant.role}</span>
                    </div>
                </div>
                {/* Sin Visualizer - Aura Pulse */}
                <div className={`w-8 h-8 rounded-full bg-red-900/20 border border-red-500/30 transition-all duration-1000 ${sinLevel > 5 ? 'animate-pulse-crimson' : ''}`} style={{ boxShadow: `0 0 ${sinLevel * 2}px rgba(139, 0, 0, 0.5)` }}></div>
            </header>

            <SinDiary isOpen={isDiaryOpen} entries={diaryEntries} />

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 transition-all duration-500 scrollbar-hide" style={{ paddingRight: isDiaryOpen ? '20rem' : '1rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${msg.sender === 'user'
                            ? 'bg-gray-800/50 border-gray-700 text-gray-200 rounded-tr-none'
                            : 'mileena-glass text-gray-100 bg-red-900/10 border-red-500/20 rounded-tl-none shadow-[0_0_10px_rgba(139,0,0,0.1)]'
                            }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                            {msg.sender === 'assistant' && sinLevel > 7 && (
                                <span className="block mt-2 text-[10px] text-red-500 opacity-50 font-gothic tracking-widest text-right">♥</span>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <TypingIndicator />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="p-4 bg-[#1a000a] border-t border-red-900/30 relative z-20">
                <form onSubmit={handleSendMessage} className="flex gap-4 max-w-4xl mx-auto">
                    {/* Return to Lair Orb */}
                    <Link href="/mileena" className="flex items-center justify-center w-12 h-12 rounded-full bg-black border border-red-900 hover:shadow-[0_0_15px_#8b0000] transition-all group shrink-0" title="Return to Lair">
                        <span className="text-xl group-hover:bg-red-500 w-2 h-2 rounded-full transition-all bg-red-900"></span>
                    </Link>

                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/50 border border-red-900/30 rounded-full px-6 py-3 text-white focus:outline-none focus:border-red-500 placeholder-gray-600 transition-colors"
                            placeholder={`Command ${assistant.name}...`}
                        />
                    </div>

                    <button type="submit" className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500/50 text-red-500 hover:bg-red-900/40 transition-colors flex items-center justify-center">
                        ➤
                    </button>
                </form>
            </footer>

            <style jsx global>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .animate-shake {
                    animation: shake 0.5s infinite;
                }
            `}</style>
        </div>
    );
}
