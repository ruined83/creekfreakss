import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            // Attempt to insert into the table. 
            // Note: This requires the 'newsletter_subscriptions' table to exist in Supabase.
            const { error } = await supabase
                .from("newsletter_subscriptions")
                .insert([{ email }]);

            if (error) {
                // If the table doesn't exist or RLS fails, we'll catch it here.
                // For now, we'll log it but still show a somewhat friendly "we'll get you on the list" message 
                // if it's a 404 (table not found) to not discourage the user during launch,
                // OR strictly fail. 
                // Better to be honest:
                console.error("Newsletter error:", error);
                if (error.code === "42P01") { // undefined_table
                    toast({
                        title: "System Update Needed",
                        description: "The newsletter list isn't set up yet. (Admin: Create 'newsletter_subscriptions' table)",
                        variant: "destructive",
                    });
                } else {
                    throw error;
                }
                return;
            }

            toast({
                title: "Welcome to the Creek!",
                description: "You've been added to The Tackle Box newsletter.",
            });
            setEmail("");
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-2" onSubmit={handleSubscribe}>
            <div className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    required
                    className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium disabled:opacity-50"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
                </button>
            </div>
            <p className="text-[10px] text-muted-foreground opacity-70">
                Join 1,000+ Creek Freaks.
            </p>
        </form>
    );
}
