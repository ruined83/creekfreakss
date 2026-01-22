import React from 'react';
import { LayoutDashboard, CheckSquare, Users, FolderKanban, FileText } from 'lucide-react';

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'tasks', name: 'Tasks', icon: CheckSquare },
        { id: 'team', name: 'Team Members', icon: Users },
        { id: 'projects', name: 'Projects', icon: FolderKanban },
        { id: 'reports', name: 'Reports', icon: FileText },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all ${isOpen ? 'w-64' : 'w-20'} z-40`}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                    {isOpen ? (
                        <div>
                            <h1 className="font-bold text-xl text-indigo-600">CoreOps</h1>
                            <p className="text-xs text-gray-500 mt-1">Team Panel</p>
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-indigo-600 text-center">CO</div>
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
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
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
                <div className="p-4 border-t border-gray-200">
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">BR</div>
                        {isOpen && (
                            <div>
                                <p className="text-sm font-medium">Brian Rice</p>
                                <p className="text-xs text-gray-500">Team Lead</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
