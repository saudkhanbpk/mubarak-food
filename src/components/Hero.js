import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const customerAvatars = ["p1.png", "p2.png", "p3.png", "p4.png"];

  return (
    <section className="relative bg-gradient-to-r from-white via-orange-50 to-white 
      py-10 sm:py-14 md:py-16 lg:py-20 
      px-4 sm:px-6 md:px-10 lg:px-20 
      flex flex-col lg:flex-row items-center justify-between overflow-hidden"
    >
      {/* Left Side Content */}
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl text-center lg:text-left z-10">
        {/* Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
          font-extrabold leading-snug text-gray-900 font-[Poppins]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          From The Peaks To Your Plate, Premium Himalayan{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white 
          px-2 py-1 rounded-md">
            Pink Salt
          </span>{" "}
          Now Available
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-3 sm:mt-5 md:mt-6 text-gray-600 
          text-sm sm:text-base md:text-lg lg:text-xl font-normal font-[Poppins]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Add rich flavor and essential minerals to every dish — make the switch
          to Himalayan Pink Salt today!
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-5 sm:mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 
          justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <a
            href="/order"
            className="inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-3 
            rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white 
            text-sm sm:text-base md:text-lg font-semibold 
            hover:from-orange-500 hover:to-red-500 transition-all duration-200 
            transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Order Now <ShoppingCart size={18} className="ml-2" />
          </a>

          <a
            href="https://www.amazon.com/s?k=himalayan+pink+salt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-6 md:px-7 py-3 rounded-full 
            bg-gray-700 text-white text-sm sm:text-base md:text-lg font-medium 
            hover:bg-gray-800 transition"
          >
            Buy on Amazon
          </a>
        </motion.div>

        {/* Customers */}
        <motion.div
          className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="flex -space-x-2 sm:-space-x-3">
            {customerAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Customer ${i + 1}`}
                className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 
                rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div>
            <p className="text-orange-500 text-sm sm:text-base md:text-lg font-medium">
              ★★★★★
            </p>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg font-normal">
              Loved by 2073+ Customers
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side Image */}
      <motion.img
        src="mainn.png"
        alt="Himalayan Pink Salt Collection"
        className="w-44 sm:w-64 md:w-80 lg:w-[450px] xl:w-[520px] mt-8 lg:mt-0 lg:ml-12 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </section>
  );
}
