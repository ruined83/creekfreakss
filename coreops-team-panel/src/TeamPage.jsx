import React from 'react';
import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';

function TeamPage() {
    const team = [
        { id: 1, name: 'Sarah Chen', role: 'Team Lead', tasks: 12, completed: 10, status: 'Active' },
        { id: 2, name: 'Mike Johnson', role: 'Developer', tasks: 8, completed: 6, status: 'Active' },
        { id: 3, name: 'Emily Davis', role: 'Designer', tasks: 15, completed: 12, status: 'Active' },
        { id: 4, name: 'Alex Kim', role: 'QA Engineer', tasks: 10, completed: 9, status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Users size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Tasks</span>
                                <span className="font-semibold">{member.completed}/{member.tasks}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(member.completed / member.tasks) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamPage;
