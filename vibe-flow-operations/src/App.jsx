import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WorkflowsPage from './WorkflowsPage';
import TeamsPage from './TeamsPage';
import AnalyticsPage from './AnalyticsPage';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

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

                <main className="flex-1 p-6">
                    <Header currentPage={currentPage} />

                    {currentPage === 'dashboard' && <Dashboard />}
                    {currentPage === 'workflows' && <WorkflowsPage />}
                    {currentPage === 'teams' && <TeamsPage />}
                    {currentPage === 'analytics' && <AnalyticsPage />}
                    {currentPage === 'settings' && (
                        <div className="text-xl font-semibold text-gray-500">
                            Settings (Coming Soon)
                        </div>
                    )}
                </main>

                <Footer />
            </div>
            <AIAssistant />
        </div>
    );
}

export default App;
