import { Button } from "@/components/ui/button";
import { Tag, ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const image = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group relative bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-glow transition-all duration-300 block"
    >
      {/* Product Image */}
      <div className="aspect-square bg-muted/50 relative overflow-hidden">
        {image ? (
          <img 
            src={image.url} 
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-3 h-3 text-primary" />
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {node.options[0]?.values[0] || "Apparel"}
          </span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 line-clamp-2">
          {node.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={handleAddToCart}
            disabled={!firstVariant?.availableForSale}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};
