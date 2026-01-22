import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI sales advisor. Ask me about product recommendations, inventory predictions, or revenue optimization!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses for e-commerce
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('product') || lowerQ.includes('recommend')) {
            return 'Top product recommendations: 1) "Wireless Headphones" - trending +45% this week, low stock (reorder now) 2) "Smart Watch Pro" - high margin, strong reviews 3) "Laptop Stand" - frequently bought with top sellers. Consider bundling these products for 15% revenue boost.';
        } else if (lowerQ.includes('inventory') || lowerQ.includes('stock')) {
            return 'Inventory analysis: 12 products need reordering (below safety stock). "Wireless Headphones" will stock out in 3 days at current sales rate. "Gaming Mouse" has excess inventory (180 days supply). Consider running promotion to clear excess stock.';
        } else if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
            return 'Revenue optimization opportunities: 1) Increase "Smart Watch Pro" visibility (high margin, low traffic) 2) Create bundle: Laptop + Stand + Mouse (projected +$2,400/week) 3) Upsell warranties on electronics (30% attach rate possible) 4) Flash sale on overstocked items.';
        } else if (lowerQ.includes('customer') || lowerQ.includes('behavior')) {
            return 'Customer insights: Average order value: $127 (+8% vs last month). Top customer segment: Tech enthusiasts (35% of revenue). Cart abandonment rate: 23% (industry avg: 28%). Recommendation: Send abandoned cart emails with 10% discount code.';
        } else if (lowerQ.includes('predict') || lowerQ.includes('forecast')) {
            return 'Sales forecast: Next week projected revenue: $45,200 (+12% vs this week). "Wireless Headphones" will be top seller (est. 340 units). Holiday season approaching - recommend stocking up on gift items by next month.';
        } else {
            return 'I can help you optimize product recommendations, manage inventory, increase revenue, analyze customer behavior, and forecast sales. Try asking: "What products should I promote?" or "Any inventory issues?"';
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
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-500/30 flex flex-col z-50">
                    <div className="p-4 border-b border-emerald-500/30 flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI Sales Advisor</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-emerald-600 text-white'
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
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-emerald-500/30">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about sales & inventory..."
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Try: "What products should I promote?" or "Forecast next week"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
