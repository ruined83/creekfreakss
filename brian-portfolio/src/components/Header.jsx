import React from 'react';


function Header({ darkMode, toggleDarkMode }) {

  return (

    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <a href="#" className="text-2xl font-bold text-indigo-600 dark:text-teal-500 transition-colors duration-300">

          Brian Rice

        </a>

        <nav className="hidden md:flex items-center space-x-6">

          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-teal-500 transition-colors duration-300">About</a>

          <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-teal-500 transition-colors duration-300">Experience</a>

          <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-teal-500 transition-colors duration-300">Projects</a>

          <a href="#writing" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-teal-500 transition-colors duration-300">Writing</a>

          <button onClick={toggleDarkMode} className="ml-6 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-500 transition-shadow duration-300">

            {darkMode ? (

              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-indigo-600 dark:hover:text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />

              </svg>

            ) : (

              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-indigo-600 dark:hover:text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />

              </svg>

            )}

          </button>

        </nav>

        <div className="md:hidden">

          <button className="focus:outline-none">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

            </svg>

          </button>

        </div>

      </div>

    </header>

  );

}


export default Header;