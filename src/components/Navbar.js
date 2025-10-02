'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Home, Package, Mail } from 'lucide-react';
import { useCart } from "@/context/cartcontext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);


   const { cartCount } = useCart();

  // Scroll effect for navbar shadow and background
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/product', label: 'Products', icon: Package },
    { href: '/contact-us', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation Row */}
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 z-10">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <img
                    src="/mubareklogo.png"
                    alt="Mobarark Foods"
                    className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden below lg */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 text-gray-700 hover:text-orange-500 font-semibold transition-all duration-300 text-sm xl:text-base"
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{item.label}</span>
                  </span>
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <span>Cart</span>
                <ShoppingCart className="h-5 w-5" />

                {/* ✅ Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button - Visible below lg */}
            <div className="lg:hidden z-10">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 sm:h-7 sm:w-7" />
                ) : (
                  <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu - Visible below lg */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-2 bg-gradient-to-b from-white to-orange-50/30 border-t border-gray-100 rounded-b-2xl shadow-inner">
              {navLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium text-base sm:text-lg rounded-xl transition-all duration-200 transform hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none',
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <span>Cart</span>
                <ShoppingCart className="h-5 w-5" />

                {/* ✅ Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Add animation keyframes */}
        <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      </nav>

      {/* Spacer div to prevent content from hiding under fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
}