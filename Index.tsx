import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import GearSection from "@/components/GearSection";
import AboutSection from "@/components/AboutSection";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Creek Freaks | Fishing Adventures, Gear Reviews & Outdoor Vlogs</title>
        <meta 
          name="description" 
          content="Join Creek Freaks for fishing adventures, honest gear reviews, and outdoor vlogs. Discover the best fishing spots, affiliate gear recommendations, and connect with fellow outdoor enthusiasts." 
        />
        <meta name="keywords" content="fishing, creek fishing, outdoor adventures, fishing gear, fishing vlog, outdoor lifestyle" />
        <link rel="canonical" href="https://creek-freaks.com" />
      </Helmet>
      
      <main>
        <HeroSection />
        <GearSection />
        <AboutSection />
        <SubscribeSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;