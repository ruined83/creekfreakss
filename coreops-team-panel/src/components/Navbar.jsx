import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

function Navbar({ toggleSidebar }) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Menu size={20} />
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search tasks, members..." className="pl-10 pr-4 py-2 w-80 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right">
                            <p className="text-sm font-medium">Brian Rice</p>
                            <p className="text-xs text-gray-500">Team Lead</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">BR</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
