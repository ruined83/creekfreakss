import { ExternalLink, Trash2, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteAffiliateItem } from "@/hooks/useAffiliates";

interface AffiliateItem {
    id: string;
    title: string;
    description: string | null;
    price: string | null;
    image_url: string | null;
    affiliate_url: string;
    category: string | null;
}

interface AffiliateProductCardProps {
    item: AffiliateItem;
    className?: string;
}

export function AffiliateProductCard({ item, className }: AffiliateProductCardProps) {
    const { isAdmin } = useAuth();
    const deleteAffiliateItem = useDeleteAffiliateItem();

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this item from the shop?")) {
            deleteAffiliateItem.mutate(item.id);
        }
    };

    return (
        <div
            className={cn(
                "group relative flex flex-col h-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary/20">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                        <ShoppingBag className="w-16 h-16" />
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    {item.category && (
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-border/50 text-xs font-serif tracking-wide">
                            {item.category}
                        </Badge>
                    )}
                    {/* Mock "Staff Pick" logic - could be real data later */}
                    {Math.random() > 0.7 && (
                        <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-md border-none flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Staff Pick
                        </Badge>
                    )}
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                    <button
                        onClick={handleDelete}
                        className="absolute top-3 right-3 p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                        title="Delete Item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 relative">
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-serif text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                            {item.title}
                        </h3>
                        {item.price && (
                            <span className="shrink-0 font-medium text-lg text-primary font-serif">
                                {item.price}
                            </span>
                        )}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {item.description ? item.description.split('**Pros:**')[0].replace(/\*\*/g, '') : "No description available."}
                    </p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="text-xs font-medium text-primary hover:text-primary/80 mb-6 transition-colors border-b border-primary/30 hover:border-primary pb-px w-fit">
                                Read Full Review & Specs
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl">{item.title}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-4 text-foreground/90 leading-relaxed whitespace-pre-line">
                                    {item.description}
                                </div>
                            </ScrollArea>
                            <div className="pt-4 mt-2 border-t flex justify-end">
                                <Button asChild className="gap-2">
                                    <a href={item.affiliate_url} target="_blank" rel="noopener noreferrer">
                                        View Product <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full group/btn relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                    asChild
                >
                    <a href={item.affiliate_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <span className="z-10 font-medium">View Product</span>
                        <ExternalLink className="w-4 h-4 z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    </a>
                </Button>
            </div>

            {/* Decorative Border Glow */}
            <div className="absolute inset-0 border border-primary/0 rounded-2xl group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
        </div>
    );
}
