import React, { useState } from 'react';
import { Search, Plus, User, Calendar, Activity, FileText, Shield, AlertCircle } from 'lucide-react';

function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const patients = [
        { id: 'PT-001', name: 'Sarah Johnson', age: 34, gender: 'Female', bloodType: 'A+', lastVisit: '2 days ago', nextAppointment: 'Dec 28, 2025', status: 'Active', condition: 'Routine Checkup', riskLevel: 'Low' },
        { id: 'PT-002', name: 'Michael Chen', age: 56, gender: 'Male', bloodType: 'O-', lastVisit: '1 week ago', nextAppointment: 'Jan 5, 2026', status: 'Active', condition: 'Hypertension', riskLevel: 'Medium' },
        { id: 'PT-003', name: 'Emily Rodriguez', age: 28, gender: 'Female', bloodType: 'B+', lastVisit: '3 days ago', nextAppointment: 'Dec 30, 2025', status: 'Active', condition: 'Prenatal Care', riskLevel: 'Low' },
        { id: 'PT-004', name: 'David Kim', age: 45, gender: 'Male', bloodType: 'AB+', lastVisit: '2 weeks ago', nextAppointment: 'Jan 10, 2026', status: 'Active', condition: 'Diabetes Type 2', riskLevel: 'High' },
        { id: 'PT-005', name: 'Lisa Wang', age: 62, gender: 'Female', bloodType: 'A-', lastVisit: '4 days ago', nextAppointment: 'Jan 3, 2026', status: 'Active', condition: 'Arthritis', riskLevel: 'Medium' },
        { id: 'PT-006', name: 'James Brown', age: 71, gender: 'Male', bloodType: 'O+', lastVisit: '1 day ago', nextAppointment: 'Dec 27, 2025', status: 'Critical', condition: 'Heart Disease', riskLevel: 'High' },
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = [
        { label: 'Total Patients', value: patients.length, icon: User, color: 'blue' },
        { label: 'Active Cases', value: patients.filter(p => p.status === 'Active').length, icon: Activity, color: 'green' },
        { label: 'Critical', value: patients.filter(p => p.status === 'Critical').length, icon: AlertCircle, color: 'red' },
        { label: 'High Risk', value: patients.filter(p => p.riskLevel === 'High').length, icon: Shield, color: 'orange' },
    ];

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patients</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage patient records and health information</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <Shield size={18} className="text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">HIPAA Compliant</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Plus size={20} />
                        Add Patient
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                                    <Icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by patient name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'active', 'critical'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg transition capitalize ${filterStatus === status
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Patient ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Age/Gender</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Blood Type</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Condition</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Risk Level</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Next Appointment</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{patient.id}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900 dark:text-white">{patient.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{patient.age}y / {patient.gender}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{patient.bloodType}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{patient.condition}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                                            {patient.riskLevel}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Calendar size={14} />
                                            <span className="text-sm">{patient.nextAppointment}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(patient.status)}`}>
                                            {patient.status}
                                        </span>
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

export default PatientsPage;
