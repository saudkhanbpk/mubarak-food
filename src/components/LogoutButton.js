"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // clear user data
    router.push("/admin/login"); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="text-left text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}
