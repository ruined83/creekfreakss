import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download, Calendar, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('month');

    const salesData = [
        { month: 'Jul', sales: 4200, orders: 28, profit: 1680 },
        { month: 'Aug', sales: 5100, orders: 34, profit: 2040 },
        { month: 'Sep', sales: 4800, orders: 32, profit: 1920 },
        { month: 'Oct', sales: 6200, orders: 41, profit: 2480 },
        { month: 'Nov', sales: 5800, orders: 38, profit: 2320 },
        { month: 'Dec', sales: 7100, orders: 47, profit: 2840 },
    ];

    const categoryData = [
        { name: 'Electronics', value: 45, revenue: '$12,450' },
        { name: 'Accessories', value: 30, revenue: '$8,300' },
        { name: 'Office', value: 15, revenue: '$4,150' },
        { name: 'Other', value: 10, revenue: '$2,770' },
    ];

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

    const stats = [
        { label: 'Total Revenue', value: '$45,231', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'green', prediction: 'Projected: $52,000 next month' },
        { label: 'Total Orders', value: '142', change: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'blue', prediction: 'Trending: +15% growth' },
        { label: 'Avg Order Value', value: '$318', change: '+4.1%', trend: 'up', icon: TrendingUp, color: 'purple', prediction: 'Target: $350' },
        { label: 'Customers', value: '89', change: '+12 new', trend: 'up', icon: Users, color: 'orange', prediction: '23 likely to return' },
    ];

    const topProducts = [
        { name: 'Wireless Headphones', sales: 234, revenue: '$23,366', trend: '+18%' },
        { name: 'USB-C Cable', sales: 891, revenue: '$17,810', trend: '+25%' },
        { name: 'Laptop Stand', sales: 423, revenue: '$21,135', trend: '+12%' },
        { name: 'Smart Watch', sales: 156, revenue: '$46,798', trend: '+8%' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Track your store performance</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="quarter">Last 3 Months</option>
                        <option value="year">Last Year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* AI Insights Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={20} />
                            <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <ArrowUp size={16} />
                                <span>Electronics category up 18% - consider expanding inventory</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <ArrowUp size={16} />
                                <span>USB-C Cables selling fast - restock recommended in 5 days</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Peak sales on Fridays - schedule promotions accordingly</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-sm">Powered by</p>
                        <p className="text-lg font-bold">AI Analytics</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards with Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                                    <Icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendIcon size={16} />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                                <Sparkles size={12} />
                                {stat.prediction}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue & Profit Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales ($)" />
                            <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit ($)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Orders by Month</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Bar dataKey="orders" fill="#10b981" name="Orders" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category Distribution & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Pie Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sales by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
                    <div className="space-y-4">
                        {topProducts.map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 dark:text-white">{product.revenue}</p>
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <ArrowUp size={14} />
                                        {product.trend}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
