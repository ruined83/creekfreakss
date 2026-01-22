import React from 'react';
import { Store, CreditCard, Truck, Bell, Globe, Shield, Zap, Check } from 'lucide-react';

function SettingsPage() {
    const integrations = [
        { name: 'Shopify', icon: '🛍️', status: 'Connected', color: 'green' },
        { name: 'Stripe', icon: '💳', status: 'Connected', color: 'green' },
        { name: 'PayPal', icon: '💰', status: 'Available', color: 'gray' },
        { name: 'ShipStation', icon: '📦', status: 'Connected', color: 'green' },
        { name: 'Mailchimp', icon: '📧', status: 'Available', color: 'gray' },
        { name: 'Google Analytics', icon: '📊', status: 'Connected', color: 'green' },
    ];

    const features = [
        { name: 'Real-time Inventory Sync', enabled: true },
        { name: 'Auto Low-Stock Alerts', enabled: true },
        { name: 'AI Sales Predictions', enabled: true },
        { name: 'Automated Reordering', enabled: false },
        { name: 'Multi-currency Support', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Configure your store preferences</p>
            </div>

            {/* Store Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Store size={24} className="text-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Store Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
                        <input
                            type="text"
                            defaultValue="ShopCore Demo Store"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Email</label>
                        <input
                            type="email"
                            defaultValue="hello@shopcore.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>UTC-5 (EST)</option>
                            <option>UTC-8 (PST)</option>
                            <option>UTC+0 (GMT)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Integrations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Zap size={24} className="text-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Integrations</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {integrations.map((integration, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 transition">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{integration.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{integration.name}</p>
                                    <p className={`text-xs ${integration.status === 'Connected' ? 'text-green-600' : 'text-gray-500'}`}>
                                        {integration.status}
                                    </p>
                                </div>
                            </div>
                            <button className={`px-3 py-1 rounded text-sm font-medium ${integration.status === 'Connected'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                {integration.status === 'Connected' ? 'Connected' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Shield size={24} className="text-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Premium Features</h2>
                </div>
                <div className="space-y-4">
                    {features.map((feature, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                {feature.enabled && <Check size={20} className="text-green-600" />}
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{feature.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {feature.enabled ? 'Active' : 'Available in Pro plan'}
                                    </p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={feature.enabled} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Bell size={24} className="text-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Low Stock Alerts</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when products are running low</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">New Order Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive alerts for new customer orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
