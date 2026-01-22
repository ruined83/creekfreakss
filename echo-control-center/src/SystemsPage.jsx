import React, { useState } from 'react';
import { Server, Activity, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

function SystemsPage() {
    const systems = [
        { id: 1, name: 'Web Server 01', status: 'Healthy', cpu: 45, memory: 62, uptime: '45 days', location: 'US-East' },
        { id: 2, name: 'Database Primary', status: 'Healthy', cpu: 78, memory: 85, uptime: '89 days', location: 'US-West' },
        { id: 3, name: 'API Gateway', status: 'Warning', cpu: 92, memory: 76, uptime: '12 days', location: 'EU-Central' },
        { id: 4, name: 'Cache Server', status: 'Healthy', cpu: 34, memory: 45, uptime: '156 days', location: 'US-East' },
        { id: 5, name: 'Worker Node 01', status: 'Critical', cpu: 98, memory: 94, uptime: '2 days', location: 'Asia-Pacific' },
        { id: 6, name: 'Load Balancer', status: 'Healthy', cpu: 23, memory: 38, uptime: '234 days', location: 'US-West' },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Healthy': return <CheckCircle className="text-green-500" size={20} />;
            case 'Warning': return <AlertTriangle className="text-yellow-500" size={20} />;
            case 'Critical': return <XCircle className="text-red-500" size={20} />;
            default: return <Activity className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Healthy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getMetricColor = (value) => {
        if (value >= 90) return 'text-red-600 dark:text-red-400';
        if (value >= 75) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-green-600 dark:text-green-400';
    };

    const stats = [
        { label: 'Total Systems', value: systems.length, color: 'blue' },
        { label: 'Healthy', value: systems.filter(s => s.status === 'Healthy').length, color: 'green' },
        { label: 'Warnings', value: systems.filter(s => s.status === 'Warning').length, color: 'yellow' },
        { label: 'Critical', value: systems.filter(s => s.status === 'Critical').length, color: 'red' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Systems Overview</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor all system health and performance</p>
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

            {/* Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systems.map((system) => (
                    <div key={system.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Server size={24} className="text-blue-600" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{system.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{system.location}</p>
                                </div>
                            </div>
                            {getStatusIcon(system.status)}
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">CPU</span>
                                    <span className={`font-semibold ${getMetricColor(system.cpu)}`}>{system.cpu}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${system.cpu >= 90 ? 'bg-red-500' : system.cpu >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${system.cpu}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Memory</span>
                                    <span className={`font-semibold ${getMetricColor(system.memory)}`}>{system.memory}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${system.memory >= 90 ? 'bg-red-500' : system.memory >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${system.memory}%` }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{system.uptime}</span>
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                                {system.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SystemsPage;
