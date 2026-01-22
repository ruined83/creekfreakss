import React from 'react';

function Header() {
    return (
        <header className="bg-black shadow-md">
            <div className="container mx-auto py-4 px-6">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-2xl font-bold text-white gothic">
                        Mileena
                        <span className="text-red-600">&#x2665;</span>
                    </a>
                    <nav>
                        <ul className="flex items-center space-x-6">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Log In
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
