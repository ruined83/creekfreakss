import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SystemsPage from './SystemsPage';
import LogsPage from './LogsPage';
import AlertsPage from './AlertsPage';
import AIAssistant from './components/AIAssistant';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('overview');

    return (
        <div className="min-h-screen flex">
            <Sidebar isOpen={sidebarOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-6">
                    {currentPage === 'overview' && <Dashboard />}
                    {currentPage === 'systems' && <SystemsPage />}
                    {currentPage === 'logs' && <LogsPage />}
                    {currentPage === 'alerts' && <AlertsPage />}
                    {!['overview', 'systems', 'logs', 'alerts'].includes(currentPage) && (
                        <div className="text-xl font-semibold text-gray-500">
                            {currentPage.toUpperCase()} (Coming Soon)
                        </div>
                    )}
                </main>
            </div>
            <AIAssistant />
        </div>
    );
}

export default App;
