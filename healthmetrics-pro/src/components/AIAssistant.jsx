import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI analytics assistant. Ask me anything about your data!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses based on keywords
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
            return 'Based on your data, revenue is trending upward with $45,231 total. The highest revenue month was March at $9,800. I recommend focusing on strategies that worked in March to replicate that success.';
        } else if (lowerQ.includes('user') || lowerQ.includes('growth')) {
            return 'You have 12,543 total users with a +12.5% growth rate. User acquisition peaked in January with 4,000 new users. Consider analyzing your January campaigns for insights.';
        } else if (lowerQ.includes('conversion')) {
            return 'Your conversion rate is 3.24%, up +0.5% from last period. This is above industry average. Focus on maintaining current strategies while testing incremental improvements.';
        } else if (lowerQ.includes('recommend') || lowerQ.includes('suggest')) {
            return 'Key recommendations: 1) Investigate the March revenue spike 2) Replicate January user acquisition tactics 3) Address the -3.1% drop in active sessions 4) Maintain current conversion optimization efforts.';
        } else if (lowerQ.includes('problem') || lowerQ.includes('issue')) {
            return 'I noticed active sessions are down -3.1%. This could indicate engagement issues. I recommend: analyzing user session duration, checking for technical issues, and reviewing recent product changes.';
        } else {
            return 'I can help you analyze your revenue trends, user growth, conversion rates, and provide actionable recommendations. Try asking: "What\'s my revenue trend?" or "How can I improve conversions?"';
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
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {/* AI Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI Analytics Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white'
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
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your data..."
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Try: "What's my revenue trend?" or "How can I improve?"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
