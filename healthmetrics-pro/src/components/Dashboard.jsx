import React, { useState } from 'react';
import { Users, DollarSign, Activity, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AIAssistant from './AIAssistant';
import AIInsights from './AIInsights';

// Mock data
const statsData = [
    { title: 'Total Users', value: '12,543', change: '+12.5%', trend: 'up', icon: Users, color: 'blue' },
    { title: 'Revenue', value: '$45,231', change: '+8.2%', trend: 'up', icon: DollarSign, color: 'green' },
    { title: 'Active Sessions', value: '2,842', change: '-3.1%', trend: 'down', icon: Activity, color: 'purple' },
    { title: 'Conversion Rate', value: '3.24%', change: '+0.5%', trend: 'up', icon: TrendingUp, color: 'orange' },
];

const chartData = [
    { name: 'Jan', users: 4000, revenue: 2400 },
    { name: 'Feb', users: 3000, revenue: 1398 },
    { name: 'Mar', users: 2000, revenue: 9800 },
    { name: 'Apr', users: 2780, revenue: 3908 },
    { name: 'May', users: 1890, revenue: 4800 },
    { name: 'Jun', users: 2390, revenue: 3800 },
    { name: 'Jul', users: 3490, revenue: 4300 },
];

const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User', lastLogin: '5 hours ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User', lastLogin: '2 days ago' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active', role: 'Manager', lastLogin: '1 hour ago' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', role: 'User', lastLogin: '3 hours ago' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', status: 'Active', role: 'Admin', lastLogin: '30 min ago' },
    { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', status: 'Inactive', role: 'User', lastLogin: '1 week ago' },
    { id: 8, name: 'Fiona Green', email: 'fiona@example.com', status: 'Active', role: 'Manager', lastLogin: '4 hours ago' },
];

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredData = tableData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const colorMap = {
        blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Brian! Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;

                    return (
                        <div key={index} className="stat-card">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${colorMap[stat.color]}`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendIcon size={16} />
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="stat-card">
                    <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="stat-card">
                    <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Data Table */}
            <div className="stat-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Users</h3>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded text-sm">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-sm ${user.status === 'Active'
                                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Insights Panel */}
            <AIInsights />

            {/* AI Assistant Chat */}
            <AIAssistant data={{ statsData, chartData, tableData }} />
        </div>
    );
}

export default Dashboard;
