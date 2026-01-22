import React, { useState } from 'react';
import { Users, Mail, Shield, Activity } from 'lucide-react';

function UsersPage() {
    const users = [
        { id: 1, name: 'Alex Morgan', email: 'alex@company.com', role: 'Admin', status: 'Active', lastActive: '5 mins ago' },
        { id: 2, name: 'Jordan Lee', email: 'jordan@company.com', role: 'User', status: 'Active', lastActive: '1 hour ago' },
        { id: 3, name: 'Taylor Swift', email: 'taylor@company.com', role: 'Manager', status: 'Active', lastActive: '2 hours ago' },
        { id: 4, name: 'Casey Johnson', email: 'casey@company.com', role: 'User', status: 'Inactive', lastActive: '5 days ago' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.role}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;
