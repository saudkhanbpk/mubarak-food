import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, } from 'react-icons/fa';
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="">
      <footer
        className="
        bg-pink-100 
        max-w-6xl 
        border-t border-pink-400 
        rounded-t-3xl 
        shadow-lg p-8
        mx-4 sm:mx-6 lg:mx-auto   
        py-6 sm:py-8 lg:py-10    
        mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="/mubarek2.png"
                alt="Mobarark Foods"
                className="h-16 w-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-gray-700">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="/shop" className="hover:text-gray-900 transition-colors">
              Products
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="/contact-us" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact - Added more spacing and better alignment */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <a
                href="tel:+923001181738"
                className="flex items-center gap-2 hover:text-orange-500 transition"
              >
                <Phone size={18} className="text-orange-400" />
                <span className="text-sm lg:text-base font-medium">
                  +92 3001181738
                </span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <a
                href="https://wa.me/923001181738"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-600 transition"
              >
                <FaWhatsapp size={18} className="text-green-500" />
                <span className="text-sm lg:text-base font-medium">
                  +92 3001181738
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-pink-400 gap-3 text-center px-4">
          {/* Left Side: Text */}
          <div className="text-gray-600 text-sm">
            © 2025 All Rights Reserved | Mobarak Foods LLC
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-4 text-xl text-gray-600">
            <a
              href="https://www.facebook.com/share/1MJoFyD5D7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/mubarak_foods12?igsh=MXZqbTl6ZjdpaDF6bQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@mubarakfoods1?_t=ZS-90n0eO9PNWn&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;