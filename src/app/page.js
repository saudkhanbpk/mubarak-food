"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Message from "@/components/Message";
import FeatureCardsSection from "@/components/FeatureCardsSection"
import SaltFeaturesSection from "@/components/SaltBenefitsSection";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
    <main>
      <Hero />
      <ProductShowcase />
      <FeatureCardsSection />
      <SaltFeaturesSection />
      <Message />
    </main>
  </>);
}
