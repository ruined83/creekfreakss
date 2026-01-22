import React from 'react';
import { Activity, Heart, Droplet, Wind, TrendingUp, TrendingDown, Calendar, Download, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function AnalyticsPage() {
    const vitalTrends = [
        { month: 'Jul', heartRate: 72, bloodPressure: 120, glucose: 95, weight: 165 },
        { month: 'Aug', heartRate: 70, bloodPressure: 118, glucose: 92, weight: 163 },
        { month: 'Sep', heartRate: 71, bloodPressure: 122, glucose: 98, weight: 164 },
        { month: 'Oct', heartRate: 69, bloodPressure: 119, glucose: 94, weight: 162 },
        { month: 'Nov', heartRate: 68, bloodPressure: 117, glucose: 91, weight: 161 },
        { month: 'Dec', heartRate: 70, bloodPressure: 120, glucose: 93, weight: 160 },
    ];

    const patientStats = [
        { category: 'Diabetes', patients: 45, trend: '+5%' },
        { category: 'Hypertension', patients: 62, trend: '+8%' },
        { category: 'Heart Disease', patients: 28, trend: '-3%' },
        { category: 'Asthma', patients: 34, trend: '+2%' },
    ];

    const stats = [
        { label: 'Avg Heart Rate', value: '70 bpm', change: '-2 bpm', trend: 'down', icon: Heart, color: 'red' },
        { label: 'Avg Blood Pressure', value: '119/78', change: 'Normal', trend: 'stable', icon: Activity, color: 'blue' },
        { label: 'Avg Glucose', value: '94 mg/dL', change: '-3 mg/dL', trend: 'down', icon: Droplet, color: 'purple' },
        { label: 'Patient Compliance', value: '87%', change: '+5%', trend: 'up', icon: TrendingUp, color: 'green' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Analytics</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Track patient health trends and outcomes</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* AI Health Insights */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={20} />
                            <h3 className="text-xl font-bold">AI Health Insights</h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <TrendingDown size={16} />
                                <span>Average patient heart rate decreased by 2 bpm - positive trend</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <TrendingUp size={16} />
                                <span>Hypertension cases up 8% - consider preventive programs</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Patient compliance improved 5% this month</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-sm">Powered by</p>
                        <p className="text-lg font-bold">Health AI</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Activity;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                                    <Icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' :
                                        stat.trend === 'down' ? 'text-blue-600' :
                                            'text-gray-600'
                                    }`}>
                                    <TrendIcon size={16} />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vital Signs Trends */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vital Signs Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={vitalTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate" />
                            <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} name="Blood Pressure" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Glucose & Weight */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Glucose & Weight Tracking</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={vitalTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Area type="monotone" dataKey="glucose" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Glucose (mg/dL)" />
                            <Area type="monotone" dataKey="weight" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Weight (lbs)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Patient Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conditions Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Patients by Condition</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={patientStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="category" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Condition Trends */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Condition Trends</h3>
                    <div className="space-y-4">
                        {patientStats.map((stat, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">{stat.category}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.patients} patients</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-semibold flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-orange-600' : 'text-green-600'
                                        }`}>
                                        {stat.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {stat.trend}
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
