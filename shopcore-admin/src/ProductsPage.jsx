import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const products = [
        { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, status: 'In Stock', sales: 234, image: '🎧' },
        { id: 2, name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 12, status: 'Low Stock', sales: 156, image: '⌚' },
        { id: 3, name: 'Laptop Stand', category: 'Accessories', price: 49.99, stock: 78, status: 'In Stock', sales: 423, image: '💻' },
        { id: 4, name: 'USB-C Cable', category: 'Accessories', price: 19.99, stock: 156, status: 'In Stock', sales: 891, image: '🔌' },
        { id: 5, name: 'Desk Lamp', category: 'Office', price: 39.99, stock: 8, status: 'Low Stock', sales: 167, image: '💡' },
        { id: 6, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 0, status: 'Out of Stock', sales: 345, image: '⌨️' },
        { id: 7, name: 'Mouse Pad', category: 'Accessories', price: 14.99, stock: 203, status: 'In Stock', sales: 567, image: '🖱️' },
        { id: 8, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 34, status: 'In Stock', sales: 289, image: '📷' },
    ];

    const categories = ['all', 'Electronics', 'Accessories', 'Office'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'blue' },
        { label: 'Low Stock Items', value: products.filter(p => p.status === 'Low Stock').length, icon: AlertTriangle, color: 'orange' },
        { label: 'Out of Stock', value: products.filter(p => p.status === 'Out of Stock').length, icon: AlertTriangle, color: 'red' },
        { label: 'Total Value', value: `$${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}`, icon: DollarSign, color: 'green' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-700';
            case 'Low Stock': return 'bg-orange-100 text-orange-700';
            case 'Out of Stock': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    <Plus size={20} />
                    Add Product
                </button>
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
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-2 rounded-lg transition ${categoryFilter === cat
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Product</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Category</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Stock</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Sales</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{product.image}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">${product.price}</td>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">{product.stock}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.sales}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

export default ProductsPage;
