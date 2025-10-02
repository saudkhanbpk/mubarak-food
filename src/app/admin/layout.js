"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "../../components/admin/sidebar";

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
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
