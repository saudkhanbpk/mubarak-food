"use client"; // ✅ Make this a client component
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/cartcontext";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("admin"); // check if 'admin' is in the URL

  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true" >
          <CartProvider>
        {!isAdminRoute && <Navbar />}
        <main> 
        {children}
        </main>
        {!isAdminRoute && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
