import React from 'react';
import { TrendingUp, Users, Activity, BarChart } from 'lucide-react';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function AnalyticsPage() {
    const monthlyData = [
        { month: 'Jan', users: 1200, sessions: 3400, revenue: 12500 },
        { month: 'Feb', users: 1450, sessions: 3800, revenue: 14200 },
        { month: 'Mar', users: 1680, sessions: 4200, revenue: 16800 },
        { month: 'Apr', users: 1920, sessions: 4800, revenue: 19200 },
        { month: 'May', users: 2150, sessions: 5200, revenue: 21500 },
        { month: 'Jun', users: 2400, sessions: 5800, revenue: 24000 },
    ];

    const stats = [
        { label: 'Total Users', value: '2,400', change: '+12%', icon: Users, color: 'blue' },
        { label: 'Active Sessions', value: '5,800', change: '+18%', icon: Activity, color: 'green' },
        { label: 'Revenue', value: '$24,000', change: '+15%', icon: TrendingUp, color: 'purple' },
        { label: 'Avg Session', value: '4.2 min', change: '+8%', icon: BarChart, color: 'orange' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track performance and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <Icon size={20} className={`text-${stat.color}-600`} />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} vs last month</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBar data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
                        </RechartsBar>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
