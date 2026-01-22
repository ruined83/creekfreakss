import React, { useState } from 'react';
import { Users, CheckCircle, Clock, AlertCircle, Calendar, MessageSquare, Plus } from 'lucide-react';

// Mock Data
const teamMetrics = [
    { title: 'Active Members', value: '12', icon: Users, color: 'indigo' },
    { title: 'Tasks Completed', value: '47', icon: CheckCircle, color: 'green' },
    { title: 'In Progress', value: '18', icon: Clock, color: 'yellow' },
    { title: 'Overdue', value: '3', icon: AlertCircle, color: 'red' },
];

const teamMembers = [
    { id: 1, name: 'Brian Rice', role: 'Team Lead', avatar: 'BR', tasks: 8, completed: 12, status: 'online' },
    { id: 2, name: 'Alice Johnson', role: 'Developer', avatar: 'AJ', tasks: 5, completed: 18, status: 'online' },
    { id: 3, name: 'Bob Smith', role: 'Designer', avatar: 'BS', tasks: 6, completed: 15, status: 'away' },
    { id: 4, name: 'Carol White', role: 'Developer', avatar: 'CW', tasks: 7, completed: 20, status: 'online' },
];

const kanbanData = [
    {
        status: 'To Do',
        color: 'gray',
        tasks: [
            { id: 1, title: 'Design new landing page', priority: 'high', assignee: 'Bob Smith', dueDate: '2025-01-05', comments: 3 },
            { id: 2, title: 'Update API documentation', priority: 'medium', assignee: 'Alice Johnson', dueDate: '2025-01-08', comments: 1 },
        ]
    },
    {
        status: 'In Progress',
        color: 'blue',
        tasks: [
            { id: 3, title: 'Implement user authentication', priority: 'high', assignee: 'Alice Johnson', dueDate: '2025-01-03', comments: 5 },
            { id: 4, title: 'Fix mobile responsiveness', priority: 'medium', assignee: 'Carol White', dueDate: '2025-01-06', comments: 2 },
        ]
    },
    {
        status: 'Review',
        color: 'yellow',
        tasks: [
            { id: 5, title: 'Code review PR #234', priority: 'high', assignee: 'Brian Rice', dueDate: '2025-01-02', comments: 8 },
        ]
    },
    {
        status: 'Done',
        color: 'green',
        tasks: [
            { id: 6, title: 'Setup CI/CD pipeline', priority: 'high', assignee: 'Alice Johnson', dueDate: '2024-12-28', comments: 4 },
            { id: 7, title: 'Database optimization', priority: 'medium', assignee: 'Carol White', dueDate: '2024-12-30', comments: 2 },
        ]
    },
];

function Dashboard() {
    const [selectedTask, setSelectedTask] = useState(null);

    const priorityColors = {
        high: 'bg-red-100 text-red-700 border-red-300',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        low: 'bg-blue-100 text-blue-700 border-blue-300',
    };

    const statusColors = {
        online: 'bg-green-500',
        away: 'bg-yellow-500',
        offline: 'bg-gray-400',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage tasks and collaborate with your team</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">{metric.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                                    <Icon className={`text-${metric.color}-600`} size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                        <Plus size={18} />
                        Add Member
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="team-card">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                        {member.avatar}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[member.status]}`}></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Active Tasks</span>
                                    <span className="font-semibold text-gray-900">{member.tasks}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(member.completed / (member.completed + member.tasks)) * 100}%` }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{member.completed} completed</span>
                                    <span>{Math.round((member.completed / (member.completed + member.tasks)) * 100)}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kanban Board */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Task Board</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kanbanData.map((column) => (
                        <div key={column.status} className="kanban-column">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">{column.status}</h3>
                                <span className="px-2 py-1 bg-white rounded text-sm font-medium text-gray-600">{column.tasks.length}</span>
                            </div>
                            <div className="space-y-3">
                                {column.tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => setSelectedTask(task)}
                                        className="task-card"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <Calendar size={14} />
                                            <span>{task.dueDate}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold">
                                                    {task.assignee.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-xs text-gray-600">{task.assignee.split(' ')[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <MessageSquare size={14} />
                                                <span className="text-xs">{task.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                                    <Plus size={16} />
                                    <span className="text-sm">Add Task</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Task Modal (Simple) */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedTask(null)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">{selectedTask.title}</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-gray-600">Assignee:</span>
                                <p className="font-medium">{selectedTask.assignee}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Due Date:</span>
                                <p className="font-medium">{selectedTask.dueDate}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Priority:</span>
                                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${priorityColors[selectedTask.priority]}`}>
                                    {selectedTask.priority}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Comments:</span>
                                <p className="font-medium">{selectedTask.comments} comments</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedTask(null)}
                            className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
