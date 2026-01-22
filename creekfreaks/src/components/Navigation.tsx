import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "My Story" },
  { href: "/charger-project", label: "The Charger" },
  { href: "/memorial-wall", label: "Memorial Wall" },
  { href: "/plant-a-tree", label: "Plant a Tree" },
  { href: "/shop", label: "Shop" },
  { href: "/podcast", label: "Podcast" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          <img
            src="/logo.png"
            alt="Creek Freaks logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-primary">Creek</span>
          <span className="text-creek-sunset">Freaks</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}