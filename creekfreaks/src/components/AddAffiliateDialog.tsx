import { useState } from "react";
import { Plus, Loader2, Upload } from "lucide-react";
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
import { useCreateAffiliateItem } from "@/hooks/useAffiliates";

export function AddAffiliateDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [affiliateUrl, setAffiliateUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const createMutation = useCreateAffiliateItem();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !affiliateUrl) return;

        try {
            await createMutation.mutateAsync({
                title,
                description,
                price,
                affiliate_url: affiliateUrl,
                image_file: imageFile || undefined,
            });
            setOpen(false);
            resetForm();
        } catch (error) {
            // Error handled by hook
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setAffiliateUrl("");
        setImageFile(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    Add Item
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Affiliate Item</DialogTitle>
                    <DialogDescription>
                        Add a product you recommend.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Product Name</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Product Image</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (Display text)</Label>
                            <Input
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="$29.99"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">Affiliate Link</Label>
                            <Input
                                id="url"
                                value={affiliateUrl}
                                onChange={(e) => setAffiliateUrl(e.target.value)}
                                placeholder="https://amzn.to/..."
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                "Add Item"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
