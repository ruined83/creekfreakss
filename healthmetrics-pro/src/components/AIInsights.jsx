import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

function AIInsights() {
    const insights = [
        {
            type: 'success',
            icon: CheckCircle,
            title: 'Strong Revenue Growth',
            description: 'Revenue increased by 8.2% this month. March showed exceptional performance with $9,800 in revenue.',
            action: 'Analyze March strategies',
            color: 'green'
        },
        {
            type: 'warning',
            icon: AlertTriangle,
            title: 'Session Decline Detected',
            description: 'Active sessions dropped by 3.1%. This may indicate engagement issues or technical problems.',
            action: 'Investigate user behavior',
            color: 'orange'
        },
        {
            type: 'insight',
            icon: TrendingUp,
            title: 'User Acquisition Peak',
            description: 'January had the highest user acquisition (4,000 users). Consider replicating those campaign strategies.',
            action: 'Review January campaigns',
            color: 'blue'
        },
        {
            type: 'success',
            icon: Lightbulb,
            title: 'Above-Average Conversion',
            description: 'Your 3.24% conversion rate is above industry average. Current optimization efforts are working well.',
            action: 'Maintain current tactics',
            color: 'purple'
        }
    ];

    const colorMap = {
        green: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            border: 'border-green-200 dark:border-green-800',
            icon: 'text-green-600 dark:text-green-400',
            button: 'bg-green-600 hover:bg-green-700'
        },
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/20',
            border: 'border-orange-200 dark:border-orange-800',
            icon: 'text-orange-600 dark:text-orange-400',
            button: 'bg-orange-600 hover:bg-orange-700'
        },
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-800',
            icon: 'text-blue-600 dark:text-blue-400',
            button: 'bg-blue-600 hover:bg-blue-700'
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            border: 'border-purple-200 dark:border-purple-800',
            icon: 'text-purple-600 dark:text-purple-400',
            button: 'bg-purple-600 hover:bg-purple-700'
        }
    };

    return (
        <div className="stat-card">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                    <Lightbulb className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-generated recommendations based on your data</p>
                </div>
            </div>

            <div className="space-y-4">
                {insights.map((insight, i) => {
                    const Icon = insight.icon;
                    const colors = colorMap[insight.color];

                    return (
                        <div key={i} className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${colors.icon}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                                    <button className={`px-3 py-1 text-white rounded text-sm ${colors.button} transition-colors`}>
                                        {insight.action} →
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                <p className="text-sm font-medium">💡 Want deeper insights?</p>
                <p className="text-xs mt-1 opacity-90">Ask the AI assistant anything about your data using the chat button!</p>
            </div>
        </div>
    );
}

export default AIInsights;
