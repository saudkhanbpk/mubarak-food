"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Message from "@/components/Message";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <main>
      <Hero />
      <ProductShowcase />
      <Message />
    </main>
    <footer>
      <Footer />
    </footer>
  </>);
}
