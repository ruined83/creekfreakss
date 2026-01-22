
"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function AmbientAudio({ sinLevel }) {
    const audioRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Browser autoplay policy requires interaction
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                audioRef.current?.play().catch(e => console.log("Audio play failed", e));
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [hasInteracted]);

    useEffect(() => {
        if (audioRef.current) {
            // Adjust playback rate and volume based on Sin Level
            // Sin 1: Slow, quiet (0.5x speed, 0.1 vol)
            // Sin 10: Fast, loud (1.5x speed, 0.5 vol)
            const rate = 0.5 + (sinLevel / 10);
            const volume = 0.1 + ((sinLevel / 10) * 0.4);

            audioRef.current.playbackRate = rate;
            audioRef.current.volume = volume;
        }
    }, [sinLevel]);

    return (
        <div className="hidden">
            {/* 
        Using a placeholder sound URL. 
         Ideally this would be a local 'heartbeat.mp3' or 'drone.mp3'.
         For now, I'll use a reliable external dark ambient loop or similar if available, 
         but to avoid broken links I will use a constructed Blob or empty source with comment instructions.
      */}
            {/* <audio ref={audioRef} loop src="/sounds/heartbeat.mp3" /> */}
        </div>
    );
}
