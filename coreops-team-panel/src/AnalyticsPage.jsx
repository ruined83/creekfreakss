import React from 'react';
import { TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AnalyticsPage() {
    const teamData = [
        { name: 'Sarah', completed: 10, inProgress: 2 },
        { name: 'Mike', completed: 6, inProgress: 3 },
        { name: 'Emily', completed: 12, inProgress: 1 },
        { name: 'Alex', completed: 9, inProgress: 2 },
    ];

    const stats = [
        { label: 'Team Members', value: '4', icon: Users, color: 'blue' },
        { label: 'Tasks Completed', value: '37', icon: CheckCircle, color: 'green' },
        { label: 'In Progress', value: '8', icon: Clock, color: 'yellow' },
        { label: 'Completion Rate', value: '82%', icon: TrendingUp, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track team performance and productivity</p>
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
                        </div>
                    );
                })}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="completed" fill="#10b981" name="Completed" />
                        <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AnalyticsPage;
