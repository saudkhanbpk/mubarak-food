import React, { useState, useEffect } from "react";

const Message = () => {
    const testimonials = [
        {
            id: 1,
            message:
                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            name: "Nasir",
            location: "USA",
            avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        },
        {
            id: 2,
            message:
                "The salt lamps are absolutely amazing! They create such a peaceful atmosphere in my home. The quality is outstanding and shipping was super fast.",
            name: "Sarah",
            location: "Canada",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",

        },
        {
            id: 3,
            message:
                "Best quality pink salt I've ever purchased. The texture and taste are perfect for cooking. Will definitely order again!",
            name: "Michael",
            location: "UK",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        },
        {
            id: 4,
            message:
                "Incredible customer service and premium products. The salt lamps have helped improve my sleep quality significantly.",
            name: "Emma",
            location: "Australia",
            avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        },
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                );
                setIsAnimating(false);
            }, 500); // same as animation duration
        }, 4000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="w-[90vw] mx-auto flex flex-col lg:flex-row mb-8 mt-4 bg-white">
            {/* Left section with background image */}
            <div
                className="
                            flex-1 h-[300px] lg:h-[420px]
                            flex items-center justify-center
                            rounded-2xl border border-gray-400
                            bg-[url('/6.jpg')] bg-cover bg-center
                         "
            >
                <div className="relative flex-1 h-[250px] lg:h-[400px]">
                    {/* text block pinned to the bottom */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4 lg:px-6 text-white max-w-md text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2">What Our Customers Say</h2>
                        <p className="text-xs lg:text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                            luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right section with testimonial */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
                <div className="max-w-md w-full relative overflow-hidden h-[250px] lg:h-[300px]">
                    <div
                        className={`absolute inset-0 bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-pink-200 transform transition-all duration-500 ease-linear ${isAnimating
                            ? "translate-x-full opacity-0"
                            : "translate-x-0 opacity-100"
                            }`}
                    >
                        {/* Quote icon */}
                        <div className="text-pink-300 text-4xl mb-4">
                            <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                        </div>

                        {/* Testimonial text */}
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                            {testimonials[currentTestimonial].message}
                        </p>

                        {/* Customer info */}
                        <div className="flex items-center">
                            <img
                                src={testimonials[currentTestimonial].avatar}
                                alt={testimonials[currentTestimonial].name}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800 text-base lg:text-lg">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <p className="text-gray-500 text-xs lg:text-sm">
                                    {testimonials[currentTestimonial].location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;