// components/ProductShowcase.jsx
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  const products = [
    { title: "Chilli Powder", img: "/pink2.png", btn: "Order Now" },
    { title: "Edible Pink Salt", img: "/pink3.png", btn: "Order Now" },
    { title: "Pink Salt Lamp", img: "/pink1.png", btn: "Order Now" },
  ];

  return (
    <section className="bg-white py-20">
      {/* Heading */}
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Spice Up Your Kitchen With Nature’s
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-orange-500">Finest Flavours </span>
          <span className="text-black">&</span>{" "}
          <span className="text-orange-500">Glow</span>
        </h2>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center items-center gap-20">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative w-72 h-72 flex flex-col items-center justify-end text-center"
          >
            {/* Circle Background with Shadow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-orange-50 shadow-2xl border border-orange-100" />

            {/* Product Image with animation */}
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.5 }}
              className="absolute -top-20 w-80 h-80"
            >
              <Image
                src={product.img}
                alt={product.title}
                width={450}
                height={450}
                className="object-contain"
              />
            </motion.div>

            {/* Title */}
            <h3 className="relative font-bold text-xl md:text-2xl text-black mb-4 mt-56">
              {product.title}
            </h3>

            {/* Button */}
            <button className="relative bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2 rounded-full text-base md:text-lg flex items-center gap-2 hover:opacity-90 transition">
              {product.btn}
              <span>🛒</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
