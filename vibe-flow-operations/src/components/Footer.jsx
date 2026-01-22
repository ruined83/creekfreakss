import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-purple-200 dark:border-purple-900 px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                    &copy; {new Date().getFullYear()} VibeFlow Operations. Made with
                    <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
                    for productive teams
                </p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a>
                    <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
