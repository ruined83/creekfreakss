import React, { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Info, XCircle, Search } from 'lucide-react';

function LogsPage() {
    const [filterLevel, setFilterLevel] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const logs = [
        { id: 1, timestamp: '2025-12-26 16:42:15', level: 'error', system: 'API Gateway', message: 'Connection timeout to database server', details: 'Failed to connect to db-primary.internal:5432' },
        { id: 2, timestamp: '2025-12-26 16:41:03', level: 'warning', system: 'Web Server 01', message: 'High memory usage detected', details: 'Memory usage at 92%, threshold is 85%' },
        { id: 3, timestamp: '2025-12-26 16:40:22', level: 'info', system: 'Load Balancer', message: 'Health check passed', details: 'All backend servers responding normally' },
        { id: 4, timestamp: '2025-12-26 16:39:45', level: 'error', system: 'Worker Node 01', message: 'Task execution failed', details: 'Task ID: task-12345 failed with exit code 1' },
        { id: 5, timestamp: '2025-12-26 16:38:12', level: 'info', system: 'Cache Server', message: 'Cache cleared successfully', details: 'Cleared 1,234 keys from Redis cache' },
        { id: 6, timestamp: '2025-12-26 16:37:30', level: 'warning', system: 'Database Primary', message: 'Slow query detected', details: 'Query took 5.2s, threshold is 1s' },
        { id: 7, timestamp: '2025-12-26 16:36:18', level: 'success', system: 'API Gateway', message: 'Deployment completed', details: 'Version v2.3.1 deployed successfully' },
        { id: 8, timestamp: '2025-12-26 16:35:05', level: 'info', system: 'Web Server 01', message: 'SSL certificate renewed', details: 'Certificate valid until 2026-12-26' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
        const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.system.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesLevel && matchesSearch;
    });

    const getLevelIcon = (level) => {
        switch (level) {
            case 'error': return <XCircle size={18} className="text-red-500" />;
            case 'warning': return <AlertCircle size={18} className="text-yellow-500" />;
            case 'success': return <CheckCircle size={18} className="text-green-500" />;
            case 'info': return <Info size={18} className="text-blue-500" />;
            default: return <FileText size={18} className="text-gray-500" />;
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'success': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'info': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const stats = [
        { label: 'Total Logs', value: logs.length, color: 'blue' },
        { label: 'Errors', value: logs.filter(l => l.level === 'error').length, color: 'red' },
        { label: 'Warnings', value: logs.filter(l => l.level === 'warning').length, color: 'yellow' },
        { label: 'Info', value: logs.filter(l => l.level === 'info').length, color: 'gray' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Logs</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time system event monitoring</p>
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
                            placeholder="Search logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'error', 'warning', 'info', 'success'].map(level => (
                            <button
                                key={level}
                                onClick={() => setFilterLevel(level)}
                                className={`px-4 py-2 rounded-lg transition capitalize ${filterLevel === level
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logs List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredLogs.map((log) => (
                        <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">{getLevelIcon(log.level)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                                            {log.level.toUpperCase()}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{log.system}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-white font-medium mb-1">{log.message}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{log.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LogsPage;
