import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TeamPage from './TeamPage';
import TasksPage from './TasksPage';
import AnalyticsPage from './AnalyticsPage';
import AIAssistant from './components/AIAssistant';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar isOpen={sidebarOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-6">
                    {currentPage === 'dashboard' && <Dashboard />}
                    {currentPage === 'team' && <TeamPage />}
                    {currentPage === 'tasks' && <TasksPage />}
                    {currentPage === 'analytics' && <AnalyticsPage />}
                    {currentPage === 'settings' && (
                        <div className="text-xl font-semibold text-gray-500">
                            Settings (Coming Soon)
                        </div>
                    )}
                </main>
            </div>
            <AIAssistant />
        </div>
    );
}

export default App;
