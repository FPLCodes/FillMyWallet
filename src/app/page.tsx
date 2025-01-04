"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CreatorGrid from "@/components/CreatorGrid";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <Header />
        <HeroSection />
        <CreatorGrid />
        <FeaturesSection />
      </div>
    </div>
  );
}
