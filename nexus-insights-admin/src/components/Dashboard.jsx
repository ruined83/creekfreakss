import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Link2, Target, ArrowUp, ArrowDown, Filter, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Mock Data
const metricsData = [
    { title: 'Key Metrics', value: '1,247', change: '+23.5%', trend: 'up', icon: Target },
    { title: 'Trends Identified', value: '18', change: '+12%', trend: 'up', icon: TrendingUp },
    { title: 'Anomalies Detected', value: '4', change: '-25%', trend: 'down', icon: AlertCircle },
    { title: 'Correlation Score', value: '0.87', change: '+0.12', trend: 'up', icon: Link2 },
];

const trendData = [
    { month: 'Jan', revenue: 45000, users: 1200, engagement: 78 },
    { month: 'Feb', revenue: 52000, users: 1450, engagement: 82 },
    { month: 'Mar', revenue: 48000, users: 1380, engagement: 79 },
    { month: 'Apr', revenue: 61000, users: 1650, engagement: 85 },
    { month: 'May', revenue: 58000, users: 1580, engagement: 83 },
    { month: 'Jun', revenue: 70000, users: 1890, engagement: 88 },
];

const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];

const heatmapData = [
    { name: 'Mon', values: [0.2, 0.5, 0.8, 0.3, 0.9] },
    { name: 'Tue', values: [0.4, 0.7, 0.6, 0.8, 0.5] },
    { name: 'Wed', values: [0.9, 0.3, 0.7, 0.6, 0.8] },
    { name: 'Thu', values: [0.3, 0.8, 0.5, 0.9, 0.4] },
    { name: 'Fri', values: [0.7, 0.6, 0.9, 0.4, 0.7] },
];

const nexusConnections = [
    { from: 'Revenue Growth', to: 'User Engagement', strength: 0.92, type: 'strong' },
    { from: 'Marketing Spend', to: 'New Users', strength: 0.78, type: 'moderate' },
    { from: 'Product Updates', to: 'Retention Rate', strength: 0.85, type: 'strong' },
    { from: 'Support Tickets', to: 'Churn Rate', strength: -0.68, type: 'inverse' },
];

const tableData = [
    { id: 1, metric: 'Revenue', value: '$70,000', change: '+15.2%', status: 'up', category: 'Financial' },
    { id: 2, metric: 'Active Users', value: '1,890', change: '+8.5%', status: 'up', category: 'Engagement' },
    { id: 3, metric: 'Churn Rate', value: '2.3%', change: '-12%', status: 'down', category: 'Retention' },
    { id: 4, metric: 'Avg Session', value: '12m 34s', change: '+5.2%', status: 'up', category: 'Engagement' },
    { id: 5, metric: 'Conversion', value: '4.2%', change: '+18%', status: 'up', category: 'Sales' },
];

function Dashboard() {
    const [sortBy, setSortBy] = useState('metric');
    const [filterCategory, setFilterCategory] = useState('all');

    const getHeatmapColor = (value) => {
        const intensity = Math.round(value * 255);
        return `rgb(${255 - intensity}, ${200 - intensity * 0.5}, ${255})`;
    };

    const filteredTable = tableData.filter(row =>
        filterCategory === 'all' || row.category === filterCategory
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Deep data connections and insights</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricsData.map((metric, index) => {
                    const Icon = metric.icon;
                    const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
                    return (
                        <div key={index} className="metric-card">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Icon className="text-white" size={20} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendIcon size={14} />
                                    {metric.change}
                                </div>
                            </div>
                            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{metric.title}</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Nexus Connections */}
            <div className="insight-card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Link2 className="text-blue-600" size={20} />
                    Nexus Connections
                </h3>
                <div className="space-y-3">
                    {nexusConnections.map((conn, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-900 dark:text-white">{conn.from}</span>
                                    <div className="connection-line w-12"></div>
                                    <span className="font-medium text-gray-900 dark:text-white">{conn.to}</span>
                                </div>
                                <span className={`data-badge ${conn.type === 'strong' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                        conn.type === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {Math.abs(conn.strength).toFixed(2)} {conn.type}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div className={`h-2 rounded-full ${conn.type === 'strong' ? 'bg-green-500' : conn.type === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.abs(conn.strength) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="insight-card">
                    <h3 className="text-lg font-bold mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="insight-card">
                    <h3 className="text-lg font-bold mb-4">User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="users" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Scatter Chart */}
                <div className="insight-card">
                    <h3 className="text-lg font-bold mb-4">Correlation Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="x" stroke="#9ca3af" />
                            <YAxis dataKey="y" stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            <Scatter name="Data Points" data={scatterData} fill="#3b82f6" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* Heatmap */}
                <div className="insight-card">
                    <h3 className="text-lg font-bold mb-4">Activity Heatmap</h3>
                    <div className="space-y-2">
                        {heatmapData.map((row, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-sm font-medium w-12 text-gray-600 dark:text-gray-400">{row.name}</span>
                                <div className="flex-1 grid grid-cols-5 gap-2">
                                    {row.values.map((value, j) => (
                                        <div
                                            key={j}
                                            className="heatmap-cell"
                                            style={{ backgroundColor: getHeatmapColor(value) }}
                                            title={`${row.name}: ${(value * 100).toFixed(0)}%`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="insight-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Key Metrics Overview</h3>
                    <div className="flex items-center gap-3">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                            <option value="all">All Categories</option>
                            <option value="Financial">Financial</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Retention">Retention</option>
                            <option value="Sales">Sales</option>
                        </select>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-semibold text-sm">Metric</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Value</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Change</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable.map((row) => (
                                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-3 px-4 font-medium">{row.metric}</td>
                                    <td className="py-3 px-4">{row.value}</td>
                                    <td className="py-3 px-4">
                                        <span className={`data-badge ${row.status === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {row.change}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="data-badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                            {row.category}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
