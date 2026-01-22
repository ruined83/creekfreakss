import React, { useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, Clock, User, Calendar, MessageSquare, Settings, Sparkles } from 'lucide-react';

function AISecretaryPage() {
    const [selectedCall, setSelectedCall] = useState(null);

    const callLogs = [
        {
            id: 1,
            caller: 'New Client - Jessica Martinez',
            phone: '(555) 789-0123',
            date: '2025-12-26',
            time: '9:15 AM',
            duration: '2m 34s',
            type: 'incoming',
            outcome: 'Booked',
            service: 'Consultation',
            bookingDate: 'Dec 28, 2025 at 2:00 PM',
            transcript: 'AI: Hello! Thank you for calling. How can I help you today?\nCaller: Hi, I\'d like to book a consultation.\nAI: I\'d be happy to help you schedule a consultation. What date works best for you?\nCaller: How about this Friday?\nAI: Friday, December 28th works great. We have availability at 2:00 PM. Does that work for you?\nCaller: Perfect!\nAI: Wonderful! I\'ve booked your consultation for Friday, December 28th at 2:00 PM. You\'ll receive a confirmation email shortly. Is there anything else I can help you with?\nCaller: No, that\'s all. Thank you!\nAI: You\'re welcome! We look forward to seeing you on Friday. Have a great day!'
        },
        {
            id: 2,
            caller: 'Existing Client - Tom Wilson',
            phone: '(555) 234-5678',
            date: '2025-12-26',
            time: '10:30 AM',
            duration: '1m 45s',
            type: 'incoming',
            outcome: 'Rescheduled',
            service: 'Follow-up',
            bookingDate: 'Dec 30, 2025 at 11:00 AM',
            transcript: 'AI: Hello! Thank you for calling. How can I assist you?\nCaller: I need to reschedule my appointment tomorrow.\nAI: I can help you with that. Let me pull up your booking... I see you have a follow-up scheduled for tomorrow at 3:00 PM. When would you like to reschedule?\nCaller: Can we do Monday morning instead?\nAI: Monday, December 30th at 11:00 AM is available. Would that work?\nCaller: Yes, perfect.\nAI: Great! I\'ve rescheduled your follow-up to Monday, December 30th at 11:00 AM. You\'ll receive an updated confirmation. Anything else?\nCaller: No, thanks!\nAI: You\'re welcome! See you Monday!'
        },
        {
            id: 3,
            caller: 'New Inquiry - Mark Stevens',
            phone: '(555) 876-5432',
            date: '2025-12-25',
            time: '4:20 PM',
            duration: '3m 12s',
            type: 'incoming',
            outcome: 'Information',
            service: 'General Inquiry',
            transcript: 'AI: Hello! Thank you for calling. How may I help you today?\nCaller: Hi, I\'m interested in learning more about your services.\nAI: I\'d be happy to tell you about our services. We offer consultations, follow-up sessions, initial meetings, and reviews. Which service are you most interested in?\nCaller: What\'s included in a consultation?\nAI: A consultation is a one-hour session where we discuss your needs and create a customized plan. The cost is $150. Would you like to schedule one?\nCaller: Let me think about it and call back.\nAI: Of course! Feel free to call anytime. We\'re here to help. Have a great day!'
        },
        {
            id: 4,
            caller: 'Sarah Johnson',
            phone: '(555) 123-4567',
            date: '2025-12-25',
            time: '2:10 PM',
            duration: '1m 20s',
            type: 'incoming',
            outcome: 'Confirmed',
            service: 'Appointment Confirmation',
            transcript: 'AI: Hello Sarah! Thank you for calling. How can I help you?\nCaller: I just wanted to confirm my appointment for tomorrow.\nAI: Let me check... Yes, you have a consultation scheduled for tomorrow, December 26th at 10:00 AM. Your appointment is confirmed!\nCaller: Great, thank you!\nAI: You\'re welcome! We look forward to seeing you tomorrow. Have a wonderful day!'
        },
    ];

    const stats = [
        { label: 'Total Calls Handled', value: '47', icon: Phone, color: 'blue' },
        { label: 'Bookings Made', value: '18', icon: Calendar, color: 'green' },
        { label: 'Avg. Call Duration', value: '2m 15s', icon: Clock, color: 'purple' },
        { label: 'Success Rate', value: '92%', icon: Sparkles, color: 'orange' },
    ];

    const getOutcomeColor = (outcome) => {
        switch (outcome.toLowerCase()) {
            case 'booked': return 'bg-green-100 text-green-700';
            case 'rescheduled': return 'bg-blue-100 text-blue-700';
            case 'confirmed': return 'bg-purple-100 text-purple-700';
            case 'information': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900">AI Call Secretary</h1>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold">
                            ✨ PREMIUM
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">24/7 AI-powered phone assistant handling your calls</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Settings size={18} />
                    Configure AI
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                                    <Icon size={20} className={`text-${stat.color}-600`} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* AI Features Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">AI Secretary Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Sparkles size={16} />
                                <span>Answers calls 24/7 - never miss a booking</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Books appointments automatically</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                <span>Answers common questions about services</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>Handles reschedules and confirmations</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-sm">Powered by</p>
                        <p className="text-lg font-bold">Bland.ai</p>
                    </div>
                </div>
            </div>

            {/* Call Logs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Recent Calls</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {callLogs.map((call) => (
                        <div
                            key={call.id}
                            onClick={() => setSelectedCall(call)}
                            className="p-6 hover:bg-gray-50 cursor-pointer transition"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`p-3 rounded-lg ${call.type === 'incoming' ? 'bg-green-100' : 'bg-blue-100'}`}>
                                        {call.type === 'incoming' ? (
                                            <PhoneIncoming size={20} className="text-green-600" />
                                        ) : (
                                            <PhoneOutgoing size={20} className="text-blue-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-semibold text-gray-900">{call.caller}</h4>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getOutcomeColor(call.outcome)}`}>
                                                {call.outcome}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Phone size={14} />
                                                {call.phone}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {call.date} at {call.time}
                                            </span>
                                            <span>Duration: {call.duration}</span>
                                        </div>
                                        {call.bookingDate && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                                <Calendar size={14} />
                                                <span>Booked: {call.service} - {call.bookingDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition text-sm">
                                    View Transcript
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call Transcript Modal */}
            {selectedCall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Call Transcript</h3>
                                <p className="text-gray-600">{selectedCall.caller} - {selectedCall.date} at {selectedCall.time}</p>
                            </div>
                            <button onClick={() => setSelectedCall(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                ×
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Outcome:</span>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getOutcomeColor(selectedCall.outcome)}`}>
                                        {selectedCall.outcome}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="ml-2 font-medium">{selectedCall.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {selectedCall.transcript.split('\n').map((line, i) => {
                                const isAI = line.startsWith('AI:');
                                const text = line.replace(/^(AI:|Caller:)\s*/, '');
                                return (
                                    <div key={i} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg ${isAI ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-900'
                                            }`}>
                                            <p className="text-xs font-semibold mb-1">{isAI ? 'AI Secretary' : 'Caller'}</p>
                                            <p className="text-sm">{text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setSelectedCall(null)}
                            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AISecretaryPage;
