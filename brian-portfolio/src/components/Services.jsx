import React from 'react';


function Services() {

  return (

    <section id="services" className="section-container">

      <div className="max-w-5xl mx-auto">

        <h2 className="section-title">Services</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Premium Dashboard Templates</h3>

            <p className="mt-2 text-gray-700 dark:text-gray-300">Production-ready React dashboards with AI features, glassmorphism UI, and complete source code.</p>

            <div className="mt-4">

              <p className="font-semibold text-gray-900 dark:text-gray-50">Template Only: $600</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">+ Customization: $1,200</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">+ Backend: $2,000</p>

            </div>

          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Custom Dashboard Development</h3>

            <p className="mt-2 text-gray-700 dark:text-gray-300">Tailored dashboard solutions built from scratch to match your exact requirements and branding.</p>

            <div className="mt-4">

              <p className="font-semibold text-gray-900 dark:text-gray-50">Basic: $2,000</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">Advanced: $4,000</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">Enterprise: $8,000+</p>

            </div>

          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">AI Integration Services</h3>

            <p className="mt-2 text-gray-700 dark:text-gray-300">Add AI-powered features to your existing dashboards or applications.</p>

            <div className="mt-4">

              <p className="font-semibold text-gray-900 dark:text-gray-50">AI Assistant: +$500</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">AI Analytics: +$800</p>

              <p className="font-semibold text-gray-900 dark:text-gray-50">Custom AI: Contact</p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}


export default Services;