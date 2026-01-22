import React from 'react';

function About() {
  const skills = [
    'React & TypeScript',
    'Tailwind CSS',
    'Data Visualization (Recharts)',
    'Responsive Design',
    'Dark Mode Implementation',
    'Component Architecture',
    'State Management',
    'UI/UX Design',
    'Admin Dashboards',
    'Kanban Boards',
    'Real-time Updates',
    'Modern Web Development'
  ];

  return (
    <section id="about" className="section-container bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center mb-8">About Me</h2>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I'm a freelance web developer specializing in creating modern, production-ready admin dashboards
            and data visualization applications. With expertise in React, Tailwind CSS, and modern web technologies,
            I build beautiful, functional interfaces that users love.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            My portfolio showcases 5 complete admin dashboards, each with unique design systems and features:
            from vibrant gradient-based UIs to sleek dark-mode control centers, analytics platforms with
            advanced charts, and collaborative team management tools.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I focus on creating production-ready applications with clean code, responsive design,
            and attention to detail. Every project demonstrates best practices in component architecture,
            state management, and modern UI/UX patterns.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center font-medium text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-4xl mb-2">🎨</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Design Systems</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Custom color palettes, gradients, and consistent component libraries
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-4xl mb-2">📊</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Visualization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Interactive charts, heatmaps, and real-time data displays
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-4xl mb-2">⚡</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Performance</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optimized components, efficient state management, smooth animations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;