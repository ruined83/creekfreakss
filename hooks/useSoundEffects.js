import { useCallback } from 'react';

export default function useSoundEffects() {
    const playTone = useCallback((freq = 440, type = 'sine', duration = 0.1) => {
        if (typeof window === 'undefined') return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.error("Audio error", e);
        }
    }, []);

    const playHover = useCallback(() => {
        playTone(800, 'sine', 0.05);
    }, [playTone]);

    const playClick = useCallback(() => {
        playTone(300, 'triangle', 0.1);
    }, [playTone]);

    const playMessage = useCallback(() => {
        playTone(600, 'sine', 0.2);
        setTimeout(() => playTone(800, 'sine', 0.4), 100);
    }, [playTone]);

    return { playHover, playClick, playMessage };
}
