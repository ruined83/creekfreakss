import React from 'react';
import { Users, Mail, Shield, Activity, TrendingUp } from 'lucide-react';

function TeamsPage() {
    const teams = [
        { id: 1, name: 'Engineering', members: 12, lead: 'Sarah Chen', activeWorkflows: 5, completionRate: 87 },
        { id: 2, name: 'Marketing', members: 8, lead: 'Mike Johnson', activeWorkflows: 3, completionRate: 92 },
        { id: 3, name: 'Sales', members: 15, lead: 'Emily Davis', activeWorkflows: 7, completionRate: 78 },
        { id: 4, name: 'Product', members: 6, lead: 'Alex Kim', activeWorkflows: 4, completionRate: 95 },
        { id: 5, name: 'Support', members: 10, lead: 'Jordan Lee', activeWorkflows: 6, completionRate: 83 },
    ];

    const stats = [
        { label: 'Total Teams', value: teams.length, color: 'blue' },
        { label: 'Total Members', value: teams.reduce((sum, t) => sum + t.members, 0), color: 'purple' },
        { label: 'Active Workflows', value: teams.reduce((sum, t) => sum + t.activeWorkflows, 0), color: 'green' },
        { label: 'Avg Completion', value: Math.round(teams.reduce((sum, t) => sum + t.completionRate, 0) / teams.length) + '%', color: 'orange' },
    ];

    const getCompletionColor = (rate) => {
        if (rate >= 90) return 'text-green-600 dark:text-green-400';
        if (rate >= 80) return 'text-blue-600 dark:text-blue-400';
        return 'text-yellow-600 dark:text-yellow-400';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage teams and collaboration</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Add Team
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

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Users size={24} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{team.members} members</p>
                                </div>
                            </div>
                            <span className={`text-2xl font-bold ${getCompletionColor(team.completionRate)}`}>
                                {team.completionRate}%
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Team Lead</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{team.lead}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Workflows</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{team.activeWorkflows}</span>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                                    <span className={`font-semibold ${getCompletionColor(team.completionRate)}`}>{team.completionRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${team.completionRate >= 90 ? 'bg-green-500' :
                                                team.completionRate >= 80 ? 'bg-blue-500' :
                                                    'bg-yellow-500'
                                            }`}
                                        style={{ width: `${team.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamsPage;
