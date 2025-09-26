import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  // Customer avatars (Pravatar service - reliable)
  const customerAvatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
  ];

  return (
    <section className="relative bg-gradient-to-r from-white via-orange-50 to-white py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      {/* Left Side Content */}
      <div className="max-w-2xl text-center lg:text-left z-10">
        {/* Heading with animation */}
        <motion.h1
          className="text-3xl lg:text-5xl font-extrabold leading-snug text-gray-900 font-[Poppins]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          From The Peaks To Your Plate, Premium Himalayan{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-1 rounded-md">
            Pink Salt
          </span>{" "}
          Now Available
        </motion.h1>

        {/* Subtext with fade delay */}
        <motion.p
          className="mt-6 text-gray-600 text-base font-normal font-[Poppins]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Add rich flavor and essential minerals to every dish — make the switch
          to Himalayan Pink Salt today!
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          {/* Order Now Button */}
          <button className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Order Now <ShoppingCart size={18} className="ml-2" />
          </button>

          {/* Amazon Button */}
          <button className="px-6 py-3 rounded-full bg-gray-700 text-white font-medium hover:bg-gray-800 transition">
            Buy on Amazon
          </button>
        </motion.div>

        {/* Customers */}
        <motion.div
          className="mt-8 flex items-center justify-center lg:justify-start gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="flex -space-x-3">
            {customerAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Customer ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div>
            <p className="text-orange-500 text-lg font-medium">★★★★★</p>
            <p className="text-gray-600 text-sm font-normal">
              Loved by 2073+ Customers
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side Image */}
      <motion.img
        src="mainn.png"
        alt="Himalayan Pink Salt Collection"
        className="w-[500px] mt-12 lg:mt-0 lg:ml-12 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </section>
  );
}
