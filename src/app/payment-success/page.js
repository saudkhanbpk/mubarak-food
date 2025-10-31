"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function PaymentSuccessPage() {
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful 🎉",
      text: "Thank you! Your payment has been received successfully.",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        We’ve received your payment. Your order is now being processed.
      </p>
      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
