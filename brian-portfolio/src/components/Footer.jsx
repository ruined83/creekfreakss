import React from 'react';


function Footer() {

  return (

    <footer id="footer" className="section-container bg-gray-200 dark:bg-gray-800">

      <div className="max-w-3xl mx-auto text-center">

        <p className="text-gray-700 dark:text-gray-300">

          &copy; {new Date().getFullYear()} Brian Rice. All rights reserved.

        </p>

        <div className="mt-4">

          <a href="mailto:hello@brianrice.dev" className="text-indigo-600 dark:text-teal-500 hover:text-indigo-700 dark:hover:text-teal-400 transition-colors duration-300">hello@brianrice.dev</a>

        </div>

        <div className="mt-4">

          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300">

            Book a Free Quote

          </button>

        </div>

      </div>

    </footer>

  );

}


export default Footer;