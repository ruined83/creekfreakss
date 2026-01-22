import { Link } from "react-router-dom";
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NewsletterForm } from "@/components/NewsletterForm";

const socialLinks: { name: string, href: string, icon: any }[] = [
  // { name: "Facebook", href: "https://facebook.com/creekfreaks", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/creek_freak1", icon: Instagram },
  // { name: "Twitter", href: "https://twitter.com/creekfreaks", icon: Twitter },
  // { name: "YouTube", href: "https://youtube.com/@creekfreaks", icon: Youtube },
];

export function Footer() {
  const { isAdmin } = useAuth();
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold">
              <span className="text-primary">Creek</span>
              <span className="text-creek-sunset">Freaks</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Finding healing through nature, one cast at a time. Supporting mental health
              awareness and honoring the memory of those we've lost.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/story" className="text-muted-foreground hover:text-primary transition-colors">
                  My Story
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/podcast" className="text-muted-foreground hover:text-primary transition-colors">
                  Podcast
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://creek-freaks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  creek-freaks.com
                </a>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* The Tackle Box Newsletter */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              The Tackle Box 🎣
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Weekly tactics for creek & pond bass. Gear tips, hidden spots, and good vibes.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/70 text-center max-w-2xl mx-auto">
            <span className="font-medium text-muted-foreground">Affiliate Disclosure:</span> Some links on this site are affiliate links.
            If you buy something through them, I may earn a small commission at no extra cost to you.
            It helps keep Creek Freaks running and supports the mission. I only recommend gear I actually use and believe in.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CREEK-FREAKS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-creek-sunset fill-creek-sunset" /> in memory of those we love
          </p>
        </div>
      </div>
    </footer>
  );
}
