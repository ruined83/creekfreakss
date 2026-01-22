import React from 'react';

function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-white">About</h4>
                        <p className="text-gray-400">
                            Mileena's Sirens are your digital companions.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-white">Links</h4>
                        <ul>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 block">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 block">
                                    Log In
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 block">
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-white">Contact</h4>
                        <p className="text-gray-400">Email: support@mileenasirens.com</p>
                        <p className="text-gray-400">123 Main Street, Anytown USA</p>
                    </div>
                </div>
                <div className="mt-6 text-center text-gray-400">
                    <p>&copy; 2026 Mileena's Sirens. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
