"use client";
import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import Swal from "sweetalert2";

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
    payment: "Cash on Delivery",
    onlineMethod: "",        // 'card' or 'easypaisa'
    cardType: "",            // 'Visa', 'MasterCard', 'Maestro', ...
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
    easypaisaNumber: "", 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: checkoutData.items,
      subtotal,
      shippingFees,
      otherCharges,
      discount,
      total,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      // if (data.success) {
      //   // alert("✅ Order submitted successfully!");
      //   Swal.fire({
      //     title: "Good job!",
      //     text: "Order submitted successfully!",
      //     icon: "success"
      //   });
      //   localStorage.removeItem("checkoutData");
      //   localStorage.removeItem("cart");

      //   setForm({
      //     fullName: "",
      //     email: "",
      //     phone: "",
      //     dropOffAddress: "",
      //     street: "",
      //     city: "",
      //     state: "",
      //     postalCode: "",
      //     instructions: "",
      //     payment: "Cash on Delivery",
      //      onlineMethod: "",
      //     cardType: "",
      //     cardNumber: "",
      //     cardHolder: "",
      //     cardExpiry: "",
      //     cardCvv: "",
      //     easypaisaNumber: "",
      //   });

      //   setCheckoutData({ items: [] });

      //   setTimeout(() => {
      //     window.location.href = "/";
      //   }, 2000);
      // } else {
      //   // alert("❌ Order failed: " + data.error);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "❌ Order failed: " + data.error,

      //   });
      // }


      if (data.success) {
  const orderId = data.orderId; // returned from your /api/order backend after saving the order

  // Check which payment method user selected
  if (form.payment === "Online Payment") {
    // 🔹 Initiate PayFast payment
    const res = await fetch("/api/payfast-initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,                // total price
        customer_email: form.email,   // customer's email
        fullName: form.fullName,      // customer's name
        orderId,                      // order id from database
      }),
    });

    const payfast = await res.json();

    if (payfast.success) {
      // 🔸 Redirect user to PayFast checkout page
      window.location.href = payfast.checkoutUrl;
      return; // stop further execution
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: payfast.error,
      });
      return;
    }
  }

  // 🔹 Cash on Delivery (COD)
  Swal.fire({
    title: "Good job!",
    text: "Order submitted successfully!",
    icon: "success",
  });

  localStorage.removeItem("checkoutData");
  localStorage.removeItem("cart");

  setForm({
    fullName: "",
    email: "",
    phone: "",
    dropOffAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    instructions: "",
    payment: "Cash on Delivery",
    onlineMethod: "",
    cardType: "",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
    easypaisaNumber: "",
  });

  setCheckoutData({ items: [] });

  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
} else {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "❌ Order failed: " + data.error,
  });
}

    } catch (err) {
      console.error("Order Error:", err);
      // alert("❌ Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Totals calculations
  const subtotal = checkoutData.items.reduce(
    (acc, item) => acc + parseFloat(item.price || 0) * (parseInt(item.quantity || 1)),
    0
  );

  const shippingFees = checkoutData.items.length > 0
    ? parseFloat(checkoutData.items[0].shippingFees || 0)
    : 0;

  const otherCharges = checkoutData.items.length > 0
    ? parseFloat(checkoutData.items[0].otherCharges || 0)
    : 0;

  const discount = checkoutData.items.reduce(
    (acc, item) =>
      acc +
      ((parseFloat(item.discount || 0) / 100) *
        parseFloat(item.price || 0) *
        (parseInt(item.quantity || 1))),
    0
  );

  const total = subtotal + shippingFees + otherCharges - discount;

   const supportedCards = [
    "Visa",
    "MasterCard",
    "Maestro",
    "Visa Electron",
    "UnionPay",
    "PayPak",
  ];

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
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}

              className="w-full border px-3 py-2 rounded"
              required
            />

            <label className="block text-sm font-medium text-slate-700">Drop Off Address</label>
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

            {/* Payment Fixed */}
            <div className="mt-2">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    defaultChecked
                    className="form-radio"
                  />
                  Cash on Delivery
                </label>

                  <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Online Payment"
                    checked={form.payment === "Online Payment"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  Online Payment
                </label>
              </div>
                  
                  
            
            {/* show dynamic UI when Online Payment selected */}
              {form.payment === "Online Payment" && (
                <div className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-50 space-y-3">
                  <h3 className="font-semibold text-lg">Online Payment - Choose Method</h3>

                  {/* Choose between Card or Easypaisa */}
                  <div className="flex gap-3 items-center">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="onlineMethod" value="card" checked={form.onlineMethod === "card"} onChange={handleChange} className="form-radio" />
                      Card (Visa / MasterCard / Maestro / etc.)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="onlineMethod" value="easypaisa" checked={form.onlineMethod === "easypaisa"} onChange={handleChange} className="form-radio" />
                      Easypaisa
                    </label>
                  </div>

                  {/* Card UI */}
                  {form.onlineMethod === "card" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Card Type</label>
                      <select name="cardType" value={form.cardType} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                        <option value="">-- Select Card Type --</option>
                        {supportedCards.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>

                      <label className="block text-sm font-medium text-slate-700">Card Number</label>
                      <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" inputMode="numeric" className="w-full border px-3 py-2 rounded" />

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700">Expiry (MM/YY)</label>
                          <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-slate-700">CVV</label>
                          <input name="cardCvv" value={form.cardCvv} onChange={handleChange} placeholder="123" inputMode="numeric" className="w-full border px-3 py-2 rounded" />
                        </div>
                      </div>

                      <label className="block text-sm font-medium text-slate-700">Card Holder Name</label>
                      <input name="cardHolder" value={form.cardHolder} onChange={handleChange} placeholder="As on card" className="w-full border px-3 py-2 rounded" />
                    </div>
                  )}

                  {/* Easypaisa UI */}
                  {form.onlineMethod === "easypaisa" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Easypaisa Mobile / Account</label>
                      <input name="easypaisaNumber" value={form.easypaisaNumber} onChange={handleChange} placeholder="03XX-XXXXXXX" className="w-full border px-3 py-2 rounded" />
                      <p className="text-xs text-gray-500">After you complete the Easypaisa transfer, record the transaction ID here (optional) or we will verify via gateway callback.</p>
                    </div>
                  )}

                  {/* Amount preview */}
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-slate-700">Amount</label>
                    <input type="text" value={`Rs ${total.toFixed(2)}`} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
                  </div>

                  <p className="text-xs text-gray-500">We will process the actual charge through the chosen gateway (PayFast / Easypaisa) after you place the order.</p>
                </div>
              )}
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
