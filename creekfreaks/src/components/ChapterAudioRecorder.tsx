import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Upload, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadChapterAudio } from "@/hooks/useChapterAudio";
import { toast } from "@/hooks/use-toast";

interface ChapterAudioRecorderProps {
    chapterNumber: number;
    chapterTitle: string;
    onUploadComplete?: () => void;
}

export function ChapterAudioRecorder({
    chapterNumber,
    chapterTitle,
    onUploadComplete,
}: ChapterAudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [previewTime, setPreviewTime] = useState(0);
    const [previewDuration, setPreviewDuration] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const previewAudioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const uploadMutation = useUploadChapterAudio();

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (previewAudioRef.current) {
                previewAudioRef.current.pause();
                previewAudioRef.current = null;
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported("audio/webm")
                    ? "audio/webm"
                    : "audio/mp4",
            });

            audioChunksRef.current = [];
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, {
                    type: mediaRecorder.mimeType,
                });
                setRecordedBlob(blob);
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (error) {
            toast({
                title: "Recording failed",
                description: "Could not access microphone. Please check permissions.",
                variant: "destructive",
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const togglePreview = () => {
        if (!recordedBlob) return;

        if (!previewAudioRef.current) {
            const audio = new Audio(URL.createObjectURL(recordedBlob));
            previewAudioRef.current = audio;

            audio.addEventListener("loadedmetadata", () => {
                setPreviewDuration(audio.duration);
            });

            audio.addEventListener("timeupdate", () => {
                setPreviewTime(audio.currentTime);
            });

            audio.addEventListener("ended", () => {
                setIsPreviewing(false);
                setPreviewTime(0);
            });
        }

        if (isPreviewing) {
            previewAudioRef.current.pause();
            setIsPreviewing(false);
        } else {
            previewAudioRef.current.play();
            setIsPreviewing(true);
        }
    };

    const handleUpload = async () => {
        if (!recordedBlob) return;

        const fileExtension = recordedBlob.type.includes("webm") ? "webm" : "mp4";
        const file = new File(
            [recordedBlob],
            `chapter-${chapterNumber}.${fileExtension}`,
            { type: recordedBlob.type }
        );

        try {
            await uploadMutation.mutateAsync({ chapterNumber, file });
            handleDiscard();
            onUploadComplete?.();
        } catch (error) {
            // Error handled by mutation
        }
    };

    const handleDiscard = () => {
        if (previewAudioRef.current) {
            previewAudioRef.current.pause();
            previewAudioRef.current = null;
        }
        setRecordedBlob(null);
        setIsPreviewing(false);
        setPreviewTime(0);
        setPreviewDuration(0);
        setRecordingTime(0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                    Record {chapterTitle}
                </span>
            </div>

            {!recordedBlob ? (
                <div className="flex items-center gap-3">
                    {!isRecording ? (
                        <Button
                            onClick={startRecording}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Mic className="w-4 h-4 mr-2" />
                            Start Recording
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={stopRecording}
                                variant="destructive"
                                className="animate-pulse"
                            >
                                <Square className="w-4 h-4 mr-2" />
                                Stop Recording
                            </Button>
                            <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-md border border-border">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-sm font-mono text-muted-foreground">
                                    {formatTime(recordingTime)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={togglePreview}
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                        >
                            {isPreviewing ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4 ml-0.5" />
                            )}
                        </Button>

                        <div className="flex-1 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                                {formatTime(previewTime)}
                            </span>
                            <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all"
                                    style={{
                                        width: `${(previewTime / previewDuration) * 100 || 0}%`,
                                    }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {formatTime(previewDuration)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={handleUpload}
                            disabled={uploadMutation.isPending}
                            className="flex-1 bg-primary hover:bg-primary/90"
                        >
                            {uploadMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4 mr-2" />
                            )}
                            Upload Recording
                        </Button>
                        <Button
                            onClick={handleDiscard}
                            variant="outline"
                            disabled={uploadMutation.isPending}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Discard
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
