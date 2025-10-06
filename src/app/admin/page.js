"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Good job!",
          text: "Login successFully!",
          icon: "success"
        });
        localStorage.setItem("adminToken", "true");
        localStorage.setItem("adminemail", email)
        router.push("/admin/dashboard");
      } else {
        // alert(data.error || "Invalid credentials");
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error || "Invalid credentials"
      });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };


  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 text-gray-700 rounded shadow-md w-96"
    >
      <h2 className="text-2xl text-gray-700 font-bold mb-6">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-4 text-gray-700 "
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 text-gray-700 "
      />
      <button className="bg-orange-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
}
