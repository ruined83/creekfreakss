import { useState, useRef, useEffect } from "react";
import { X, Send, TreePine, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { useCypressChat } from "@/hooks/useCypressChat";
import { useCypressTTS } from "@/hooks/useCypressTTS";
import { useToast } from "@/hooks/use-toast";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  const { messages, isLoading, error, sendMessage, clearMessages } = useCypressChat();
  const { speak, stop, isPlaying } = useCypressTTS();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset speaking state when audio stops
  useEffect(() => {
    if (!isPlaying) {
      setSpeakingMessageIndex(null);
    }
  }, [isPlaying]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleSpeak = async (text: string, index: number) => {
    try {
      setSpeakingMessageIndex(index);
      await speak(text);
    } catch (err) {
      toast({
        title: "Voice unavailable",
        description: err instanceof Error ? err.message : "Could not play audio",
        variant: "destructive",
      });
      setSpeakingMessageIndex(null);
    }
  };

  const handleStopSpeaking = () => {
    stop();
    setSpeakingMessageIndex(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[70vh] bg-card rounded-2xl shadow-creek border border-border flex flex-col overflow-hidden z-50 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <TreePine className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Cypress</h3>
            <p className="text-xs opacity-80">Here to listen</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={clearMessages}
            title="Start new conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TreePine className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground font-medium mb-2">
                Hey there, I'm Cypress
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm here whenever you need to talk—about what's weighing on you,
                or maybe just to take a breath together. What's on your mind?
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <ChatMessage 
              key={i} 
              message={msg}
              onSpeak={(text) => handleSpeak(text, i)}
              isSpeaking={speakingMessageIndex === i && isPlaying}
              onStopSpeaking={handleStopSpeaking}
            />
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <TreePine className="w-4 h-4" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Error message */}
      {error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-secondary text-center">
        <p className="text-xs text-muted-foreground">
          Cypress offers peer support, not professional therapy.{" "}
          <span className="font-medium text-accent">In crisis? Call 988</span>
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-secondary border-border"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
