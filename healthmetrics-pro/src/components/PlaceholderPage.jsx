import React from 'react';
import { Sparkles, Mail } from 'lucide-react';

function PlaceholderPage({ title, description, icon: Icon }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
            <div className="max-w-md text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                        <Icon size={64} className="text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    {description}
                </p>

                {/* Feature Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg mb-6">
                    <Sparkles size={16} />
                    <span className="text-sm font-semibold">Available in Custom Builds</span>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        This feature can be customized and built to your exact specifications
                    </p>
                    <a
                        href="mailto:hello@brianrice.dev"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        <Mail size={18} />
                        Request Custom Build
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PlaceholderPage;
