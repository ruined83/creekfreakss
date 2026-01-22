import React from 'react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Pulse Analytics. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
