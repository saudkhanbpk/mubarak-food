'use client';
import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center space-x-2">
                            {/* Replace with your logo image */}
                            <img src="/mubareklogo.png" alt="Mobarark Foods" className="h-16 w-auto" />
                            {/* <span className="font-bold text-lg">Mobarark Foods</span> */}
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="/"
                            className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200"
                        >
                            Home
                        </a>
                        <a
                            href="/shop"
                            className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200"
                        >
                            Shop
                        </a>
                        <a
                            href="/edible-salt"
                            className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200"
                        >
                            Edible Salt
                        </a>
                        <a
                            href="/pink-salt-lamp"
                            className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200"
                        >
                            Pink Salt Lamp
                        </a>
                        <a
                            href="/contact"
                            className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200"
                        >
                            Contact
                        </a>

                        {/* Order Now Button */}
                        <a
                            href="/order"
                            className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Order now
                            <ShoppingCart className="ml-2 h-4 w-4" />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-orange-500 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <a
                                href="/"
                                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="/shop"
                                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                            >
                                Shop
                            </a>
                            <a
                                href="/edible-salt"
                                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                            >
                                Edible Salt
                            </a>
                            <a
                                href="/pink-salt-lamp"
                                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                            >
                                Pink Salt Lamp
                            </a>
                            <a
                                href="/contact"
                                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                            >
                                Contact
                            </a>
                            <a
                                href="/order"
                                className="block mx-3 mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-center"
                            >
                                Order now 🛒
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}