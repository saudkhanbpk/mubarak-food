import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pink-100 px-6 py-8">
      <div className="w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              {/* Logo with geometric shapes */}
              <div className="flex items-center">
                <div className="flex">
                  <div className="w-3 h-6 bg-orange-400 transform -skew-x-12"></div>
                  <div className="w-3 h-6 bg-red-400 transform -skew-x-12 -ml-1"></div>
                </div>
                <div className="ml-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Mobarak
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-800 -mt-1">
                    F<span className="text-orange-400">o</span>ds
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-8 text-gray-700">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/shop" className="hover:text-gray-900 transition-colors">
              Shop
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/edible-salt" className="hover:text-gray-900 transition-colors">
              Edible Salt
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/pink-salt-lamp" className="hover:text-gray-900 transition-colors">
              Pink Salt Lamp
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact Information */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} className="text-orange-400" />
              <span>+1 999 88 999</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">W</span>
              </div>
              <span>+1 999 88 999</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-pink-200 gap-4">
          <div className="text-gray-600 text-sm">
            Copyright © 2025 All rights Reserved | Mobarak Foods LLC
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <span className="text-red-500">❤️</span>
            <span className="font-medium">Xeven Pixels</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;