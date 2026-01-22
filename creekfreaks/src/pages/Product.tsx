import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { ShoppingCart, ArrowLeft, Minus, Plus, Loader2 } from "lucide-react";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const Product = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        if (data?.data?.product) {
          setProduct({ node: data.data.product });
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/shop">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const selectedVariant = node.variants.edges[selectedVariantIndex]?.node;
  const price = parseFloat(selectedVariant?.price.amount || node.priceRange.minVariantPrice.amount);
  const mainImage = node.images.edges[0]?.node;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${quantity}x ${node.title}`,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link and cart */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
            <CartDrawer />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                {mainImage ? (
                  <img 
                    src={mainImage.url} 
                    alt={mainImage.altText || node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              {node.images.edges.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {node.images.edges.map((img, idx) => (
                    <div key={idx} className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-border">
                      <img 
                        src={img.node.url} 
                        alt={img.node.altText || `${node.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {node.title}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  ${price.toFixed(2)}
                </p>
              </div>

              {node.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {node.description}
                </p>
              )}

              {/* Variants */}
              {node.variants.edges.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {node.variants.edges.map((variant, idx) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantIndex === idx ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVariantIndex(idx)}
                        disabled={!variant.node.availableForSale}
                        className={selectedVariantIndex === idx ? "bg-primary" : ""}
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(price * quantity).toFixed(2)}
              </Button>

              {!selectedVariant?.availableForSale && (
                <p className="text-destructive text-center">This variant is currently out of stock</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
