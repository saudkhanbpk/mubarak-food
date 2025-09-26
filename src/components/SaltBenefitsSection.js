import React from "react";
import { Leaf, Heart, DollarSign, Zap } from "lucide-react";

export default function SaltFeaturesSection() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-white" />,
      title: "Environment Friendly",
      description: "Our Himalayan pink salt is eco-friendly, sustainably mined, and kept pure as nature’s ancient mineral treasure."
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: "Luxury",
      description:"Enjoy premium Himalayan salt crystals — hand-selected for purity, rich minerals, and natural elegance in every dish."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Refreshing",
      description: "Packed with 84+ minerals, our salt boosts energy, supports hydration, and helps maintain your body’s natural balance."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: "Cost Saving",
      description:"Premium quality at fair prices — sourced directly from Himalayan mines for authentic pink salt without compromise."
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Features */}
          <div className="space-y-12">
            {features.slice(0, 2).map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Salt Lamp Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src="main.png" 
                alt="Himalayan Salt Lamp"
                className="w-120 h-100 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-orange-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 transform scale-75"></div>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-12">
            {features.slice(2, 4).map((feature, index) => (
              <div key={index + 2} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 ${index === 0 ? 'bg-orange-500' : 'bg-gray-900'} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}