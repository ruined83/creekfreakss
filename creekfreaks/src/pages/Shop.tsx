
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShoppingBag, Sparkles, Loader2, Package, ArrowRight } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useAffiliateItems } from "@/hooks/useAffiliates";
import { useAuth } from "@/hooks/useAuth";
import { AddAffiliateDialog } from "@/components/AddAffiliateDialog";
import { AffiliateProductCard } from "@/components/shop/AffiliateProductCard"; // New Component
import { SeedReviews } from "@/components/admin/SeedReviews";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: affiliateItems, isLoading: affiliatesLoading } = useAffiliateItems();
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Store is temporarily closed / under construction
    setProducts([]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navigation />

      <main className="pt-20">
        {/* Premium Hero Section */}
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-card/30 border-b border-border/50">
          {/* Abstract Background Effects */}
          <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-5 mix-blend-overlay" />
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[80px]" />

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-sm animate-fade-in-up">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium tracking-wide">
                  Official Store & Curator Picks
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight animate-fade-in-up delay-100">
                Gear for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">
                  Modern Creek Freak
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-muted-foreground/90 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                Curated equipment and official merchandise to support mental health awareness and your next outdoor adventure.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-300">
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium animate-pulse">Loading essentials...</p>
            </div>
          )}

          {/* Featured/Shopify Products */}
          {!loading && products.length > 0 && (
            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-border" />
                <h2 className="font-serif text-3xl font-bold text-foreground">Official Merch</h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State - No Products */}
          {!loading && products.length === 0 && (
            <div className="relative bg-card/30 rounded-3xl p-12 border border-border/50 text-center max-w-3xl mx-auto overflow-hidden mb-24">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Store Under Construction
                </h3>
                <p className="text-muted-foreground text-lg max-w-lg mb-8">
                  We're currently updating our inventory. Please check back soon.
                </p>
              </div>
            </div>
          )}

          {/* AFFILIATE SECTION - "Gear We Love" */}
          <section className="relative">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
              <div className="space-y-4 max-w-2xl">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  Gear We Love
                </h2>
                <div className="h-1 w-24 bg-primary rounded-full" />
                <p className="text-lg text-muted-foreground">
                  Hand-picked equipment we actually use on the water. Trusted by the Creek Freaks team for reliability and vibe.
                </p>
              </div>

              {isAdmin && (
                <div className="shrink-0">
                  <AddAffiliateDialog />
                </div>
              )}
            </div>

            {affiliatesLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {affiliateItems?.map((item) => (
                  <AffiliateProductCard key={item.id} item={item} />
                ))}

                {/* Empty state for affiliates */}
                {(!affiliateItems || affiliateItems.length === 0) && (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-border/50 rounded-3xl bg-secondary/5">
                    <p className="text-xl text-muted-foreground font-medium">No recommendations yet.</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* "Coming Soon" / Footer CTA */}
          <div className="mt-32 relative bg-gradient-to-br from-primary/5 via-accent/5 to-background rounded-[2rem] p-12 md:p-20 border border-border/50 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 rounded-2xl bg-background shadow-lg flex items-center justify-center mx-auto rotate-3 hover:rotate-6 transition-transform duration-500">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>

              <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Join the Movement
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Be the first to know when new gear drops and get exclusive access to our limited runs.
              </p>

              <button className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all hover:gap-4 duration-300">
                Subscribe for Updates <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {isAdmin && <SeedReviews />}
    </div>
  );
};

export default Shop;

