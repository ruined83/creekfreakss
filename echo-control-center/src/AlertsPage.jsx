import React, { useState } from 'react';
import { Bell, AlertTriangle, Mail, Slack, Plus } from 'lucide-react';

function AlertsPage() {
    const alerts = [
        { id: 1, name: 'High CPU Usage', condition: 'CPU > 90%', channels: ['Email', 'Slack'], enabled: true, triggered: 3 },
        { id: 2, name: 'Memory Warning', condition: 'Memory > 85%', channels: ['Email'], enabled: true, triggered: 1 },
        { id: 3, name: 'Disk Space Low', condition: 'Disk < 10%', channels: ['Email', 'Slack'], enabled: true, triggered: 0 },
        { id: 4, name: 'API Response Time', condition: 'Response > 2s', channels: ['Slack'], enabled: false, triggered: 5 },
        { id: 5, name: 'Database Connection', condition: 'Connection Failed', channels: ['Email', 'Slack'], enabled: true, triggered: 2 },
    ];

    const stats = [
        { label: 'Active Alerts', value: alerts.filter(a => a.enabled).length, color: 'blue' },
        { label: 'Total Triggered', value: alerts.reduce((sum, a) => sum + a.triggered, 0), color: 'orange' },
        { label: 'Email Channels', value: alerts.filter(a => a.channels.includes('Email')).length, color: 'purple' },
        { label: 'Slack Channels', value: alerts.filter(a => a.channels.includes('Slack')).length, color: 'green' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alert Configuration</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Configure system alerts and notifications</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Plus size={20} />
                    New Alert
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

            {/* Alerts List */}
            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Bell size={24} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{alert.name}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${alert.enabled
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                                            }`}>
                                            {alert.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3 font-mono text-sm">{alert.condition}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Channels:</span>
                                            <div className="flex gap-2">
                                                {alert.channels.map((channel, i) => (
                                                    <span key={i} className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                                        {channel === 'Email' ? <Mail size={12} /> : <Slack size={12} />}
                                                        {channel}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle size={14} className="text-orange-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Triggered: <span className="font-semibold text-gray-900 dark:text-white">{alert.triggered}</span> times
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={alert.enabled} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlertsPage;
