import { cn } from "@/lib/utils";
import type { Message } from "@/hooks/useCypressChat";
import { TreePine, User, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
}

export function ChatMessage({ message, onSpeak, isSpeaking, onStopSpeaking }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-up",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isAssistant
            ? "bg-creek-moss/20 text-creek-moss"
            : "bg-accent/20 text-accent"
        )}
      >
        {isAssistant ? (
          <TreePine className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAssistant
            ? "bg-muted text-foreground rounded-tl-md"
            : "bg-accent text-accent-foreground rounded-tr-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        {isAssistant && message.content && onSpeak && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => isSpeaking ? onStopSpeaking?.() : onSpeak(message.content)}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3 h-3 mr-1" />
                  Stop
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 mr-1" />
                  Listen
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
