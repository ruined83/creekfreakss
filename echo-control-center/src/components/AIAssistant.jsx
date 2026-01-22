import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI system monitoring assistant. Ask me about system health, anomalies, or troubleshooting!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses for system monitoring
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('system') || lowerQ.includes('health')) {
            return 'All systems are operational. CPU usage is at 45%, memory at 62%, and disk at 78%. The API server shows 99.8% uptime. No critical alerts detected.';
        } else if (lowerQ.includes('alert') || lowerQ.includes('warning')) {
            return 'You have 3 active warnings: 1) Disk space on Server-03 is at 78% 2) API response time increased by 12% 3) Database connection pool at 85% capacity. I recommend investigating Server-03 disk usage first.';
        } else if (lowerQ.includes('anomaly') || lowerQ.includes('unusual')) {
            return 'I detected an unusual spike in API response times between 2-3 PM today. This correlates with increased database queries. Consider optimizing slow queries or adding caching.';
        } else if (lowerQ.includes('recommend') || lowerQ.includes('suggest')) {
            return 'Key recommendations: 1) Clean up disk space on Server-03 2) Optimize database queries causing API slowdown 3) Monitor connection pool usage 4) Consider scaling API servers during peak hours.';
        } else if (lowerQ.includes('predict') || lowerQ.includes('forecast')) {
            return 'Based on current trends, disk space on Server-03 will reach 90% in approximately 2 weeks. CPU usage is stable. Memory usage may increase by 5-10% next month based on growth patterns.';
        } else {
            return 'I can help you monitor system health, detect anomalies, troubleshoot issues, and predict potential problems. Try asking: "What\'s the system health?" or "Any anomalies detected?"';
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = { role: 'assistant', content: generateResponse(input) };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            {/* AI Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {/* AI Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 flex flex-col z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-cyan-500/30 flex items-center justify-between bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI System Monitor</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-700 text-white'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-cyan-500/30">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about system status..."
                                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Try: "What's the system health?" or "Any anomalies?"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
