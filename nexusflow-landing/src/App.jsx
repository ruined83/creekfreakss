import React, { useState } from 'react';
import { Moon, Sun, Workflow, Brain, Users, Zap, Check, ChevronDown, Star, Menu, X } from 'lucide-react';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const features = [
        { icon: Workflow, title: 'Workflow Builder', description: 'Drag-and-drop interface to create powerful automation workflows in minutes' },
        { icon: Brain, title: 'AI Insights', description: 'Smart recommendations and predictive analytics powered by advanced AI' },
        { icon: Users, title: 'Team Collaboration', description: 'Work together seamlessly with real-time updates and shared workspaces' },
        { icon: Zap, title: 'Integrations', description: 'Connect with 1000+ apps including Slack, Gmail, Salesforce, and more' },
    ];

    const pricing = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            features: ['Up to 100 tasks/month', 'Basic workflows', '5 integrations', 'Community support'],
            cta: 'Start Free',
            popular: false
        },
        {
            name: 'Pro',
            price: '$19',
            period: 'per month',
            features: ['Unlimited tasks', 'Advanced AI features', 'Unlimited integrations', 'Priority support', 'Team collaboration', 'Custom workflows'],
            cta: 'Start Pro Trial',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact us',
            features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Advanced security', 'On-premise option'],
            cta: 'Contact Sales',
            popular: false
        },
    ];

    const testimonials = [
        { name: 'Sarah Johnson', role: 'CEO, TechStart', text: 'NexusFlow saved our team 20 hours per week. The AI insights are game-changing!', rating: 5 },
        { name: 'Michael Chen', role: 'Operations Manager', text: 'Best automation tool we\'ve used. Setup was incredibly easy and intuitive.', rating: 5 },
        { name: 'Emily Rodriguez', role: 'Product Lead', text: 'The integrations work flawlessly. Our entire workflow is now automated.', rating: 5 },
    ];

    const faqs = [
        { q: 'How does the free plan work?', a: 'The free plan includes 100 tasks per month, basic workflows, and 5 integrations. Perfect for individuals and small projects.' },
        { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time. No questions asked, no hidden fees.' },
        { q: 'What integrations are available?', a: 'We support 1000+ integrations including Slack, Gmail, Salesforce, HubSpot, Trello, Asana, and many more.' },
        { q: 'Is my data secure?', a: 'Absolutely. We use enterprise-grade encryption and are SOC 2 compliant. Your data is always protected.' },
    ];

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                {/* Navbar */}
                <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2">
                                <Zap className="text-purple-600" size={32} />
                                <span className="text-2xl font-bold gradient-text">NexusFlow</span>
                            </div>

                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">Features</a>
                                <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">Pricing</a>
                                <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">Testimonials</a>
                                <a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">FAQ</a>
                                <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
                                    Start Free
                                </button>
                            </div>

                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="animate-float inline-block mb-6">
                            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
                                ✨ AI-Powered Automation
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                            Automate Your Workflow<br />with AI Power
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                            Save hours, boost productivity – start free today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition transform hover:scale-105">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-lg hover:border-purple-600 transition">
                                Watch Demo
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">No credit card required • 14-day free trial</p>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Features</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to automate your workflow</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-200 dark:border-gray-700">
                                        <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                            <Icon className="text-white" size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Simple Pricing</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">Choose the plan that's right for you</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {pricing.map((plan, i) => (
                                <div key={i} className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${plan.popular ? 'ring-4 ring-purple-600 scale-105' : ''} transition hover:shadow-2xl`}>
                                    {plan.popular && (
                                        <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold mb-4 inline-block">MOST POPULAR</span>
                                    )}
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                        <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <Check className="text-green-500" size={20} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`w-full py-3 rounded-lg font-semibold transition ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Loved by Teams</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">See what our customers are saying</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, i) => (
                                <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, j) => (
                                            <Star key={j} className="text-yellow-400" size={20} fill="currentColor" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">FAQ</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">Got questions? We've got answers</p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full p-6 text-left flex justify-between items-center"
                                    >
                                        <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                                        <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Footer */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Automate?</h2>
                        <p className="text-xl text-purple-100 mb-8">Join thousands of teams already saving time with NexusFlow</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
                            />
                            <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-2xl transition">
                                Start Free
                            </button>
                        </div>
                        <p className="text-sm text-purple-100 mt-4">No credit card required • 14-day free trial</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Zap className="text-purple-600" size={24} />
                            <span className="text-xl font-bold text-white">NexusFlow</span>
                        </div>
                        <p className="mb-4">© 2025 NexusFlow. All rights reserved.</p>
                        <div className="flex justify-center gap-6 text-sm">
                            <a href="#" className="hover:text-white transition">Privacy</a>
                            <a href="#" className="hover:text-white transition">Terms</a>
                            <a href="#" className="hover:text-white transition">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
