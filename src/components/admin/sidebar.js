"use client";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar({ onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Products", href: "/admin/products" },
    { label: "Categories", href: "/admin/categroy" },
    { label: "Orders", href: "/admin/orders" },
    { label: "Contact", href: "/admin/contact" },
  ];

  return (
    <aside className="h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-xl mb-6 text-orange-600">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={onClose} // closes sidebar on mobile
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          router.push("/admin");
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button> */}
    </aside>
  );
}
