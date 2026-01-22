'use client';

import { useState, useEffect } from 'react';

export function useMileenaMode() {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const stored = localStorage.getItem('mileena_premium_mode');
        if (stored === 'true') {
            setIsPremium(true);
        }
        setIsLoaded(true);
    }, []);

    const togglePremium = () => {
        const newValue = !isPremium;
        setIsPremium(newValue);
        localStorage.setItem('mileena_premium_mode', newValue.toString());
    };

    return { isPremium, togglePremium, isLoaded };
}
