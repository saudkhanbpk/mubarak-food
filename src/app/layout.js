"use client"; // ✅ Make this a client component

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("admin"); // check if 'admin' is in the URL

  return (
    <html lang="en">
      <body>
        {!isAdminRoute && <Navbar />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
