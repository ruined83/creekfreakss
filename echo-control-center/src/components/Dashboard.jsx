import React, { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Wifi, Database, Activity, Circle, Terminal } from 'lucide-react';

// Mock data
const systemsData = [
    { id: 1, name: 'Primary Server', status: 'online', cpu: 45, memory: 62, icon: Server },
    { id: 2, name: 'Database Cluster', status: 'online', cpu: 78, memory: 85, icon: Database },
    { id: 3, name: 'Network Gateway', status: 'online', cpu: 23, memory: 41, icon: Wifi },
    { id: 4, name: 'Processing Unit', status: 'warning', cpu: 92, memory: 88, icon: Cpu },
    { id: 5, name: 'Storage Array', status: 'online', cpu: 34, memory: 71, icon: HardDrive },
    { id: 6, name: 'Analytics Engine', status: 'online', cpu: 56, memory: 64, icon: Activity },
];

const controlsData = [
    { id: 1, name: 'Auto Scaling', description: 'Automatic resource allocation', enabled: true },
    { id: 2, name: 'Load Balancing', description: 'Distribute traffic evenly', enabled: true },
    { id: 3, name: 'Backup Service', description: 'Automated backup system', enabled: false },
    { id: 4, name: 'Monitoring', description: 'Real-time system monitoring', enabled: true },
    { id: 5, name: 'Failover', description: 'Automatic failover protection', enabled: true },
    { id: 6, name: 'Maintenance Mode', description: 'System maintenance window', enabled: false },
];

const initialLogs = [
    { id: 1, time: '01:29:45', level: 'INFO', message: 'System health check completed successfully', type: 'info' },
    { id: 2, time: '01:29:32', level: 'WARN', message: 'Processing Unit CPU usage above 90%', type: 'warning' },
    { id: 3, time: '01:29:18', level: 'INFO', message: 'Database backup initiated', type: 'info' },
    { id: 4, time: '01:29:05', level: 'SUCCESS', message: 'Load balancer configuration updated', type: 'success' },
    { id: 5, time: '01:28:52', level: 'INFO', message: 'New connection established from 192.168.1.45', type: 'info' },
];

function Dashboard() {
    const [controls, setControls] = useState(controlsData);
    const [logs, setLogs] = useState(initialLogs);
    const [systems, setSystems] = useState(systemsData);

    const toggleControl = (id) => {
        setControls(controls.map(c =>
            c.id === id ? { ...c, enabled: !c.enabled } : c
        ));
    };

    // Real-time system metrics updates
    useEffect(() => {
        const metricsInterval = setInterval(() => {
            setSystems(prev => prev.map(system => ({
                ...system,
                cpu: Math.min(100, Math.max(10, system.cpu + (Math.random() - 0.5) * 10)),
                memory: Math.min(100, Math.max(10, system.memory + (Math.random() - 0.5) * 8))
            })));
        }, 2000);
        return () => clearInterval(metricsInterval);
    }, []);

    // Real-time logs
    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: ['INFO', 'WARN', 'SUCCESS'][Math.floor(Math.random() * 3)],
                message: [
                    'System metrics updated',
                    'Health check passed',
                    'Resource allocation adjusted',
                    'Cache cleared successfully',
                    'Connection pool refreshed'
                ][Math.floor(Math.random() * 5)],
                type: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)]
            };
            setLogs(prev => [newLog, ...prev].slice(0, 10));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'offline': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getLogColor = (type) => {
        switch (type) {
            case 'success': return 'border-green-500 text-green-400';
            case 'warning': return 'border-yellow-500 text-yellow-400';
            case 'error': return 'border-red-500 text-red-400';
            default: return 'border-blue-500 text-blue-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-control-accent glow-text uppercase tracking-wider">System Overview</h1>
                <p className="text-gray-600 text-sm mt-1">Real-time monitoring and control</p>
            </div>

            {/* System Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systems.map((system) => {
                    const Icon = system.icon;
                    return (
                        <div key={system.id} className="control-card transition-all duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-control-accent/10 rounded border border-control-accent/30">
                                        <Icon className="text-control-accent" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{system.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Circle className={`status-indicator ${getStatusColor(system.status)}`} size={6} />
                                            <span className="text-xs text-gray-600 uppercase">{system.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">CPU</span>
                                        <span className="text-gray-400">{Math.round(system.cpu)}%</span>
                                    </div>
                                    <div className="w-full bg-control-border rounded-full h-1.5">
                                        <div className={`h-1.5 rounded-full transition-all duration-500 ${system.cpu > 80 ? 'bg-yellow-500' : 'bg-control-accent'}`} style={{ width: `${system.cpu}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">Memory</span>
                                        <span className="text-gray-400">{Math.round(system.memory)}%</span>
                                    </div>
                                    <div className="w-full bg-control-border rounded-full h-1.5">
                                        <div className={`h-1.5 rounded-full transition-all duration-500 ${system.memory > 80 ? 'bg-yellow-500' : 'bg-control-accent'}`} style={{ width: `${system.memory}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="control-card">
                <h2 className="text-lg font-bold mb-4 text-control-accent uppercase tracking-wider">System Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {controls.map((control) => (
                        <div key={control.id} className="p-4 bg-control-bg border border-control-border rounded hover:border-gray-700 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">{control.name}</h3>
                                <button
                                    onClick={() => toggleControl(control.id)}
                                    className={`toggle-switch ${control.enabled ? 'toggle-switch-active' : 'toggle-switch-inactive'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${control.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-600">{control.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Real-time Logs */}
            <div className="control-card">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-control-accent uppercase tracking-wider flex items-center gap-2">
                        <Terminal size={20} />
                        System Logs
                    </h2>
                    <span className="text-xs text-gray-600 uppercase">Live Feed</span>
                </div>
                <div className="bg-control-bg rounded border border-control-border max-h-96 overflow-y-auto">
                    {logs.map((log) => (
                        <div key={log.id} className={`log-entry ${getLogColor(log.type)}`}>
                            <div className="flex items-start gap-4">
                                <span className="text-gray-600 text-xs font-mono">{log.time}</span>
                                <span className={`text-xs font-bold ${getLogColor(log.type)}`}>{log.level}</span>
                                <span className="flex-1 text-xs text-gray-400">{log.message}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
