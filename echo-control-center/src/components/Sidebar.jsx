import React from 'react';
import { LayoutGrid, Server, Sliders, FileText, AlertTriangle, Settings } from 'lucide-react';

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'overview', name: 'Overview', icon: LayoutGrid },
        { id: 'systems', name: 'Systems', icon: Server },
        { id: 'controls', name: 'Controls', icon: Sliders },
        { id: 'logs', name: 'Logs', icon: FileText },
        { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-black border-r border-control-border transition-all ${isOpen ? 'w-64' : 'w-20'} z-40`}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-control-border">
                    {isOpen ? (
                        <div>
                            <h1 className="font-bold text-xl text-control-accent glow-text">ECHO</h1>
                            <p className="text-xs text-gray-600 mt-1">Control Center</p>
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-control-accent text-center glow-text">E</div>
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
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${isActive
                                                ? 'bg-control-accent/10 text-control-accent border-l-2 border-control-accent'
                                                : 'text-gray-500 hover:text-gray-300 hover:bg-control-panel'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {isOpen && <span className="font-medium text-sm uppercase tracking-wider">{item.name}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-control-border">
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded bg-control-accent/20 flex items-center justify-center text-control-accent font-bold border border-control-accent/30">BR</div>
                        {isOpen && (
                            <div>
                                <p className="text-sm font-medium">Brian Rice</p>
                                <p className="text-xs text-gray-600">Administrator</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
