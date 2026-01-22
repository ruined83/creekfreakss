import React from 'react';
import { LayoutDashboard, Workflow, Users, BarChart3, Settings } from 'lucide-react';

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, gradient: 'from-purple-500 to-pink-500' },
        { id: 'workflows', name: 'Workflows', icon: Workflow, gradient: 'from-blue-500 to-cyan-500' },
        { id: 'teams', name: 'Teams', icon: Users, gradient: 'from-teal-500 to-emerald-500' },
        { id: 'analytics', name: 'Analytics', icon: BarChart3, gradient: 'from-orange-500 to-red-500' },
        { id: 'settings', name: 'Settings', icon: Settings, gradient: 'from-indigo-500 to-purple-500' },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} z-40 shadow-2xl`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-purple-800">
                    {isOpen ? (
                        <div>
                            <h1 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                VibeFlow
                            </h1>
                            <p className="text-xs text-purple-300 mt-1">Operations</p>
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            VF
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setCurrentPage(item.id)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                                                : 'text-purple-200 hover:bg-purple-800/50 hover:text-white'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                            {item.name}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-purple-800">
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="font-semibold">BR</span>
                        </div>
                        {isOpen && (
                            <div className="flex-1">
                                <p className="text-sm font-medium">Brian Rice</p>
                                <p className="text-xs text-purple-300">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
