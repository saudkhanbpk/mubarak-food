"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";

import Hero from "./Hero.js";

export default function About() {
  return (
    <>
    <main>
      <Hero />
    </main>
    <div>
      <Navbar />
    </div>
  </>);
}
