import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface AffiliateItem {
    id: string;
    title: string;
    description: string | null;
    price: string | null;
    affiliate_url: string;
    image_url: string | null;
    category: string | null;
}

export function useAffiliateItems() {
    return useQuery({
        queryKey: ["affiliate-items"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("affiliate_items")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as AffiliateItem[];
        },
    });
}

export function useCreateAffiliateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newItem: {
            title: string;
            description: string;
            price: string;
            affiliate_url: string;
            image_file?: File;
        }) => {
            let image_url = null;

            // Upload image if present
            if (newItem.image_file) {
                const fileExt = newItem.image_file.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("affiliate-images")
                    .upload(fileName, newItem.image_file);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from("affiliate-images")
                    .getPublicUrl(fileName);

                image_url = urlData.publicUrl;
            }

            // Insert into DB
            const { error } = await supabase.from("affiliate_items").insert([
                {
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    affiliate_url: newItem.affiliate_url,
                    image_url: image_url,
                },
            ]);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["affiliate-items"] });
            toast({
                title: "Item added",
                description: "New affiliate item created successfully.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}

export function useDeleteAffiliateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (itemId: string) => {
            const { error } = await supabase
                .from("affiliate_items")
                .delete()
                .eq("id", itemId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["affiliate-items"] });
            toast({
                title: "Item deleted",
                description: "Affiliate item removed.",
            });
        },
    });
}
