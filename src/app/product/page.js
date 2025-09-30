
'use client';
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast"; // 👈 For popup notifications

const Page = () => {
  const categories = [
    "All",
    "Lentils & Whole Gr..",
    "Noodles",
    "Pickles, Sauces & ..",
    "Ready-Made Mixes",
    "Savoury Snacks",
    "Misc. Flours and F..",
    "Pickles",
    "Ground Spices",
    "Street Foods",
    "Spice Blends",
  ];

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // ✅ Load products
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(savedProducts);
    }
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ensure product has unique id
    const productWithId = {
      ...product,
      id: product.id || Date.now().toString(),
    };

    // check if already exists
    const existingIndex = cart.findIndex((item) => item.id === productWithId.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...productWithId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Stylish toast
    toast.success(`${productWithId.title} added to cart!`, {
      style: {
        borderRadius: "12px",
        background: "#333",
        color: "#fff",
      },
      icon: "🛒",
    });
  };

  // ✅ Search + Filter
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === "All" || product.category === filter;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero */}
      <div className="relative w-full h-[60vh] mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=1200"
          alt="Product Showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-center">
            Premium Products
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl">
            Discover our collection of authentic and quality products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-black text-gray-800">Filter by Categories</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 border hover:border-orange-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-2">All Products</h2>
              <p className="text-gray-600">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-semibold">No products found</p>
              <p className="text-gray-400">Try adjusting your search or filter</p>
            </div>
          ) : (
            currentProducts.map((product) => (
              <div
                key={product.id || product.title}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="relative h-56">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-bold text-green-600 shadow">
                    {product.status || "Available"}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{product.description}</p>

                  <div className="bg-orange-50 rounded-lg p-3 mb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs">Price:</span>
                      <span className="text-xl font-black text-orange-500">
                        Rs {product.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Weight:</span>
                      <span>{product.weight || "N/A"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-semibold py-2.5 rounded-xl hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    currentPage === pageNum
                      ? "bg-orange-500 text-white scale-110"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
