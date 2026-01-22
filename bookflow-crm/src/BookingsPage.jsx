import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Tag, CheckCircle, XCircle, Clock } from 'lucide-react';

function BookingsPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const bookings = [
        { id: 1, clientName: 'Sarah Johnson', service: 'Consultation', date: '2025-12-26', time: '10:00 AM', duration: '1h', status: 'Confirmed', price: '$150' },
        { id: 2, clientName: 'Michael Chen', service: 'Follow-up', date: '2025-12-26', time: '2:00 PM', duration: '30m', status: 'Confirmed', price: '$75' },
        { id: 3, clientName: 'Emily Rodriguez', service: 'Initial Meeting', date: '2025-12-27', time: '11:00 AM', duration: '1h', status: 'Pending', price: '$150' },
        { id: 4, clientName: 'David Kim', service: 'Review', date: '2025-12-27', time: '3:00 PM', duration: '45m', status: 'Confirmed', price: '$100' },
        { id: 5, clientName: 'Lisa Wang', service: 'Consultation', date: '2025-12-30', time: '9:00 AM', duration: '1h', status: 'Confirmed', price: '$150' },
        { id: 6, clientName: 'James Brown', service: 'Follow-up', date: '2025-12-30', time: '1:00 PM', duration: '30m', status: 'Pending', price: '$75' },
        { id: 7, clientName: 'Anna Lee', service: 'Consultation', date: '2025-12-20', time: '10:00 AM', duration: '1h', status: 'Completed', price: '$150' },
        { id: 8, clientName: 'Tom Wilson', service: 'Review', date: '2025-12-18', time: '2:00 PM', duration: '45m', status: 'Completed', price: '$100' },
        { id: 9, clientName: 'Maria Garcia', service: 'Initial Meeting', date: '2025-12-15', time: '11:00 AM', duration: '1h', status: 'Cancelled', price: '$150' },
    ];

    const filteredBookings = bookings.filter(booking => {
        const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
        const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.service.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const stats = [
        { label: 'Total Bookings', value: bookings.length, color: 'blue' },
        { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length, color: 'green' },
        { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length, color: 'yellow' },
        { label: 'Completed', value: bookings.filter(b => b.status === 'Completed').length, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                <p className="text-gray-600 mt-1">Manage all appointments and bookings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by client or service..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-lg transition ${statusFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('confirmed')}
                            className={`px-4 py-2 rounded-lg transition ${statusFilter === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Confirmed
                        </button>
                        <button
                            onClick={() => setStatusFilter('pending')}
                            className={`px-4 py-2 rounded-lg transition ${statusFilter === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setStatusFilter('completed')}
                            className={`px-4 py-2 rounded-lg transition ${statusFilter === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Client</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Service</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date & Time</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Duration</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900">{booking.clientName}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Tag size={16} className="text-gray-400" />
                                            <span className="text-gray-900">{booking.service}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-400" />
                                            <div>
                                                <div className="text-gray-900">{booking.date}</div>
                                                <div className="text-sm text-gray-600">{booking.time}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-gray-900">{booking.duration}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-900">{booking.price}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <button className="p-1 text-green-600 hover:bg-green-50 rounded transition" title="Confirm">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button className="p-1 text-red-600 hover:bg-red-50 rounded transition" title="Cancel">
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookingsPage;
