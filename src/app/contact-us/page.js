'use client';
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function page() {
    return (
        <section className=" py-12 mb-8 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-8">
                    We’d love to hear from you! Please fill out the form below or use our contact information.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form */}
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <textarea
                            rows="4"
                            placeholder="Message"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold text-center text-sm sm:text-base"
                        >
                            SUBMIT
                        </button>
                    </form>

                    {/* Contact Info + Map */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <ul className="space-y-3 text-gray-700 mb-6">
                            <li className="flex items-center space-x-2">
                                <Mail className="text-orange-500 w-5 h-5" />
                                <span>contact@apnadookan.fi</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="text-orange-500 w-5 h-5" />
                                <span>+358 40 3209578</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="text-orange-500 w-5 h-5" />
                                <span>Klaneettitie 13, 00420 Helsinki</span>
                            </li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
                        <div className="overflow-hidden rounded-md shadow">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28828.334350099924!2d72.4655816!3d34.1297884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dec75e6cd8a0ff%3A0x73a8f68999fc840c!2sSwabi%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1695568123456!5m2!1sen!2s"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>
                    </div>
                </div>
            </div>
        </div>
        </section >
    );
}

