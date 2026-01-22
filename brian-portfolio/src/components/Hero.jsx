import React from 'react';

function Hero() {
  return (
    <section className="section-container bg-gray-100 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Brian Rice
        </h1>

        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
          Freelance Web Developer and Automation Expert
        </p>

        <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
          Specializing in premium React dashboards with AI features, data visualization, and production-ready admin panels.
          Creator of 8 complete AI-enhanced dashboards showcasing advanced UI/UX and full-stack capabilities.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300">
            View My Work
          </a>

          <a href="#footer" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 font-semibold rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all duration-300">
            Contact Me
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI-Enhanced Dashboards</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Production Ready</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">React</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">+ AI Integration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;