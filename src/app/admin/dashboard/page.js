"use client"
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function DashboardPage() {

  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from localStorage (if saved during login)
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Good job!",
      text: "Logout successfully!",
      icon: "success"
    });
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin"; // redirect to login page
  };

  const handleChangePassword = () => {
    window.location.href = "/admin/changepassword"; 
  };


  return (
    <div className="text-gray-700">
      <div className="flex justify-between items-center relative">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>

        {/* Profile Icon */}
        <div className="relative">
          <FaRegUserCircle
            size={32}
            className="text-orange-500 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50">
              <div className="px-4 py-2 text-gray-700 border-b">
                <p className="text-sm font-semibold">Logged in as</p>
                <p className="text-sm">{email || "admin@example.com"}</p>
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Revenue Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$12,340</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold mt-2">240</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
      </div>

      {/* Orders Status */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Orders Summary</h2>
        <ul className="space-y-2">
          <li>Processing: 50</li>
          <li>Shipped: 120</li>
          <li>Delivered: 70</li>
        </ul>
      </div>
    </div>
  );
}
