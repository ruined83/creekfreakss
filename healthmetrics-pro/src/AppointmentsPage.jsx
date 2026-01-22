import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

function AppointmentsPage() {
    const [viewMode, setViewMode] = useState('list'); // list or calendar
    const [filterType, setFilterType] = useState('all');

    const appointments = [
        { id: 1, patient: 'Sarah Johnson', type: 'In-Person', date: 'Dec 26, 2025', time: '10:00 AM', duration: '30 min', doctor: 'Dr. Smith', status: 'Confirmed', reason: 'Annual Checkup' },
        { id: 2, patient: 'Michael Chen', type: 'Telehealth', date: 'Dec 26, 2025', time: '2:00 PM', duration: '45 min', doctor: 'Dr. Johnson', status: 'Confirmed', reason: 'Follow-up' },
        { id: 3, patient: 'Emily Rodriguez', type: 'In-Person', date: 'Dec 27, 2025', time: '11:00 AM', duration: '1 hour', doctor: 'Dr. Williams', status: 'Pending', reason: 'Prenatal Visit' },
        { id: 4, patient: 'David Kim', type: 'Phone', date: 'Dec 27, 2025', time: '3:00 PM', duration: '15 min', doctor: 'Dr. Smith', status: 'Confirmed', reason: 'Lab Results' },
        { id: 5, patient: 'Lisa Wang', type: 'In-Person', date: 'Dec 30, 2025', time: '9:00 AM', duration: '45 min', doctor: 'Dr. Brown', status: 'Confirmed', reason: 'Physical Therapy' },
        { id: 6, patient: 'James Brown', type: 'In-Person', date: 'Dec 27, 2025', time: '1:00 PM', duration: '1 hour', doctor: 'Dr. Davis', status: 'Cancelled', reason: 'Cardiology' },
    ];

    const filteredAppointments = appointments.filter(apt =>
        filterType === 'all' || apt.type.toLowerCase().includes(filterType.toLowerCase())
    );

    const stats = [
        { label: 'Today\'s Appointments', value: '8', color: 'blue' },
        { label: 'Confirmed', value: appointments.filter(a => a.status === 'Confirmed').length, color: 'green' },
        { label: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, color: 'yellow' },
        { label: 'Telehealth', value: appointments.filter(a => a.type === 'Telehealth').length, color: 'purple' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Telehealth': return Video;
            case 'Phone': return Phone;
            case 'In-Person': return MapPin;
            default: return Calendar;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return CheckCircle;
            case 'Pending': return AlertCircle;
            case 'Cancelled': return XCircle;
            default: return Clock;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appointments</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Schedule and manage patient appointments</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Calendar size={20} />
                    New Appointment
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-2">
                    {['all', 'in-person', 'telehealth', 'phone'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-lg transition capitalize ${filterType === type
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Patient</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Type</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Date & Time</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Duration</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Doctor</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Reason</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((apt) => {
                                const TypeIcon = getTypeIcon(apt.type);
                                const StatusIcon = getStatusIcon(apt.status);
                                return (
                                    <tr key={apt.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-white">{apt.patient}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <TypeIcon size={16} />
                                                <span>{apt.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-gray-400" />
                                                <div>
                                                    <div className="text-gray-900 dark:text-white">{apt.date}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{apt.time}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{apt.duration}</td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white">{apt.doctor}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{apt.reason}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(apt.status)}`}>
                                                <StatusIcon size={14} />
                                                {apt.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AppointmentsPage;
