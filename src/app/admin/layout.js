"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Fake auth check (replace with real auth later)
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("adminToken");

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [isLoggedIn, pathname, router]);

  if (!isLoggedIn && pathname !== "/admin") {
    return null; // redirect hone tak blank
  }

  // Login page ka layout alag hoga
  if (pathname === "/admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

  // Admin pages ka layout with sidebar
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/faqs">FAQs</a>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin");
            }}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
