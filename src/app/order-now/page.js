"use client";
import { useState, useEffect } from "react";
import { Package } from "lucide-react";

export default function OrderNowPage() {
  const [checkoutData, setCheckoutData] = useState({ items: [] });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dropOffAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    instructions: "",
    payment: "Credit Card",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("checkoutData")) || { items: [] };
      setCheckoutData(data);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", { form, checkoutData });
    alert("Order submitted successfully!");
    localStorage.removeItem("checkoutData");
  };

  // Totals calculations
  const subtotal = checkoutData.items.reduce(
    (acc, item) => acc + parseFloat(item.price || 0) * (parseInt(item.quantity || 1)),
    0
  );

  // Shipping & Other Charges counted only once (from first product)
  const shippingFees = checkoutData.items.length > 0
    ? parseFloat(checkoutData.items[0].shippingFees || 0)
    : 0;

  const otherCharges = checkoutData.items.length > 0
    ? parseFloat(checkoutData.items[0].otherCharges || 0)
    : 0;

  // Discount per product
  const discount = checkoutData.items.reduce(
    (acc, item) =>
      acc +
      ((parseFloat(item.discount || 0) / 100) *
        parseFloat(item.price || 0) *
        (parseInt(item.quantity || 1))),
    0
  );

  const total = subtotal + shippingFees + otherCharges - discount;

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Personal Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-700">+358</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-r"
                required
              />
            </div>

            <label className="block text-sm font-medium text-slate-700 flex justify-between items-center">
              Drop Off Address
              <button type="button" className="text-sm text-orange-500 hover:underline">Edit</button>
            </label>
            <input
              type="text"
              name="dropOffAddress"
              placeholder="Location"
              value={form.dropOffAddress}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <label className="block text-sm font-medium text-slate-700">Street Address</label>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block text-sm font-medium text-slate-700">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block text-sm font-medium text-slate-700">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block text-sm font-medium text-slate-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block text-sm font-medium text-slate-700">Drop Off Instruction</label>
            <textarea
              name="instructions"
              placeholder="Type here"
              value={form.instructions}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            ></textarea>

            <label className="block text-sm font-medium text-slate-700 mt-2">Payment Option</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  checked={form.payment === "Credit Card"}
                  onChange={handleChange}
                  className="form-radio"
                />
                Credit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={form.payment === "Cash on Delivery"}
                  onChange={handleChange}
                  className="form-radio"
                />
                Cash on Delivery
              </label>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition mt-4"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {checkoutData.items.map((item, i) => (
                <div key={i} className="flex gap-4 border rounded p-3">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    ) : (
                      <Package className="w-10 h-10 text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      {item.description && <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>}
                      <p className="text-sm mt-1">
                        Quantity: {item.quantity || 1} | Price: Rs {parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="border-t pt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fees</span>
                  <span>Rs {shippingFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Charges</span>
                  <span>Rs {otherCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>- Rs {discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
