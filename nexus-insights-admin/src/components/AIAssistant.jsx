import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI data analyst. Ask me about insights, trends, anomalies, or data predictions!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses for data analysis
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('insight') || lowerQ.includes('trend')) {
            return 'Key insights from your data: 1) User engagement increased 23% in Q1 2) Revenue per user grew by $4.50 3) Churn rate decreased to 2.1% (best in 6 months) 4) Mobile traffic now represents 67% of total visits.';
        } else if (lowerQ.includes('anomaly') || lowerQ.includes('unusual')) {
            return 'I detected an unusual spike in user signups on March 15th (+340% vs average). This correlates with a viral social media post. Also, API response times increased by 45% during peak hours - may need infrastructure scaling.';
        } else if (lowerQ.includes('predict') || lowerQ.includes('forecast')) {
            return 'Based on current trends, I predict: 1) 15% revenue growth next quarter 2) User base will reach 50K by end of Q2 3) Mobile traffic will exceed 70% by summer 4) Potential capacity issues if growth continues at current rate.';
        } else if (lowerQ.includes('recommend') || lowerQ.includes('suggest')) {
            return 'Recommendations: 1) Capitalize on mobile-first strategy (67% traffic) 2) Investigate March 15 viral success for replication 3) Scale infrastructure before hitting capacity limits 4) Focus retention efforts on high-value user segments.';
        } else if (lowerQ.includes('user') || lowerQ.includes('customer')) {
            return 'User analysis: Total users: 42,543 (+12.5% MoM). Most active segment: 25-34 age group (45% of revenue). Average session duration: 8.2 minutes. Top retention driver: personalized recommendations feature.';
        } else {
            return 'I can analyze your data for insights, detect anomalies, predict trends, and provide strategic recommendations. Try asking: "What insights do you see?" or "Any anomalies detected?"';
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
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/30 flex flex-col z-50">
                    <div className="p-4 border-b border-indigo-500/30 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI Data Analyst</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white'
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
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-indigo-500/30">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your data..."
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Try: "What insights do you see?" or "Predict next quarter"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
