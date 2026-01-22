import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Chapter {
    id: string;
    chapter_number: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export function useChapters() {
    return useQuery({
        queryKey: ["chapters"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("chapters")
                .select("*")
                .order("chapter_number");

            if (error) throw error;
            return data as Chapter[];
        },
    });
}

export function useCreateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (chapter: {
            chapter_number: number;
            title: string;
            content: string;
        }) => {
            const { data, error } = await supabase
                .from("chapters")
                .insert(chapter)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
            toast({
                title: "Chapter created",
                description: "Your chapter has been saved successfully.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Failed to create chapter",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}

export function useUpdateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            ...updates
        }: {
            id: string;
            chapter_number?: number;
            title?: string;
            content?: string;
        }) => {
            const { data, error } = await supabase
                .from("chapters")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
            toast({
                title: "Chapter updated",
                description: "Your changes have been saved.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Failed to update chapter",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}

export function useDeleteChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("chapters").delete().eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
            toast({
                title: "Chapter deleted",
                description: "The chapter has been removed.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Failed to delete chapter",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}
