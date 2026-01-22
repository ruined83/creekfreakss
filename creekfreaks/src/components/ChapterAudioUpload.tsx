
import { useState, useRef } from "react";
import { Upload, Trash2, Loader2, Music, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChapterAudio, useUploadChapterAudio, useDeleteChapterAudio } from "@/hooks/useChapterAudio";
import { useChapters } from "@/hooks/useChapters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ChapterAudioUpload() {
  const { data: chaptersData } = useChapters();
  const chapters = chaptersData || [];
  const { data: audioData, isLoading } = useChapterAudio();
  const uploadMutation = useUploadChapterAudio();
  const deleteMutation = useDeleteChapterAudio();
  const [uploadingChapter, setUploadingChapter] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const getAudioForChapter = (chapterNumber: number) => {
    return audioData?.find((a) => a.chapter_number === chapterNumber);
  };

  const handleFileSelect = async (chapterNumber: number, file: File) => {
    if (!file) return;

    const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/m4a", "audio/x-m4a"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload an MP3, WAV, or M4A file");
      return;
    }

    setUploadingChapter(chapterNumber);
    try {
      await uploadMutation.mutateAsync({ chapterNumber, file });
    } finally {
      setUploadingChapter(null);
    }
  };

  const handleDelete = async (chapterNumber: number) => {
    await deleteMutation.mutateAsync(chapterNumber);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Chapter Audio</h3>
      </div>

      <div className="grid gap-3">
        {chapters.map((chapter) => {
          const title = chapter.title;
          const chapterNumber = chapter.chapter_number;
          const audio = getAudioForChapter(chapterNumber);
          const isUploading = uploadingChapter === chapterNumber;

          return (
            <div
              key={chapter.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${audio ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                  {audio ? <Check className="w-4 h-4" /> : chapterNumber}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Chapter {chapterNumber}: {title}
                  </p>
                  {audio && (
                    <p className="text-xs text-muted-foreground">Audio uploaded</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  ref={(el) => (fileInputRefs.current[chapterNumber] = el)}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(chapterNumber, file);
                  }}
                />

                <Button
                  size="sm"
                  variant={audio ? "outline" : "default"}
                  onClick={() => fileInputRefs.current[chapterNumber]?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-1" />
                      {audio ? "Replace" : "Upload"}
                    </>
                  )}
                </Button>

                {audio && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Audio?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove the audio for Chapter {chapterNumber}. You can upload a new file anytime.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(chapterNumber)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
