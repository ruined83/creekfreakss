import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEpisode } from "@/hooks/usePodcast";

export function AddEpisodeDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const createMutation = useCreateEpisode();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        try {
            await createMutation.mutateAsync({
                title,
                description,
                published_at: new Date().toISOString(),
            });
            setOpen(false);
            setTitle("");
            setDescription("");
        } catch (error) {
            // Error handled by hook
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    New Episode
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Episode</DialogTitle>
                    <DialogDescription>
                        Create a placeholder for your new episode, then you can record audio.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Episode Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. The Sound of Rain"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief summary of the episode..."
                            rows={3}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Creating..." : "Create Episode"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
