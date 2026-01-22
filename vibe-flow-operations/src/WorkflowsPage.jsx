import React, { useState } from 'react';
import { GitBranch, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

function WorkflowsPage() {
    const workflows = [
        { id: 1, name: 'Customer Onboarding', status: 'Active', tasks: 12, completed: 8, team: 'Sales', lastRun: '2 hours ago' },
        { id: 2, name: 'Product Launch', status: 'Active', tasks: 24, completed: 18, team: 'Marketing', lastRun: '1 day ago' },
        { id: 3, name: 'Bug Fix Process', status: 'Paused', tasks: 8, completed: 5, team: 'Engineering', lastRun: '3 days ago' },
        { id: 4, name: 'Content Review', status: 'Active', tasks: 15, completed: 15, team: 'Content', lastRun: '30 mins ago' },
        { id: 5, name: 'Quarterly Planning', status: 'Completed', tasks: 20, completed: 20, team: 'Leadership', lastRun: '1 week ago' },
    ];

    const stats = [
        { label: 'Active Workflows', value: workflows.filter(w => w.status === 'Active').length, color: 'blue' },
        { label: 'Total Tasks', value: workflows.reduce((sum, w) => sum + w.tasks, 0), color: 'purple' },
        { label: 'Completed', value: workflows.reduce((sum, w) => sum + w.completed, 0), color: 'green' },
        { label: 'Completion Rate', value: '78%', color: 'orange' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workflows</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and automate your business processes</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Create Workflow
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <GitBranch size={24} className="text-purple-600" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{workflow.team} Team</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                                {workflow.status}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{workflow.completed}/{workflow.tasks} tasks</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(workflow.completed / workflow.tasks) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock size={14} />
                                Last run: {workflow.lastRun}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkflowsPage;
