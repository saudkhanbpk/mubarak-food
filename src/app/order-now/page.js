import React from 'react'
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <div>
                <Link
                    href="/product" // put your store page route here
                    className="inline-flex items-center text-base p-2 m-2 text-gray-600 hover:text-green-800"
                >
                    {/* Back Arrow (SVG or icon) */}
                    <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back To Store
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Left Side - Form */}
                <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

                    {/* Personal Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="input border p-2" />
                            <input type="email" placeholder="Email Address" className="input border p-2" />
                            <input type="tel" placeholder="Phone Number" className="input md:col-span-2 border p-2" />
                        </div>
                    </div>

                    {/* Drop Off Address */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Drop Off Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Street Address" className="input border p-2 " />
                            <input type="text" placeholder="City" className="input border p-2" />
                            <input type="text" placeholder="State" className="input border p-2 " />
                            <input type="text" placeholder="Postal Code" className="input border p-2" />
                        </div>
                    </div>

                    {/* Drop Off Instructions */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Drop Off Instruction</h3>
                        <textarea
                            placeholder="Type here"
                            rows={4}
                            className="w-full border rounded-md px-3 py-2 border-black focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>
                </div>

                {/* Right Side - Optional (e.g., order summary) */}
                <div className="w-full md:w-1/3 bg-gray-50 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    {/* Add order summary or cart details here */}
                </div>
            </div>
        </div>
    )
}

export default page
