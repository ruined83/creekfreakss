import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function ReportsPage() {
    const [dateRange, setDateRange] = useState('month');

    const revenueData = [
        { month: 'Jul', revenue: 3200, bookings: 24 },
        { month: 'Aug', revenue: 4100, bookings: 28 },
        { month: 'Sep', revenue: 3800, bookings: 26 },
        { month: 'Oct', revenue: 5200, bookings: 35 },
        { month: 'Nov', revenue: 4800, bookings: 32 },
        { month: 'Dec', revenue: 6100, bookings: 41 },
    ];

    const serviceData = [
        { name: 'Consultation', value: 45, revenue: '$6,750' },
        { name: 'Follow-up', value: 30, revenue: '$2,250' },
        { name: 'Initial Meeting', value: 15, revenue: '$2,250' },
        { name: 'Review', value: 10, revenue: '$1,000' },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    const stats = [
        { label: 'Total Revenue', value: '$27,400', change: '+18%', icon: DollarSign, color: 'blue' },
        { label: 'Total Bookings', value: '186', change: '+12%', icon: Calendar, color: 'green' },
        { label: 'Active Clients', value: '89', change: '+8%', icon: Users, color: 'purple' },
        { label: 'Avg. Booking Value', value: '$147', change: '+5%', icon: TrendingUp, color: 'orange' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-600 mt-1">Track your business performance</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="quarter">Last 3 Months</option>
                        <option value="year">Last Year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <p className="text-sm text-green-600 mt-1">{stat.change} vs last period</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bookings Trend */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Legend />
                            <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Service Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Service Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={serviceData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {serviceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Services */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Services</h3>
                    <div className="space-y-4">
                        {serviceData.map((service, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: COLORS[i] }}
                                    ></div>
                                    <div>
                                        <p className="font-medium text-gray-900">{service.name}</p>
                                        <p className="text-sm text-gray-600">{service.value} bookings</p>
                                    </div>
                                </div>
                                <p className="font-semibold text-gray-900">{service.revenue}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Client Retention */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Client Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-900">73%</p>
                        <p className="text-sm text-blue-600 mt-1">Retention Rate</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-3xl font-bold text-green-900">2.4</p>
                        <p className="text-sm text-green-600 mt-1">Avg. Bookings per Client</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-3xl font-bold text-purple-900">12</p>
                        <p className="text-sm text-purple-600 mt-1">New Clients This Month</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
