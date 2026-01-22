import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thanks for reaching out! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="section-container bg-gray-100 dark:bg-gray-800">
            <div className="max-w-5xl mx-auto">
                <h2 className="section-title">Get In Touch</h2>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Let's Work Together
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Have a project in mind? Need a custom dashboard or AI integration?
                            I'd love to hear from you!
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                    <Mail className="text-indigo-600 dark:text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <a href="mailto:hello@brianrice.dev" className="text-gray-900 dark:text-white font-semibold hover:text-indigo-600 dark:hover:text-indigo-400">
                                        hello@brianrice.dev
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                    <Phone className="text-indigo-600 dark:text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        Within 24 hours
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                    <MapPin className="text-indigo-600 dark:text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        Remote (Worldwide)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
