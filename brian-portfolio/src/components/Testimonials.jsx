import React from 'react';
import { Star, Quote } from 'lucide-react';

function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'CTO at TechStart',
            company: 'TechStart Inc.',
            image: '👩‍💼',
            rating: 5,
            text: 'Brian delivered an exceptional analytics dashboard that exceeded our expectations. The AI features are incredibly intuitive and have transformed how we analyze data.',
        },
        {
            name: 'Mike Johnson',
            role: 'Product Manager',
            company: 'DataFlow Solutions',
            image: '👨‍💻',
            rating: 5,
            text: 'Working with Brian was a pleasure. He understood our requirements perfectly and delivered a production-ready dashboard in record time. Highly recommended!',
        },
        {
            name: 'Lisa Wang',
            role: 'Founder',
            company: 'HealthTech Pro',
            image: '👩‍⚕️',
            rating: 5,
            text: 'The healthcare dashboard Brian built for us is beautiful and functional. The AI health insights feature has been a game-changer for our platform.',
        },
    ];

    return (
        <section id="testimonials" className="section-container bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="section-title">Client Testimonials</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                        Don't just take my word for it - here's what clients say about working with me
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl">{testimonial.image}</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className="text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-2 -left-2 text-indigo-200 dark:text-indigo-800" size={24} />
                                <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                                    "{testimonial.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg">
                        <Star size={20} fill="currentColor" />
                        <span className="font-semibold">5.0 Average Rating</span>
                        <span className="text-indigo-200">•</span>
                        <span>20+ Happy Clients</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
