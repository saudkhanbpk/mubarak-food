'use client';
import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* main row */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="/mubareklogo.png"
                alt="Mobarark Foods"
                className="h-12 w-auto sm:h-14 md:h-16"
              />
            </a>
          </div>

          {/* Desktop Nav — only show ≥lg (1024px) */}
          <div className="hidden lg:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: '/edible-salt', label: 'Edible Salt' },
              { href: '/pink-salt-lamp', label: 'Pink Salt Lamp' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 font-bold transition-colors duration-200 text-sm md:text-base lg:text-base"
              >
                {item.label}
              </a>
            ))}

            {/* Order Now Button */}
            <a
              href="/order"
              className="inline-flex items-center px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Order now
              <ShoppingCart className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Mobile menu button — visible <lg */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav — visible <lg */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 rounded-b-lg">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/edible-salt', label: 'Edible Salt' },
                { href: '/pink-salt-lamp', label: 'Pink Salt Lamp' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium text-sm sm:text-base"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/order"
                className="block mx-3 mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-center text-sm sm:text-base"
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
