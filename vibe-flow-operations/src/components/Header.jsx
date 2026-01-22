import React from 'react';
import { Zap } from 'lucide-react';

function Header({ currentPage }) {
    const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg gradient-purple">
                    <Zap className="text-white" size={24} />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    {pageTitle}
                </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
                Visualize your workflow, energize your team 🚀
            </p>
        </div>
    );
}

export default Header;
