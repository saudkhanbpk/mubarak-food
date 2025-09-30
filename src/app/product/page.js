'use client';
import React ,{useState}from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Page = () => {
    // 🔹 Slider settings for horizontal category scrolling
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true, // show arrows like in screenshot
        slidesToShow: 6, // how many items per view on desktop
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // tablets
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640, // mobile
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const categories = [
        { id: 1, name: 'Lentils & Whole Gr..', image: '/cat1.jpg' },
        { id: 2, name: 'Noodles', image: '/cat2.jpg' },
        { id: 3, name: 'Pickles, Sauces & ..', image: '/cat3.jpg' },
        { id: 4, name: 'Ready-Made Mixes', image: '/cat4.jpg' },
        { id: 5, name: 'Savoury Snacks', image: '/cat5.jpg' },
        { id: 6, name: 'Misc. Flours and F..', image: '/cat6.jpg' },
        { id: 7, name: 'Pickles', image: '/cat7.jpg' },
        { id: 8, name: 'Ground Spices', image: '/cat8.jpg' },
        { id: 9, name: 'Street Foods', image: '/cat9.jpg' },
        { id: 10, name: 'Spice Blends', image: '/cat10.jpg' },
    ];

    const products = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: `Product`,
        price: (Math.random() * 10).toFixed(2),
        image: '/cat1.jpg'
    }));

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);


    return (
        <div className='bg-white'>
            {/* Cover image */}
            <div className="w-full h-[60vh] mb-4 bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                    src="/product-cover.png"
                    alt="product cover photo"
                    className="w-full h-full object-fill"
                />
            </div>

            {/* Heading and slider */}
            <div className="bg-white m-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4">
                    Explore Categories
                </h1>

                {/* 🔹 Slider with categories */}
                <Slider {...settings}>
                    {categories.map((cat) => (
                        <div key={cat.id} className="px-2">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-32 object-contain p-2"
                                />
                                <div className="p-2">
                                    <h3 className="text-sm sm:text-base font-semibold">{cat.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='mb-8'>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between m-4 gap-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
                        All Products
                    </h1>

                    {/* Search input with icon */}
                    <div className="relative w-full md:w-64 lg:w-80">
                        <input
                            type="search"
                            placeholder="Search products here.."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {/* Search Icon (SVG) */}
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                    </div>
                </div>
                {/* Products grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 m-2">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover mb-2"
                            />
                            <h3 className="font-semibold text-sm sm:text-base truncate">
                                {product.name}
                            </h3>
                            <p className="text-green-600">Rs: {product.price}</p>
                            <button className="mt-2 bg-lime-400 text-black px-4 py-1 rounded hover:bg-lime-500">
                                Add
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-2 mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-lime-400 text-black' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                        Next
                    </button>
                </div>


            </div>
        </div>
    );
};

export default Page;
