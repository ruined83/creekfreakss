import { useState, useCallback } from "react";

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cypress-tts`;

export function useCypressTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, voiceId?: string) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
      setCurrentAudio(null);
    }

    if (!text.trim()) return;

    setIsPlaying(true);

    try {
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text, voiceId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate speech");
      }

      const data = await response.json();
      
      if (!data.audioContent) {
        throw new Error("No audio content received");
      }

      // Use data URI for playback
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        console.error("Audio playback error");
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      await audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      setIsPlaying(false);
      throw error;
    }
  }, [currentAudio]);

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  }, [currentAudio]);

  return {
    speak,
    stop,
    isPlaying,
  };
}
