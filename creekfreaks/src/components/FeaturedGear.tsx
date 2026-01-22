import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface GearItem {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    link: string;
    rating: number;
}

const featuredGear: GearItem[] = [];

export function FeaturedGear() {
    return (
        <section className="py-24 bg-card/50">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        {/* Badge removed as requested */}
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                            What We're Throwing
                        </h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                            Our go-to gear for Toledo Bend. From punching mats to deep cranks, this is what stays on our deck.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                        All Recommended Gear <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredGear.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {item.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-xs text-muted-foreground ml-1">{item.category}</span>
                                </div>
                                <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                    Essential for the spring bite. Don't leave the launch without it.
                                </p>
                                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                                        Check Price
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
