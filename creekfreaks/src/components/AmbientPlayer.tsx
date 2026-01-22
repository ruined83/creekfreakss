import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, CloudRain, TentTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Using reliable placeholder sounds (or replace with local assets later)
const SOUNDS = {
    river: "https://actions.google.com/sounds/v1/water/river_stream.ogg",
    forest: "https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg"
};

export function AmbientPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeSound, setActiveSound] = useState<"river" | "forest">("river");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
            setIsPlaying(true);
        }
    };

    const changeSound = (sound: "river" | "forest") => {
        setActiveSound(sound);
        if (audioRef.current) {
            audioRef.current.src = SOUNDS[sound];
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
            {/* Helper text calling out the feature initially */}
            {!isPlaying && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-700 bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-xs font-medium shadow-md mb-2 mr-2 arrow-bottom-right hidden md:block">
                    Try ambient sounds 🎧
                </div>
            )}

            <div className="flex gap-2 backdrop-blur-md bg-background/80 border border-border p-2 rounded-full shadow-lg transition-all hover:bg-background">
                <audio ref={audioRef} src={SOUNDS.river} loop />

                {isPlaying && (
                    <div className="flex gap-1 animate-in slide-in-from-right-4 fade-in duration-300 mr-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant={activeSound === "river" ? "default" : "ghost"}
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => changeSound("river")}
                                    >
                                        <CloudRain className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>River Stream</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant={activeSound === "forest" ? "default" : "ghost"}
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => changeSound("forest")}
                                    >
                                        <TentTree className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Forest Morning</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}

                <Button
                    onClick={togglePlay}
                    size="icon"
                    variant={isPlaying ? "default" : "outline"}
                    className={`rounded-full h-10 w-10 ${isPlaying ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                    {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    );
}
