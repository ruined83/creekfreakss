import { TreePine, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 md:right-6 z-50">
      <Button
        onClick={onClick}
        className={cn(
          "h-14 w-14 rounded-full shadow-glow transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "group relative overflow-visible",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label={isOpen ? "Close chat with Cypress" : "Chat with Cypress"}
      >
        <div className="relative">
          <TreePine className="w-6 h-6 transition-transform group-hover:scale-110" />
          <MessageCircle className="w-3 h-3 absolute -bottom-1 -right-1 fill-current" />
        </div>
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ripple" />
      </Button>
      
      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-card text-foreground text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-border">
            Chat with Cypress
          </div>
        </div>
      )}
    </div>
  );
}