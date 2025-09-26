import React from "react";
import { ShoppingCart } from "lucide-react";

export default function WhyMobarakFoods() {
  const cards = [
    {
      img: "info1.webp",
      title: "Healthy Food Essential",
      overlay: "bg-gradient-to-t from-black/70 to-transparent",
    },
    {
      img: "info2.png",
      title: "Pure Natural Ingredients",
      overlay: "bg-gradient-to-t from-black/70 to-transparent",
    },
    {
      img: "info3.webp",
      title: "Happy Family Happy Life",
      overlay: "bg-gradient-to-t from-black/70 to-transparent",
    },
  ];

  return (
    <section className="bg-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Text Section */}
          <div className="space-y-8 lg:col-span-2 text-center lg:text-left">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Why{" "}
                <span className="text-orange-500">Mobarak</span>
                <br className="hidden lg:block" />
                <span className="text-orange-500">Foods?</span>
              </h2>
            </div>

            <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              At Mobarak Foods, we bring you the finest natural ingredients with
              freshness and authenticity — from farm-fresh vegetables to premium
              spices, excellence in every bite.
            </p>

            <button className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto lg:mx-0">
              Order Now
              <ShoppingCart
                size={20}
                className="group-hover:animate-bounce"
              />
            </button>
          </div>

          {/* Right Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:col-span-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group ${
                  index === 0 ? "lg:mt-20" : index === 1 ? "lg:mt-10" : "lg:mt-0"
                }`}
              >
                <div className="relative h-80 sm:h-96">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-120 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 ${card.overlay} group-hover:opacity-80 transition-opacity duration-300`}
                  />
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-lg leading-tight drop-shadow-xl">
                    {card.title}
                  </h3>
                </div>

                {/* Decorative border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
