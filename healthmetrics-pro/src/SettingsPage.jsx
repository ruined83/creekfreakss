import React from 'react';
import { Shield, Lock, Eye, Bell, Database, FileText, Check, AlertTriangle } from 'lucide-react';

function SettingsPage() {
    const hipaaFeatures = [
        { name: 'End-to-End Encryption', enabled: true, description: 'All patient data encrypted at rest and in transit' },
        { name: 'Access Logging', enabled: true, description: 'Complete audit trail of all data access' },
        { name: 'Role-Based Access Control', enabled: true, description: 'Granular permissions for staff members' },
        { name: 'Automatic Backups', enabled: true, description: 'Daily encrypted backups to secure storage' },
        { name: 'Two-Factor Authentication', enabled: true, description: 'Required for all user accounts' },
        { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 15 minutes of inactivity' },
    ];

    const complianceChecks = [
        { item: 'HIPAA Privacy Rule', status: 'Compliant', lastCheck: '2 days ago' },
        { item: 'HIPAA Security Rule', status: 'Compliant', lastCheck: '2 days ago' },
        { item: 'Data Encryption Standards', status: 'Compliant', lastCheck: '1 week ago' },
        { item: 'Access Control Policies', status: 'Compliant', lastCheck: '3 days ago' },
        { item: 'Breach Notification Procedures', status: 'Compliant', lastCheck: '1 week ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Configure system preferences and security</p>
            </div>

            {/* HIPAA Compliance Banner */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <Shield size={32} />
                    <div>
                        <h2 className="text-2xl font-bold">HIPAA Compliant System</h2>
                        <p className="text-green-100">Certified for healthcare data protection</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/20 p-4 rounded-lg">
                        <p className="text-sm mb-1">Last Security Audit</p>
                        <p className="text-lg font-bold">Dec 20, 2025</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                        <p className="text-sm mb-1">Compliance Score</p>
                        <p className="text-lg font-bold">100%</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                        <p className="text-sm mb-1">Data Breaches</p>
                        <p className="text-lg font-bold">0</p>
                    </div>
                </div>
            </div>

            {/* Security Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Lock size={24} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security Features</h2>
                </div>
                <div className="space-y-4">
                    {hipaaFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-start gap-3 flex-1">
                                {feature.enabled && <Check size={20} className="text-green-600 mt-1" />}
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{feature.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={feature.enabled} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compliance Checks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <FileText size={24} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compliance Status</h2>
                </div>
                <div className="space-y-3">
                    {complianceChecks.map((check, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Check size={20} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{check.item}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Last checked: {check.lastCheck}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-medium">
                                {check.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Eye size={24} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy Settings</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Patient Data Retention</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically archive records after 7 years</p>
                        </div>
                        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>7 years</option>
                            <option>10 years</option>
                            <option>Indefinite</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Data Anonymization</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Remove identifying information from archived records</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Bell size={24} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Security Alerts</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of suspicious activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Compliance Updates</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates on regulatory changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
