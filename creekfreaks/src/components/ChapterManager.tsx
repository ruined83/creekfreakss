import { useState } from "react";
import { Plus, Edit, Trash2, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    useChapters,
    useCreateChapter,
    useUpdateChapter,
    useDeleteChapter,
} from "@/hooks/useChapters";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ChapterFormData {
    chapter_number: number;
    title: string;
    content: string;
}

export function ChapterManager() {
    const { data: chapters, isLoading } = useChapters();
    const createMutation = useCreateChapter();
    const updateMutation = useUpdateChapter();
    const deleteMutation = useDeleteChapter();

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingChapter, setEditingChapter] = useState<any>(null);
    const [deletingChapterId, setDeletingChapterId] = useState<string | null>(null);

    const [formData, setFormData] = useState<ChapterFormData>({
        chapter_number: 1,
        title: "",
        content: "",
    });

    const handleCreate = async () => {
        await createMutation.mutateAsync(formData);
        setIsCreateDialogOpen(false);
        setFormData({ chapter_number: 1, title: "", content: "" });
    };

    const handleUpdate = async () => {
        if (!editingChapter) return;
        await updateMutation.mutateAsync({
            id: editingChapter.id,
            ...formData,
        });
        setEditingChapter(null);
        setFormData({ chapter_number: 1, title: "", content: "" });
    };

    const handleDelete = async () => {
        if (!deletingChapterId) return;
        await deleteMutation.mutateAsync(deletingChapterId);
        setDeletingChapterId(null);
    };

    const openEditDialog = (chapter: any) => {
        setEditingChapter(chapter);
        setFormData({
            chapter_number: chapter.chapter_number,
            title: chapter.title,
            content: chapter.content,
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-serif font-bold text-foreground">
                        Chapter Management
                    </h2>
                </div>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Chapter
                </Button>
            </div>

            {chapters && chapters.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                        No chapters yet. Create your first chapter to get started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {chapters?.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="bg-card rounded-lg border border-border p-6"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="text-primary font-serif font-bold">
                                                {chapter.chapter_number}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-xl font-semibold text-foreground">
                                            {chapter.title}
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-3">
                                        {chapter.content.substring(0, 200)}...
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => openEditDialog(chapter)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeletingChapterId(chapter.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Dialog */}
            <Dialog
                open={isCreateDialogOpen || !!editingChapter}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsCreateDialogOpen(false);
                        setEditingChapter(null);
                        setFormData({ chapter_number: 1, title: "", content: "" });
                    }
                }}
            >
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingChapter ? "Edit Chapter" : "Create New Chapter"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingChapter
                                ? "Make changes to your chapter below."
                                : "Add a new chapter to your story."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                                Chapter Number
                            </label>
                            <Input
                                type="number"
                                value={formData.chapter_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        chapter_number: parseInt(e.target.value),
                                    })
                                }
                                min={1}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                                Title
                            </label>
                            <Input
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder="Chapter title..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                                Content
                            </label>
                            <Textarea
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({ ...formData, content: e.target.value })
                                }
                                placeholder="Write your chapter content here..."
                                rows={15}
                                className="font-serif"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsCreateDialogOpen(false);
                                setEditingChapter(null);
                                setFormData({ chapter_number: 1, title: "", content: "" });
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={editingChapter ? handleUpdate : handleCreate}
                            disabled={
                                createMutation.isPending || updateMutation.isPending
                            }
                        >
                            {createMutation.isPending || updateMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : null}
                            {editingChapter ? "Save Changes" : "Create Chapter"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
                open={!!deletingChapterId}
                onOpenChange={(open) => !open && setDeletingChapterId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chapter?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this chapter. This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
