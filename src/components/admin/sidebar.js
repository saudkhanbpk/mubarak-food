// "use client";
// import { usePathname, useRouter } from "next/navigation";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const menuItems = [
//     { label: "Dashboard", href: "/admin/dashboard" },
//     { label: "Orders", href: "/admin/orders" },
//     { label: "Products", href: "/admin/products" },
//     { label: "Add Categories", href: "/admin/category" },
//     { label: "Contact", href: "/admin/contact" },
//   ];

//   return (
//     <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
//       <div>
//         <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
//         <nav className="flex flex-col gap-2">
//           {menuItems.map((item) => (
//             <a
//               key={item.href}
//               href={item.href}
//               className={`px-4 py-2 rounded-lg transition ${
//                 pathname === item.href
//                   ? "bg-blue-500 text-white font-medium"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {item.label}
//             </a>
//           ))}
//         </nav>
//       </div>

//       <button
//         onClick={() => {
//           localStorage.removeItem("adminToken");
//           router.push("/admin");
//         }}
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // npm install lucide-react

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
     { label: "Add Products", href: "/admin/products" },
     { label: "Add Categories", href: "/admin/categroy" },
    { label: "See Orders", href: "/admin/orders" },
    { label: "See Contact", href: "/admin/contact" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-3 m-3 bg-gray-200 w-64 h-screen rounded-md z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop (only mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)} // close when clicking outside
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <h2 className="text-xl mb-6 font-black text-orange-600">Admin Deshboard</h2>
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
              onClick={() => setIsOpen(false)} // close sidebar after navigation
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            router.push("/admin");
            setIsOpen(false);
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600"
        >
          Logout
        </button> */}
      </aside>
    </>
  );
}

