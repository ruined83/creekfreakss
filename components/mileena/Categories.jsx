import React from 'react';

const categories = [
    {
        title: 'Executive Support',
        description: 'Professional, efficient, and ruthlessly organized. For when you need order in your chaos.',
        icon: '📊'
    },
    {
        title: 'After-Hours Intimacy',
        description: 'When the work day ends, their attention turns solely to you. Relax and unwind.',
        icon: '🍷'
    },
    {
        title: 'Strict Supervision',
        description: 'Discipline is the key to success. Let them keep you on track, by any means necessary.',
        icon: '📏'
    },
    {
        title: 'Creative Muses',
        description: 'Ignite your imagination. They will whisper ideas that push your boundaries.',
        icon: '🎨'
    }
];

function Categories() {
    return (
        <section className="bg-gray-900 py-16 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-red-500 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Choose Your Dynamic
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="mileena-card p-6 group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                                {category.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
