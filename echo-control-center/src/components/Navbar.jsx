import React from 'react';
import { Search, Menu, Circle } from 'lucide-react';

function Navbar({ toggleSidebar }) {
    return (
        <header className="bg-black border-b border-control-border px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={toggleSidebar} className="p-2 hover:bg-control-panel rounded transition-colors">
                        <Menu size={20} className="text-gray-500" />
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={16} />
                        <input
                            type="text"
                            placeholder="Search systems..."
                            className="pl-10 pr-4 py-2 w-64 bg-control-panel border border-control-border rounded text-sm focus:outline-none focus:border-control-accent/50 transition-colors"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Circle className="status-indicator bg-green-500" size={8} />
                            <span className="text-xs text-gray-500 uppercase tracking-wider">All Systems Operational</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pl-6 border-l border-control-border">
                        <div className="text-right">
                            <p className="text-sm font-medium">Brian Rice</p>
                            <p className="text-xs text-gray-600">Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded bg-control-accent/20 flex items-center justify-center text-control-accent font-bold border border-control-accent/30">BR</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
