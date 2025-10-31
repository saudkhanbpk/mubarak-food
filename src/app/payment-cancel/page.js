"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function PaymentCancelPage() {
  useEffect(() => {
    Swal.fire({
      icon: "warning",
      title: "Payment Cancelled ❌",
      text: "It seems your payment was cancelled or failed.",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">
        Your payment was not completed. You can try again if you wish.
      </p>
      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
