import React from 'react';
import { TrendingUp, Users, CheckCircle, Clock, BarChart } from 'lucide-react';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function AnalyticsPage() {
    const teamPerformance = [
        { team: 'Engineering', completed: 45, inProgress: 12, pending: 8 },
        { team: 'Marketing', completed: 38, inProgress: 8, pending: 5 },
        { team: 'Sales', completed: 52, inProgress: 15, pending: 10 },
        { team: 'Product', completed: 28, inProgress: 6, pending: 3 },
        { team: 'Support', completed: 41, inProgress: 10, pending: 7 },
    ];

    const weeklyTrend = [
        { week: 'Week 1', completed: 45, started: 52 },
        { week: 'Week 2', completed: 52, started: 48 },
        { week: 'Week 3', completed: 48, started: 55 },
        { week: 'Week 4', completed: 61, started: 50 },
    ];

    const stats = [
        { label: 'Total Tasks', value: '312', change: '+12%', icon: BarChart, color: 'blue' },
        { label: 'Completed', value: '204', change: '+18%', icon: CheckCircle, color: 'green' },
        { label: 'In Progress', value: '51', change: '+5%', icon: Clock, color: 'yellow' },
        { label: 'Avg Completion Time', value: '3.2 days', change: '-8%', icon: TrendingUp, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track workflow performance and team productivity</p>
            </div>

            {/* Stats */}
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Performance */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBar data={teamPerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="team" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="completed" fill="#10b981" name="Completed" />
                            <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
                            <Bar dataKey="pending" fill="#6b7280" name="Pending" />
                        </RechartsBar>
                    </ResponsiveContainer>
                </div>

                {/* Weekly Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weekly Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="week" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={2} name="Completed" />
                            <Line type="monotone" dataKey="started" stroke="#3b82f6" strokeWidth={2} name="Started" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Team Rankings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Rankings</h3>
                <div className="space-y-3">
                    {teamPerformance
                        .sort((a, b) => b.completed - a.completed)
                        .map((team, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' :
                                            i === 1 ? 'bg-gray-100 text-gray-700' :
                                                i === 2 ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-50 text-gray-600'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{team.team}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {team.completed} completed • {team.inProgress} in progress
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{team.completed}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">tasks done</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
