import React, { useState } from 'react';
import { Search, Plus, User, Mail, Shield, Activity, TrendingUp, Sparkles } from 'lucide-react';

function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const users = [
        { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago', sessions: 245, aiScore: 92 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Manager', status: 'Active', lastActive: '5 mins ago', sessions: 189, aiScore: 88 },
        { id: 3, name: 'Mike Chen', email: 'mike@company.com', role: 'User', status: 'Active', lastActive: '1 hour ago', sessions: 156, aiScore: 85 },
        { id: 4, name: 'Emily Davis', email: 'emily@company.com', role: 'Manager', status: 'Active', lastActive: '30 mins ago', sessions: 203, aiScore: 90 },
        { id: 5, name: 'David Wilson', email: 'david@company.com', role: 'User', status: 'Inactive', lastActive: '3 days ago', sessions: 78, aiScore: 72 },
        { id: 6, name: 'Lisa Anderson', email: 'lisa@company.com', role: 'User', status: 'Active', lastActive: '15 mins ago', sessions: 134, aiScore: 81 },
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
        return matchesSearch && matchesRole;
    });

    const stats = [
        { label: 'Total Users', value: users.length, color: 'blue' },
        { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, color: 'green' },
        { label: 'Admins', value: users.filter(u => u.role === 'Admin').length, color: 'purple' },
        { label: 'Avg AI Score', value: Math.round(users.reduce((sum, u) => sum + u.aiScore, 0) / users.length), color: 'orange' },
    ];

    const getStatusColor = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'User': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getAIScoreColor = (score) => {
        if (score >= 85) return 'text-green-600 dark:text-green-400';
        if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage user accounts and permissions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <Plus size={20} />
                    Add User
                </button>
            </div>

            {/* AI Insights Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={20} />
                    <h3 className="text-lg font-bold">AI User Insights</h3>
                </div>
                <ul className="space-y-1 text-sm">
                    <li>• Sarah Johnson is your most engaged user (AI Score: 88)</li>
                    <li>• 5 users have been inactive for 3+ days - consider re-engagement</li>
                    <li>• Average session count increased 12% this month</li>
                </ul>
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
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'admin', 'manager', 'user'].map(role => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-4 py-2 rounded-lg transition capitalize ${roleFilter === role
                                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">User</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Role</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Last Active</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Sessions</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">AI Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                <User size={20} className="text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.lastActive}</td>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">{user.sessions}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-semibold ${getAIScoreColor(user.aiScore)}`}>{user.aiScore}</span>
                                            <Sparkles size={14} className="text-purple-500" />
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

export default UsersPage;
