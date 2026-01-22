import React, { useState } from 'react';
import { Activity, Users, AlertTriangle, TrendingUp, ArrowUp, ArrowDown, Play, Pause, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const statsData = [
    { title: 'Active Workflows', value: '24', change: '+18%', trend: 'up', icon: Activity, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Team Efficiency', value: '94.2%', change: '+5.3%', trend: 'up', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Bottlenecks Detected', value: '3', change: '-40%', trend: 'down', icon: AlertTriangle, gradient: 'from-orange-500 to-red-500' },
    { title: 'Completion Rate', value: '87%', change: '+12%', trend: 'up', icon: TrendingUp, gradient: 'from-teal-500 to-emerald-500' },
];

const performanceData = [
    { name: 'Mon', efficiency: 85, workflows: 12 },
    { name: 'Tue', efficiency: 88, workflows: 15 },
    { name: 'Wed', efficiency: 92, workflows: 18 },
    { name: 'Thu', efficiency: 90, workflows: 20 },
    { name: 'Fri', efficiency: 94, workflows: 24 },
    { name: 'Sat', efficiency: 89, workflows: 19 },
    { name: 'Sun', efficiency: 87, workflows: 16 },
];

const workflowNodes = [
    { id: 1, name: 'Start', status: 'completed', x: 50, y: 100 },
    { id: 2, name: 'Design Review', status: 'completed', x: 200, y: 50 },
    { id: 3, name: 'Development', status: 'active', x: 200, y: 150 },
    { id: 4, name: 'Testing', status: 'pending', x: 350, y: 100 },
    { id: 5, name: 'Deploy', status: 'pending', x: 500, y: 100 },
];

const kanbanData = [
    {
        status: 'To Do',
        color: 'purple',
        tasks: [
            { id: 1, title: 'Design new landing page', priority: 'high', assignee: 'Alice' },
            { id: 2, title: 'Update documentation', priority: 'medium', assignee: 'Bob' },
        ]
    },
    {
        status: 'In Progress',
        color: 'blue',
        tasks: [
            { id: 3, title: 'Implement authentication', priority: 'high', assignee: 'Charlie' },
            { id: 4, title: 'Fix mobile responsiveness', priority: 'medium', assignee: 'Diana' },
        ]
    },
    {
        status: 'Review',
        color: 'orange',
        tasks: [
            { id: 5, title: 'Code review PR #234', priority: 'high', assignee: 'Eve' },
        ]
    },
    {
        status: 'Done',
        color: 'teal',
        tasks: [
            { id: 6, title: 'Setup CI/CD pipeline', priority: 'high', assignee: 'Frank' },
            { id: 7, title: 'Database optimization', priority: 'medium', assignee: 'Grace' },
        ]
    },
];

function Dashboard() {
    const [selectedNode, setSelectedNode] = useState(null);

    const statusColors = {
        completed: 'border-teal-500 bg-teal-50 dark:bg-teal-900/20',
        active: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 animate-pulse',
        pending: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800',
    };

    const statusIcons = {
        completed: CheckCircle,
        active: Play,
        pending: Clock,
    };

    const priorityColors = {
        high: 'border-red-500',
        medium: 'border-orange-500',
        low: 'border-blue-500',
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;

                    return (
                        <div key={index} className="stat-card animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-teal-600' : 'text-orange-600'}`}>
                                    <TrendIcon size={16} />
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Workflow Visualization */}
            <div className="stat-card">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Workflow Flow Diagram
                </h3>
                <div className="relative h-64 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-8">
                    <svg className="w-full h-full">
                        {/* Connections */}
                        <line x1="100" y1="100" x2="200" y2="50" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="100" y1="100" x2="200" y2="150" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="50" x2="350" y2="100" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="150" x2="350" y2="100" stroke="url(#gradient4)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="400" y1="100" x2="500" y2="100" stroke="url(#gradient5)" strokeWidth="2" strokeDasharray="5,5" />

                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Nodes */}
                    {workflowNodes.map((node) => {
                        const StatusIcon = statusIcons[node.status];
                        return (
                            <div
                                key={node.id}
                                className={`absolute workflow-node ${statusColors[node.status]} cursor-pointer`}
                                style={{ left: `${node.x}px`, top: `${node.y}px`, transform: 'translate(-50%, -50%)' }}
                                onClick={() => setSelectedNode(node)}
                            >
                                <div className="flex items-center gap-2">
                                    <StatusIcon size={16} className={node.status === 'completed' ? 'text-teal-600' : node.status === 'active' ? 'text-purple-600' : 'text-gray-400'} />
                                    <span className="text-sm font-medium whitespace-nowrap">{node.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {selectedNode && (
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm">
                            <span className="font-bold">Selected:</span> {selectedNode.name} -
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${selectedNode.status === 'completed' ? 'bg-teal-100 text-teal-700' : selectedNode.status === 'active' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                {selectedNode.status}
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="stat-card">
                    <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Team Efficiency Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Legend />
                            <Line type="monotone" dataKey="efficiency" stroke="url(#colorEfficiency)" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Area Chart */}
                <div className="stat-card">
                    <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Active Workflows
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorWorkflows" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Legend />
                            <Area type="monotone" dataKey="workflows" stroke="#a855f7" fillOpacity={1} fill="url(#colorWorkflows)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="stat-card">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    Task Flow Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kanbanData.map((column) => (
                        <div key={column.status} className="space-y-3">
                            <div className={`flex items-center justify-between p-3 bg-gradient-to-r from-${column.color}-500 to-${column.color}-600 rounded-lg text-white`}>
                                <h4 className="font-bold">{column.status}</h4>
                                <span className="text-sm bg-white/20 px-2 py-1 rounded">{column.tasks.length}</span>
                            </div>
                            <div className="space-y-2">
                                {column.tasks.map((task) => (
                                    <div key={task.id} className={`kanban-card ${priorityColors[task.priority]}`}>
                                        <h5 className="font-medium text-sm mb-2">{task.title}</h5>
                                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                            <span className={`px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {task.priority}
                                            </span>
                                            <span>{task.assignee}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
