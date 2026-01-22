import React, { useState } from 'react';
import { Search, Package, User, Calendar, DollarSign, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';

function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: 99.99, status: 'Delivered', date: '2 hours ago', items: 1 },
        { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: 299.99, status: 'Processing', date: '4 hours ago', items: 1 },
        { id: '#ORD-003', customer: 'Bob Johnson', product: 'Laptop Stand + USB Cable', amount: 69.98, status: 'Shipped', date: '6 hours ago', items: 2 },
        { id: '#ORD-004', customer: 'Alice Brown', product: 'USB-C Cable', amount: 19.99, status: 'Delivered', date: '1 day ago', items: 1 },
        { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Desk Lamp', amount: 39.99, status: 'Pending', date: '1 day ago', items: 1 },
        { id: '#ORD-006', customer: 'Diana Martinez', product: 'Mechanical Keyboard', amount: 129.99, status: 'Processing', date: '2 days ago', items: 1 },
        { id: '#ORD-007', customer: 'Eva Garcia', product: 'Mouse Pad + Webcam', amount: 94.98, status: 'Shipped', date: '2 days ago', items: 2 },
        { id: '#ORD-008', customer: 'Frank Lee', product: 'Wireless Headphones', amount: 99.99, status: 'Cancelled', date: '3 days ago', items: 1 },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: Package, color: 'blue' },
        { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'yellow' },
        { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, icon: Package, color: 'blue' },
        { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle, color: 'green' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return CheckCircle;
            case 'Shipped': return Truck;
            case 'Processing': return Package;
            case 'Pending': return Clock;
            case 'Cancelled': return XCircle;
            default: return Package;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track customer orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                                    <Icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order ID or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg transition capitalize ${statusFilter === status
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Order ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Customer</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Product</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Amount</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Items</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const StatusIcon = getStatusIcon(order.status);
                                return (
                                    <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-gray-400" />
                                                <span className="text-gray-900 dark:text-white">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.product}</td>
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">${order.amount}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.items}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                                                <StatusIcon size={14} />
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;
