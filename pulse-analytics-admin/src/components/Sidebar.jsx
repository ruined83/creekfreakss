import React from 'react';
import { LayoutDashboard, Users, BarChart3, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} z-40`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <h1 className={`font-bold text-xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        Pulse Analytics
                    </h1>
                    {!isOpen && (
                        <div className="text-2xl font-bold text-center">PA</div>
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
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
                <div className="p-4 border-t border-gray-800">
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="font-semibold">BR</span>
                        </div>
                        {isOpen && (
                            <div className="flex-1">
                                <p className="text-sm font-medium">Brian Rice</p>
                                <p className="text-xs text-gray-400">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
