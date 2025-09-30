"use client";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  CreditCard,
} from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    const updated = [...cart];
    updated[index].quantity = qty;
    setCart(updated);
  };

  const incrementQuantity = (index) => {
    const updated = [...cart];
    updated[index].quantity = (updated[index].quantity || 1) + 1;
    setCart(updated);
  };

  const decrementQuantity = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCart(updated);
    }
  };

  const checkoutAll = () => {
    if (cart.length === 0) return;
    // Include all extra fields
    const checkoutItems = cart.map((item) => ({
      image: item.image || "",
      title: item.title || "",
      description: item.description || "",
      price: item.price || 0,
      quantity: item.quantity || 1,
      discount: item.discount || 0,
      shippingFees: item.shippingFees || 0,
      otherCharges: item.otherCharges || 0,
      category: item.category || "",
    }));
    localStorage.setItem("checkoutData", JSON.stringify({ items: checkoutItems }));
    window.location.href = "/order-now";
  };

  const checkoutSingle = (item) => {
    const checkoutItem = {
      image: item.image || "",
      title: item.title || "",
      description: item.description || "",
      price: item.price || 0,
      quantity: item.quantity || 1,
      discount: item.discount || 0,
      shippingFees: item.shippingFees || 0,
      otherCharges: item.otherCharges || 0,
      category: item.category || "",
    };
    localStorage.setItem("checkoutData", JSON.stringify({ items: [checkoutItem] }));
    window.location.href = "/order-now";
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-slate-700">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <Package className="w-16 h-16 text-orange-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cart is empty</h2>
        <p className="text-slate-600 mb-4">Add some products to start shopping</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
        </div>

        {/* Cart Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Package className="w-12 h-12 text-orange-400" />
                )}
              </div>

              <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                {item.description || "Premium quality product"}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => decrementQuantity(i)}
                  className="p-1 border rounded hover:bg-gray-100 transition"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(i, parseInt(e.target.value) || 1)
                  }
                  className="w-12 text-center border rounded text-sm"
                />
                <button
                  onClick={() => incrementQuantity(i)}
                  className="p-1 border rounded hover:bg-gray-100 transition"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Price */}
              <p className="text-sm font-bold mb-3">
                Rs {(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
              </p>

              {/* Item Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => removeFromCart(i)}
                  className="flex-1 text-red-600 text-sm flex items-center justify-center gap-1 border border-red-300 rounded py-1 hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
                <button
                  onClick={() => checkoutSingle(item)}
                  className="flex-1 bg-orange-500 text-white text-sm flex items-center justify-center gap-1 rounded py-1 hover:bg-orange-600 transition"
                >
                  <CreditCard className="w-4 h-4" /> Checkout
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout All & Clear Cart */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
          <button
            onClick={checkoutAll}
            className="bg-orange-500 text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            <CreditCard className="w-4 h-4" /> Checkout All
          </button>
          <button
            onClick={clearCart}
            className="border border-red-400 text-red-600 px-6 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
