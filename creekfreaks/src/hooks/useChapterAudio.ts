import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ChapterAudio {
  id: string;
  chapter_number: number;
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export function useChapterAudio() {
  return useQuery({
    queryKey: ["chapter-audio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapter_audio")
        .select("*")
        .order("chapter_number");

      if (error) throw error;
      return data as ChapterAudio[];
    },
  });
}

export function useUploadChapterAudio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chapterNumber,
      file,
    }: {
      chapterNumber: number;
      file: File;
    }) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `chapter-${chapterNumber}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("chapter-audio")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("chapter-audio")
        .getPublicUrl(fileName);

      const audioUrl = urlData.publicUrl;

      // Upsert database record
      const { error: dbError } = await supabase
        .from("chapter_audio")
        .upsert(
          { chapter_number: chapterNumber, audio_url: audioUrl },
          { onConflict: "chapter_number" }
        );

      if (dbError) throw dbError;

      return audioUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter-audio"] });
      toast({
        title: "Audio uploaded",
        description: "Chapter audio has been saved successfully.",
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

export function useDeleteChapterAudio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chapterNumber: number) => {
      // Delete from storage
      await supabase.storage
        .from("chapter-audio")
        .remove([`chapter-${chapterNumber}.mp3`, `chapter-${chapterNumber}.m4a`, `chapter-${chapterNumber}.wav`]);

      // Delete from database
      const { error } = await supabase
        .from("chapter_audio")
        .delete()
        .eq("chapter_number", chapterNumber);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter-audio"] });
      toast({
        title: "Audio deleted",
        description: "Chapter audio has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
