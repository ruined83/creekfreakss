import React, { useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, DollarSign, Eye } from 'lucide-react';

function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', orders: 12, totalSpent: 1240.50, lastOrder: '2 hours ago', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 234-5678', orders: 8, totalSpent: 890.25, lastOrder: '4 hours ago', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 345-6789', orders: 15, totalSpent: 2100.75, lastOrder: '6 hours ago', status: 'VIP' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '(555) 456-7890', orders: 3, totalSpent: 245.99, lastOrder: '1 day ago', status: 'Active' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '(555) 567-8901', orders: 1, totalSpent: 39.99, lastOrder: '1 day ago', status: 'New' },
        { id: 6, name: 'Diana Martinez', email: 'diana@example.com', phone: '(555) 678-9012', orders: 20, totalSpent: 3450.00, lastOrder: '2 days ago', status: 'VIP' },
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Customers', value: customers.length, color: 'blue' },
        { label: 'VIP Customers', value: customers.filter(c => c.status === 'VIP').length, color: 'purple' },
        { label: 'New This Month', value: customers.filter(c => c.status === 'New').length, color: 'green' },
        { label: 'Avg. Order Value', value: `$${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.orders, 0)).toFixed(2)}`, color: 'orange' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'VIP': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your customer database</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search customers by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Customer</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Contact</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Orders</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Total Spent</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Last Order</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{customer.name}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Mail size={14} />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Phone size={14} />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag size={16} className="text-gray-400" />
                                            <span className="text-gray-900 dark:text-white">{customer.orders}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.lastOrder}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(customer.status)}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="flex items-center gap-1 px-3 py-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded transition">
                                            <Eye size={16} />
                                            View
                                        </button>
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

export default CustomersPage;
