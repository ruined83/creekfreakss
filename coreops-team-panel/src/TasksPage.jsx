import React from 'react';
import { CheckCircle, Clock, AlertCircle, User } from 'lucide-react';

function TasksPage() {
    const tasks = [
        { id: 1, title: 'Update user documentation', assignee: 'Sarah Chen', status: 'completed', priority: 'high', dueDate: 'Dec 20' },
        { id: 2, title: 'Fix login bug', assignee: 'Mike Johnson', status: 'in-progress', priority: 'critical', dueDate: 'Dec 27' },
        { id: 3, title: 'Design new dashboard', assignee: 'Emily Davis', status: 'in-progress', priority: 'medium', dueDate: 'Dec 30' },
        { id: 4, title: 'Code review PR #123', assignee: 'Alex Kim', status: 'pending', priority: 'low', dueDate: 'Jan 2' },
        { id: 5, title: 'Deploy to production', assignee: 'Jordan Lee', status: 'pending', priority: 'high', dueDate: 'Jan 5' },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={18} className="text-green-500" />;
            case 'in-progress': return <Clock size={18} className="text-blue-500" />;
            case 'pending': return <AlertCircle size={18} className="text-gray-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'low': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const stats = [
        { label: 'Total Tasks', value: tasks.length },
        { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
        { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
        { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage team tasks and assignments</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add Task
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

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                {getStatusIcon(task.status)}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <User size={14} />
                                            {task.assignee}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Due: {task.dueDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TasksPage;
