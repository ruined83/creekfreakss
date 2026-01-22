import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import tributePhoto from "@/assets/tribute-photo.jpg";

export function TributeSection() {
  return (
    <section className="py-24 bg-gradient-creek relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src={tributePhoto} 
                  alt="A silhouette standing in calm waters at sunset - a peaceful memory" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-2xl border border-primary/20 -z-10" />
            </div>

            {/* Content */}
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                In Loving Memory
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                A Life Remembered, A Legacy Continued
              </h2>
              <p className="text-muted-foreground mb-6">
                Creek Freaks was born from the love of a parent and the memories we hold dear. 
                Every story shared, every product sold, and every connection made helps build 
                a lasting memorial and supports mental health awareness.
              </p>
              <p className="text-muted-foreground mb-8">
                The creek was always a place of peace—where worries faded with the current and 
                the simple act of casting a line brought clarity. That same peace is what we 
                hope to share with everyone who finds their way here.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                  <Link to="/story">
                    Read the Full Story
                  </Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/shop">
                    Support the Memorial
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}