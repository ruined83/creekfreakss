import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI team assistant. Ask me about team performance, task assignments, or collaboration optimization!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses for team management
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('team') || lowerQ.includes('performance')) {
            return 'Team performance is strong at 92% overall. Top performers: Sarah (98% completion rate), Mike (95%), Lisa (93%). The development team is slightly overloaded with 47 active tasks vs capacity of 40. Consider redistributing 7 tasks.';
        } else if (lowerQ.includes('task') || lowerQ.includes('assign')) {
            return 'Smart task assignment recommendation: Assign the "API Integration" task to Mike (has relevant experience, currently at 80% capacity). The "UI Design" task should go to Lisa (design specialist, 70% capacity). Avoid assigning to Sarah (at 100% capacity).';
        } else if (lowerQ.includes('collaboration') || lowerQ.includes('communication')) {
            return 'Collaboration metrics: Average response time: 2.3 hours. Most active collaboration: Design-Dev team (87 interactions this week). Potential issue: Marketing team has low cross-team engagement (only 12 interactions). Recommend scheduling sync meetings.';
        } else if (lowerQ.includes('recommend') || lowerQ.includes('suggest')) {
            return 'Key recommendations: 1) Redistribute 7 tasks from overloaded developers 2) Increase Marketing team collaboration 3) Recognize top performers (Sarah, Mike, Lisa) 4) Schedule team capacity planning for next sprint.';
        } else if (lowerQ.includes('predict') || lowerQ.includes('forecast')) {
            return 'Sprint forecast: At current velocity, team will complete 42 of 50 planned tasks (84%). Development team may miss deadline by 2 days unless tasks are redistributed. Design team is on track to finish early.';
        } else {
            return 'I can help you optimize team performance, assign tasks intelligently, improve collaboration, and forecast sprint outcomes. Try asking: "How is team performance?" or "Suggest task assignments"';
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const aiResponse = { role: 'assistant', content: generateResponse(input) };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-500/50 transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-500/30 flex flex-col z-50">
                    <div className="p-4 border-b border-teal-500/30 flex items-center justify-between bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI Team Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-teal-500/30">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your team..."
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Try: "How is team performance?" or "Suggest task assignments"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
