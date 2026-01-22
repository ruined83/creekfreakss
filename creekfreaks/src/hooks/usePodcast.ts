import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface PodcastEpisode {
    id: string;
    title: string;
    description: string | null;
    audio_url: string | null;
    duration: string | null;
    published_at: string;
}

export function usePodcastEpisodes() {
    return useQuery({
        queryKey: ["podcast-episodes"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("podcast_episodes")
                .select("*")
                .order("published_at", { ascending: false });

            if (error) throw error;
            return data as PodcastEpisode[];
        },
    });
}

export function useCreateEpisode() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newEpisode: { title: string; description: string; published_at?: string }) => {
            const { error } = await supabase
                .from("podcast_episodes")
                .insert([newEpisode]);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
            toast({
                title: "Episode created",
                description: "New episode has been added successfully.",
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

export function useUploadPodcastAudio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ episodeId, file, duration }: { episodeId: string; file: File; duration: string }) => {
            const fileExt = file.name.split(".").pop();
            const fileName = `${episodeId}-${Date.now()}.${fileExt}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from("podcast-audio")
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: urlData } = supabase.storage
                .from("podcast-audio")
                .getPublicUrl(fileName);

            const audioUrl = urlData.publicUrl;

            // 3. Update Database Record
            const { error: dbError } = await supabase
                .from("podcast_episodes")
                .update({ audio_url: audioUrl, duration: duration })
                .eq("id", episodeId);

            if (dbError) throw dbError;

            return audioUrl;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
            toast({
                title: "Audio uploaded",
                description: "Podcast audio published successfully.",
            });
        },
        onError: (error) => {
            toast({
                title: "Upload failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}

export function useDeleteEpisode() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (episodeId: string) => {
            const { error } = await supabase
                .from("podcast_episodes")
                .delete()
                .eq("id", episodeId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
            toast({
                title: "Episode deleted",
                description: "The episode has been removed.",
            });
        },
    });
}
