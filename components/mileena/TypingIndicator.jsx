
import React from 'react';

export default function TypingIndicator() {
    return (
        <div className="flex gap-2 p-4 rounded-xl backdrop-blur-sm border mileena-glass bg-red-900/10 border-red-500/20 w-fit items-center">
            <span className="sr-only">Typing...</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
        </div>
    );
}
