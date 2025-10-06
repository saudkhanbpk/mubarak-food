"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import  AdminSidebar  from "../../components/admin/sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("adminToken");

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [isLoggedIn, pathname, router]);

  if (!isLoggedIn && pathname !== "/admin") return null;

  if (pathname === "/admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* Sidebar Toggle for Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-auto">
        {/* Header with Menu Button (Mobile) */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-gray-200 p-2 rounded-lg shadow"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}
