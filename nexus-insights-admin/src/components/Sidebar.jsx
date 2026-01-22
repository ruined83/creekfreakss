import React from 'react';
import { LayoutDashboard, Lightbulb, Database, FileText, Users, Settings } from 'lucide-react';

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'insights', name: 'Insights', icon: Lightbulb },
        { id: 'data-sources', name: 'Data Sources', icon: Database },
        { id: 'reports', name: 'Reports', icon: FileText },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all ${isOpen ? 'w-64' : 'w-20'} z-40`}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    {isOpen ? (
                        <div>
                            <h1 className="font-bold text-xl text-blue-600 dark:text-blue-400">Nexus Insights</h1>
                            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 text-center">NI</div>
                    )}
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setCurrentPage(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {isOpen && <span className="font-medium">{item.name}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">BR</div>
                        {isOpen && (
                            <div>
                                <p className="text-sm font-medium">Brian Rice</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
