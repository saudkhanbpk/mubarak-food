"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const res = await fetch("/api/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("adminemail"),
          oldPassword,
          newPassword,
        }),
      });
      // console.log(res)
      const data = await res.json();

      if (res.ok) {
        // alert("Password changed successfully!");
        Swal.fire({
          title: "Good job!",
          text: "Logout successfully!",
          icon: "success"
        });
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        window.location.href = "/admin";
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
         Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error 
              });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error While Changing Password" 
              });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
