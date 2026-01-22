import React from 'react';
import { ExternalLink, Star, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';

function App() {
    const dashboards = [
        {
            name: 'Pulse Analytics Admin',
            tagline: 'AI-Powered Analytics Dashboard',
            description: 'Advanced analytics with AI chat assistant, auto-generated insights, and interactive charts',
            price: '$2,500',
            tier: 'Premium AI',
            features: ['AI Chat Assistant', 'Auto Insights', 'Advanced Charts', 'Dark Mode'],
            url: 'http://localhost:5173',
            badge: 'AI-Powered',
            color: 'from-blue-600 to-indigo-600'
        },
        {
            name: 'HealthMetrics Pro',
            tagline: 'HIPAA-Compliant Healthcare Analytics',
            description: 'Medical-grade analytics dashboard with AI features and healthcare compliance messaging',
            price: '$5,000',
            tier: 'Enterprise Healthcare',
            features: ['HIPAA Compliant', 'AI Insights', 'Patient Analytics', 'Secure'],
            url: 'http://localhost:5182',
            badge: 'Healthcare',
            color: 'from-cyan-600 to-blue-600'
        },
        {
            name: 'VibeFlow Operations',
            tagline: 'Vibrant Workflow Management',
            description: 'Energetic operations dashboard with workflow diagrams, kanban board, and gradient design',
            price: '$1,500',
            tier: 'Standard',
            features: ['Workflow Diagrams', 'Kanban Board', 'Vibrant UI', 'Team Collaboration'],
            url: 'http://localhost:5175',
            badge: 'Popular',
            color: 'from-purple-600 to-pink-600'
        },
        {
            name: 'Nexus Insights Admin',
            tagline: 'Professional Data Analytics',
            description: 'Clean analytics platform with advanced visualizations and nexus connection analysis',
            price: '$1,800',
            tier: 'Standard',
            features: ['Advanced Charts', 'Heatmaps', 'Data Filtering', 'Professional Design'],
            url: 'http://localhost:5176',
            badge: null,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            name: 'Echo Control Center',
            tagline: 'Real-Time System Monitoring',
            description: 'Dark-mode control room with live updating metrics, system controls, and real-time logs',
            price: '$2,000',
            tier: 'Premium',
            features: ['Real-Time Updates', 'System Controls', 'Live Logs', 'Control Room UI'],
            url: 'http://localhost:5177',
            badge: 'Real-Time',
            color: 'from-gray-700 to-gray-900'
        },
        {
            name: 'CoreOps Team Panel',
            tagline: 'Team Management Dashboard',
            description: 'Collaborative team management with kanban board, member profiles, and progress tracking',
            price: '$1,600',
            tier: 'Standard',
            features: ['Kanban Board', 'Team Profiles', 'Task Management', 'Progress Tracking'],
            url: 'http://localhost:5178',
            badge: null,
            color: 'from-indigo-600 to-purple-600'
        },
        {
            name: 'NexusFlow Landing',
            tagline: 'SaaS Landing Page',
            description: 'Modern landing page with hero, features, pricing, testimonials, and FAQ sections',
            price: '$800',
            tier: 'Landing Page',
            features: ['Hero Section', 'Pricing Tiers', 'Testimonials', 'FAQ Accordion'],
            url: 'http://localhost:5179',
            badge: null,
            color: 'from-purple-500 to-pink-500'
        },
        {
            name: 'ShopCore Admin',
            tagline: 'E-commerce Management',
            description: 'Complete e-commerce dashboard with products, orders, sales charts, and inventory',
            price: '$2,200',
            tier: 'E-commerce',
            features: ['Product Management', 'Order Tracking', 'Sales Analytics', 'Inventory'],
            url: 'http://localhost:5180',
            badge: null,
            color: 'from-emerald-600 to-green-600'
        },
        {
            name: 'BookFlow CRM',
            tagline: 'Booking & Appointment System',
            description: 'CRM dashboard with calendar, client management, booking stats, and appointment tracking',
            price: '$1,900',
            tier: 'CRM',
            features: ['Calendar View', 'Client Management', 'Booking Stats', 'Appointments'],
            url: 'http://localhost:5181',
            badge: null,
            color: 'from-blue-600 to-indigo-500'
        }
    ];

    const totalValue = dashboards.reduce((sum, d) => sum + parseInt(d.price.replace(/[$,]/g, '')), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">9 Production-Ready Dashboards</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Dashboard Portfolio</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        Professional React dashboards with AI features, real-time updates, and modern design
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#dashboards" className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition">
                            View Dashboards
                        </a>
                        <a href="mailto:hello@brianrice.dev" className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/30 transition">
                            Contact Me
                        </a>
                    </div>
                    <p className="mt-6 text-sm opacity-75">Total Portfolio Value: ${totalValue.toLocaleString()}</p>
                </div>
            </header>

            {/* Stats */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-indigo-600">9</div>
                            <div className="text-sm text-gray-600 mt-1">Complete Dashboards</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600">AI</div>
                            <div className="text-sm text-gray-600 mt-1">Powered Features</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-600">100%</div>
                            <div className="text-sm text-gray-600 mt-1">Production Ready</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600">React</div>
                            <div className="text-sm text-gray-600 mt-1">+ Tailwind CSS</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboards Grid */}
            <section id="dashboards" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Dashboards</h2>
                        <p className="text-xl text-gray-600">Click any dashboard to view live demo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dashboards.map((dashboard, i) => (
                            <div key={i} className={`group relative bg-gradient-to-br ${dashboard.color} p-[2px] rounded-xl overflow-hidden hover:scale-105 transition-all duration-300`}>
                                {dashboard.badge && (
                                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1">
                                        {dashboard.badge === 'AI-Powered' && <Sparkles size={12} />}
                                        {dashboard.badge === 'Healthcare' && <Shield size={12} />}
                                        {dashboard.badge === 'Real-Time' && <Zap size={12} />}
                                        {dashboard.badge === 'Popular' && <TrendingUp size={12} />}
                                        {dashboard.badge}
                                    </div>
                                )}

                                <div className="bg-white rounded-xl p-6 h-full flex flex-col">
                                    <h3 className="text-2xl font-bold mb-2">{dashboard.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{dashboard.tagline}</p>
                                    <p className="text-gray-700 mb-4 flex-1">{dashboard.description}</p>

                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {dashboard.features.map((feature, j) => (
                                                <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">{dashboard.price}</div>
                                            <div className="text-xs text-gray-500">{dashboard.tier}</div>
                                        </div>
                                        <a href={dashboard.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${dashboard.color} text-white rounded-lg font-semibold hover:shadow-lg transition`}>
                                            <ExternalLink size={16} />
                                            View Live
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work Together?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Get a custom dashboard built for your business with AI features, real-time updates, and modern design
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:hello@brianrice.dev" className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition">
                            Get a Quote
                        </a>
                        <a href="https://brianrice.dev" className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/30 transition">
                            View Portfolio
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 text-gray-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="mb-4">© 2025 Brian Rice. All rights reserved.</p>
                    <div className="flex justify-center gap-6 text-sm">
                        <a href="mailto:hello@brianrice.dev" className="hover:text-white transition">hello@brianrice.dev</a>
                        <a href="https://brianrice.dev" className="hover:text-white transition">brianrice.dev</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
