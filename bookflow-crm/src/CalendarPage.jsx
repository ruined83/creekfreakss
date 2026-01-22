import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, User, Tag } from 'lucide-react';

function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [view, setView] = useState('month'); // month, week, day

    // Extended booking data
    const bookings = [
        { id: 1, clientName: 'Sarah Johnson', service: 'Consultation', date: '2025-12-26', time: '10:00 AM', duration: '1h', status: 'Confirmed', color: 'blue' },
        { id: 2, clientName: 'Michael Chen', service: 'Follow-up', date: '2025-12-26', time: '2:00 PM', duration: '30m', status: 'Confirmed', color: 'green' },
        { id: 3, clientName: 'Emily Rodriguez', service: 'Initial Meeting', date: '2025-12-27', time: '11:00 AM', duration: '1h', status: 'Pending', color: 'purple' },
        { id: 4, clientName: 'David Kim', service: 'Review', date: '2025-12-27', time: '3:00 PM', duration: '45m', status: 'Confirmed', color: 'orange' },
        { id: 5, clientName: 'Lisa Wang', service: 'Consultation', date: '2025-12-30', time: '9:00 AM', duration: '1h', status: 'Confirmed', color: 'blue' },
        { id: 6, clientName: 'James Brown', service: 'Follow-up', date: '2025-12-30', time: '1:00 PM', duration: '30m', status: 'Pending', color: 'green' },
    ];

    const getDaysInMonth = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const getBookingsForDay = (day) => {
        if (!day) return [];
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return bookings.filter(b => b.date === dateStr);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleDayClick = (day) => {
        if (day) {
            setSelectedDate(day);
            setShowBookingModal(true);
        }
    };

    const colorMap = {
        blue: 'bg-blue-100 text-blue-700 border-blue-300',
        green: 'bg-green-100 text-green-700 border-green-300',
        purple: 'bg-purple-100 text-purple-700 border-purple-300',
        orange: 'bg-orange-100 text-orange-700 border-orange-300',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                    <p className="text-gray-600 mt-1">Manage your bookings and appointments</p>
                </div>
                <button
                    onClick={() => setShowBookingModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    New Booking
                </button>
            </div>

            {/* Calendar Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('month')}
                            className={`px-4 py-2 rounded-lg transition ${view === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setView('week')}
                            className={`px-4 py-2 rounded-lg transition ${view === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setView('day')}
                            className={`px-4 py-2 rounded-lg transition ${view === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Day
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-semibold text-gray-700 py-3 border-b border-gray-200">
                            {day}
                        </div>
                    ))}

                    {/* Calendar Days */}
                    {getDaysInMonth().map((day, i) => {
                        const dayBookings = getBookingsForDay(day);
                        const isToday = day &&
                            day === new Date().getDate() &&
                            currentMonth.getMonth() === new Date().getMonth() &&
                            currentMonth.getFullYear() === new Date().getFullYear();

                        return (
                            <div
                                key={i}
                                onClick={() => handleDayClick(day)}
                                className={`min-h-[120px] p-2 border border-gray-200 rounded-lg transition ${day ? 'hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'
                                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                {day && (
                                    <>
                                        <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                                            {day}
                                        </div>
                                        <div className="space-y-1">
                                            {dayBookings.slice(0, 3).map(booking => (
                                                <div
                                                    key={booking.id}
                                                    className={`text-xs p-1 rounded border ${colorMap[booking.color]} truncate`}
                                                >
                                                    {booking.time} - {booking.clientName}
                                                </div>
                                            ))}
                                            {dayBookings.length > 3 && (
                                                <div className="text-xs text-gray-500 font-medium">
                                                    +{dayBookings.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">New Booking</h3>
                            <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Select or add client"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option>Consultation</option>
                                        <option>Follow-up</option>
                                        <option>Initial Meeting</option>
                                        <option>Review</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <input
                                        type="date"
                                        defaultValue={selectedDate ? `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` : ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="time"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>30 minutes</option>
                                    <option>45 minutes</option>
                                    <option>1 hour</option>
                                    <option>1.5 hours</option>
                                    <option>2 hours</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                                <textarea
                                    rows="3"
                                    placeholder="Add any notes about this booking..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowBookingModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Create Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarPage;
