import React from 'react';
import { Search, Bell, Menu, Sun, Moon, Zap } from 'lucide-react';

function Navbar({ darkMode, toggleDarkMode, toggleSidebar }) {
    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-purple-200 dark:border-purple-900 px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search workflows, teams..."
                            className="pl-10 pr-4 py-2 w-80 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Quick action */}
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                        <Zap size={16} />
                        <span className="font-medium">New Workflow</span>
                    </button>

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                    >
                        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-600" />}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></span>
                    </button>

                    {/* User profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-purple-200 dark:border-purple-800">
                        <div className="text-right">
                            <p className="text-sm font-medium">Brian Rice</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
                            BR
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
