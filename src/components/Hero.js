import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-white via-pink-50 to-white py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
      {/* Left Side Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
          From The Peaks To Your Plate, Premium Himalayan{" "}
          <span className="bg-pink-500 text-white px-2 py-1 rounded-md">
            Pink Salt
          </span>{" "}
          Now Available
        </h1>
        <p className="mt-6 text-gray-600 text-lg">
          Add rich flavor and essential minerals to every dish — make the switch
          to Himalayan Pink Salt today!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition">
            Order Now <ShoppingCart size={18} />
          </button>
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition">
            Buy on Amazon
          </button>
        </div>

        {/* Customers */}
        <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
          <div className="flex -space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"
              ></div>
            ))}
          </div>
          <div>
            <p className="text-yellow-500 text-lg">★★★★★</p>
            <p className="text-gray-600 text-sm">Loved by 2073+ Customers</p>
          </div>
        </div>
      </div>

      {/* Right Side Placeholder for 6 Images */}
      <div className="grid grid-cols-3 gap-4 mt-12 lg:mt-0 lg:ml-12">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-lg bg-gray-200 shadow-inner flex items-center justify-center text-gray-500"
          >
            Image {i + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
