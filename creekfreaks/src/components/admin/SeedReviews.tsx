import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { reviewsData } from "@/data/reviews-data";
import { toast } from "@/hooks/use-toast";
import { Loader2, Database } from "lucide-react";

export function SeedReviews() {
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        if (!confirm("Are you sure you want to seed the database with 20 reviews? This might create duplicates if run twice.")) return;

        setLoading(true);
        try {
            let successCount = 0;
            let errorCount = 0;

            for (const item of reviewsData) {
                const { error } = await supabase.from("affiliate_items").insert([
                    {
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        affiliate_url: item.affiliate_url,
                        image_url: item.image_url,
                        category: item.category,
                    },
                ]);

                if (error) {
                    console.error("Error inserting item:", item.title, error);
                    errorCount++;
                } else {
                    successCount++;
                }
            }

            toast({
                title: "Seeding Complete",
                description: `Successfully added ${successCount} items. Failed: ${errorCount}.`,
                variant: errorCount > 0 ? "destructive" : "default",
            });
        } catch (error) {
            console.error("Seeding error:", error);
            toast({
                title: "Seeding Failed",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                onClick={handleSeed}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-xl"
            >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
                Seed Reviews
            </Button>
        </div>
    );
}
