"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";

export default function About() {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <main>
      <Hero />
    </main>
    <footer>
      <Footer />
    </footer>
  </>);
}
