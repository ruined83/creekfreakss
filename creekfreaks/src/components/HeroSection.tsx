import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Largemouth bass leaping from creek water at dawn"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      </div>

      {/* Animated water ripples overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ripple" />
          <div className="absolute inset-8 rounded-full border-2 border-primary/15 animate-ripple" style={{ animationDelay: "0.5s" }} />
          <div className="absolute inset-16 rounded-full border-2 border-primary/10 animate-ripple" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <h1
            className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            If tears could build a stairway,{" "}
            <span className="text-primary">I'd walk right into heaven and bring you back home.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            A community for those who find healing in nature's embrace. Sharing stories of
            resilience, loss, and the quiet power of a creek at dawn.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-glow">
              <Link to="/story">
                Read My Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
              <Link to="/plant-a-tree">
                Support the Cause
              </Link>
            </Button>
          </div>

          {/* Memorial note */}
          <p
            className="mt-16 text-sm text-muted-foreground italic opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            In loving memory of Zachory and anyone else whose name deserves to be kept alive
          </p>
        </div>
      </div>

      {/* Tagline - positioned at bottom of hero, outside main content */}

    </section>
  );
}