// components/ProductShowcase.jsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  const products = [
    { title: "Chilli Powder", img: "/pink2.png", btn: "Order Now" },
    { title: "Edible Pink Salt", img: "/pink3.png", btn: "Order Now" },
    { title: "Pink Salt Lamp", img: "/pink1.png", btn: "Order Now" },
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decorative Images - Responsive sizing */}
      <Image
        src="/plant1.png"
        alt="Decor Left"
        width={160}
        height={160}
        className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 opacity-90 pointer-events-none select-none"
      />
      <Image
        src="/plant1.png"
        alt="Decor Right"
        width={160}
        height={160}
        className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 opacity-90 pointer-events-none select-none"
      />

      {/* Heading - Better responsive spacing */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 relative z-10 px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
          Spice Up Your Kitchen With Nature's
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mt-2">
          <span className="text-orange-500">Finest Flavours </span>
          <span className="text-black">&</span>{" "}
          <span className="text-orange-500">Glow</span>
        </h2>
      </div>

      {/* Product Cards - Fully responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 flex flex-col items-center justify-end text-center mx-auto"
          >
            {/* Circle Background - Responsive */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-orange-50 shadow-lg md:shadow-xl lg:shadow-2xl border border-orange-100" />

            {/* Product Image with animation - Much smaller on mobile */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute -top-12 sm:-top-16 md:-top-20 lg:-top-16 xl:-top-20 w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
            >
              <Image
                src={product.img}
                alt={product.title}
                width={450}
                height={450}
                className="object-contain w-full h-75"
              />
            </motion.div>

            {/* Title - Responsive typography and positioning */}
            <h3 className="relative font-bold text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-black mb-3 sm:mb-4 md:mb-5 mt-44 sm:mt-48 md:mt-56 lg:mt-48 xl:mt-56 px-2">
              {product.title}
            </h3>

            {/* Button - Responsive sizing */}
            <Link
              href="/order"
              className="relative bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 lg:px-5 lg:py-2 xl:px-6 xl:py-3 rounded-full text-sm sm:text-base md:text-lg lg:text-base xl:text-lg flex items-center gap-2 hover:opacity-90 transition-opacity duration-300 font-medium"
            >
              {product.btn}
              <span className="text-sm sm:text-base">🛒</span>
            </Link>
          </div>
        ))}
      </div>

     {/* View All Products Button */}
<div className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative z-10">
  <Link
    href="/products"
    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 transform"
  >
    View All Products
    <span className="text-lg sm:text-xl">→</span>
  </Link>
</div>

    </section>
  );
}