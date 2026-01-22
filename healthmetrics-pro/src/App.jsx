import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar
                isOpen={sidebarOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Navbar
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    toggleSidebar={toggleSidebar}
                />

                {/* AI-Powered Badge */}
                <div className="px-6 pt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg">
                        <span className="text-lg">✨</span>
                        <span className="font-semibold">AI-Powered Analytics</span>
                        <span className="px-2 py-0.5 bg-white/20 rounded text-xs">PREMIUM</span>
                    </div>
                </div>

                <main className="flex-1 p-6">
                    {currentPage === 'dashboard' && <Dashboard />}
                    {currentPage === 'users' && <div className="text-2xl">Users Page (Coming Soon)</div>}
                    {currentPage === 'analytics' && <div className="text-2xl">Analytics Page (Coming Soon)</div>}
                    {currentPage === 'settings' && <div className="text-2xl">Settings Page (Coming Soon)</div>}
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default App;
