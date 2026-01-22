import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { TributeSection } from "@/components/TributeSection";
import { ProgressSection } from "@/components/ProgressSection";
import { Footer } from "@/components/Footer";


import { FeaturedGear } from "@/components/FeaturedGear";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <MissionSection />
        <TributeSection />

      </main>
      <Footer />

    </div>
  );
};

export default Index;
