import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Heart, Sparkles } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-16 mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-creek-water/5 via-transparent to-transparent" />
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-creek-water/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-creek-water/10 border border-creek-water/20 mb-6">
                <Users className="w-4 h-4 text-creek-water" />
                <span className="text-creek-water font-medium text-sm uppercase tracking-wider">
                  You're Not Alone
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Creek Freaks <span className="text-primary">Community</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                A safe space to share your story, connect with others, and find healing through shared experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Community Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="group relative bg-gradient-to-br from-card via-card to-creek-water/5 rounded-2xl p-8 border border-border hover:border-creek-water/30 transition-all duration-300 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-creek-water/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-creek-water/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-creek-water" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Share Stories
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tell your story of healing, loss, or the moments nature brought you peace.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Find Connection
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect with others who understand the journey and the power of nature.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Support Others
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Offer encouragement and kindness to those walking similar paths.
                </p>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="relative bg-gradient-to-br from-primary/10 via-card to-creek-water/10 rounded-3xl p-12 text-center max-w-2xl mx-auto overflow-hidden border border-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,181,24,0.1)_0%,transparent_50%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
                Community Forum Coming Soon
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                We're building a safe, moderated space for our community to connect and share.
                Sign up to be notified when it launches.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
