"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";

export default function About() {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <main>
      <Hero />
      <ProductShowcase />
    </main>
    
  </>);
}
