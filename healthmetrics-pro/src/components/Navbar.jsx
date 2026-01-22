import React from 'react';
import { Search, Bell, Menu, Sun, Moon } from 'lucide-react';

function Navbar({ darkMode, toggleDarkMode, toggleSidebar }) {
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="text-right">
                            <p className="text-sm font-medium">Brian Rice</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            BR
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
