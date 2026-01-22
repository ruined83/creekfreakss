import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X } from 'lucide-react';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI workflow optimizer. Ask me about team productivity, workflow efficiency, or resource allocation!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock AI responses for workflow optimization
    const generateResponse = (question) => {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('workflow') || lowerQ.includes('efficiency')) {
            return 'Your workflows are running at 87% efficiency. The "Content Creation" workflow has the highest completion rate (94%), while "Design Review" could be optimized (72% efficiency). Consider streamlining approval steps.';
        } else if (lowerQ.includes('team') || lowerQ.includes('productivity')) {
            return 'Team productivity is strong at 89%. Top performers: Sarah Chen (98% task completion), Mike Johnson (95%). The design team could benefit from better task distribution - currently 3 members are overloaded.';
        } else if (lowerQ.includes('bottleneck') || lowerQ.includes('slow')) {
            return 'I detected bottlenecks in the approval process. Tasks spend an average of 2.3 days waiting for approval. Recommendation: Implement automated approvals for low-risk tasks or add more approvers.';
        } else if (lowerQ.includes('recommend') || lowerQ.includes('suggest')) {
            return 'Key recommendations: 1) Automate repetitive tasks in Design Review workflow 2) Redistribute tasks from overloaded team members 3) Implement approval automation 4) Add workflow templates for common processes.';
        } else if (lowerQ.includes('predict') || lowerQ.includes('forecast')) {
            return 'Based on current velocity, your team will complete 47 tasks this week (target: 50). The Content Creation workflow is on track, but Design Review may fall behind by 15%. Consider reallocating resources.';
        } else {
            return 'I can help you optimize workflows, improve team productivity, identify bottlenecks, and forecast completion rates. Try asking: "How efficient are our workflows?" or "Any bottlenecks?"';
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
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all z-50 animate-pulse"
                >
                    <Sparkles size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 flex flex-col z-50">
                    <div className="p-4 border-b border-purple-500/30 flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-semibold">AI Workflow Optimizer</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-purple-600 text-white'
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
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-purple-500/30">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about workflows..."
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Try: "How efficient are workflows?" or "Any bottlenecks?"</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
