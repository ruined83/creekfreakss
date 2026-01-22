import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TreeDonationForm } from "@/components/TreePlanting/TreeDonationForm";
import { TreePine, Heart, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PlantATree = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-gradient-creek opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <TreePine className="w-10 h-10 text-primary" />
                <Leaf className="w-6 h-6 text-creek-moss" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Plant a Cypress Tree
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Honor the memory of someone you love with a living tribute
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each cypress tree planted represents a life remembered and celebrated. 
                Your donation helps us create a lasting memorial while supporting mental 
                health awareness through nature's healing power.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-semibold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  1. Share Their Story
                </h3>
                <p className="text-muted-foreground">
                  Fill out the tribute form with their name, photo, and a heartfelt dedication message.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">$</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  2. Make a Donation
                </h3>
                <p className="text-muted-foreground">
                  Send your donation via Venmo or CashApp. Any amount helps plant a tree in their honor.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-creek-moss/20 flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-creek-moss" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  3. Tree Gets Planted
                </h3>
                <p className="text-muted-foreground">
                  We plant a cypress tree and add their tribute to our memorial wall for all to see.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <TreeDonationForm />

        {/* Link to Memorial Wall */}
        <section className="py-16 bg-background text-center">
          <div className="container mx-auto px-4">
            <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Visit the Memorial Forest
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              See all the trees planted in memory of loved ones and read their heartfelt dedications.
            </p>
            <Button asChild size="lg">
              <Link to="/memorial-wall">
                View Memorial Wall
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlantATree;
