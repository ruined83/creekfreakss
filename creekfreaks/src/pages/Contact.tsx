import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Globe, Send, Heart, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-16 mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium text-sm uppercase tracking-wider">
                  Get in Touch
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Have a question, want to share your story, or interested in collaborating? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="relative bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl p-8 border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Send a Message
                  </h2>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="What's on your mind?"
                      rows={5}
                      className="bg-background/50 border-border focus:border-primary resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-card via-card to-creek-water/5 rounded-2xl p-8 border border-border overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-creek-water/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                    Other Ways to Connect
                  </h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-creek-water/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-creek-water" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Email</h3>
                        <a
                          href="mailto:creekfreak@creek-freaks.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          creekfreak@creek-freaks.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Phone</h3>
                        <a
                          href="tel:+13182281126"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          (318) 228-1126
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Website</h3>
                        <a
                          href="https://creek-freaks.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          creek-freaks.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="relative bg-gradient-to-br from-accent/10 via-card to-card rounded-2xl p-8 border border-accent/20 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      A Note on Sharing
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you're reaching out to share your story, know that we read every message with
                    care and compassion. Your experiences matter, and we're honored you'd trust us with them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
