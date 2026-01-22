import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { TreePine, Heart, Plus, Upload, X, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import galleryPortrait from "@/assets/gallery-portrait.jpg";
interface Tribute {
  id: string;
  honoree_name: string;
  dedication_message: string | null;
  honoree_photo_url: string | null;
  birth_date: string | null;
  passing_date: string | null;
  donor_name: string | null;
  created_at: string | null;
}

const MemorialWall = () => {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    honoree_name: "",
    dedication_message: "",
    donor_name: "",
    donor_email: "",
    birth_date: "",
    passing_date: "",
  });

  useEffect(() => {
    fetchTributes();

    const channel = supabase
      .channel('memorial-wall-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tree_tributes',
        },
        () => {
          fetchTributes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTributes = async () => {
    const { data, error } = await supabase
      .from('public_tributes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tributes:', error);
    } else {
      setTributes(data || []);
    }
    setLoading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let photoUrl = null;

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('honoree-photos')
          .upload(fileName, photoFile);

        if (uploadError) {
          throw new Error('Failed to upload photo');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('honoree-photos')
          .getPublicUrl(fileName);

        photoUrl = publicUrl;
      }

      // Insert tribute (admin adds directly with payment confirmed)
      const { error } = await supabase.from('tree_tributes').insert({
        honoree_name: formData.honoree_name,
        dedication_message: formData.dedication_message || null,
        donor_name: formData.donor_name || "Creek Freaks",
        donor_email: formData.donor_email || "admin@creek-freaks.com",
        birth_date: formData.birth_date || null,
        passing_date: formData.passing_date || null,
        honoree_photo_url: photoUrl,
        payment_confirmed: true,
        is_public: true,
      });

      if (error) throw error;

      toast({
        title: "Tribute Added",
        description: `Memorial for ${formData.honoree_name} has been added to the wall.`,
      });

      // Reset form
      setFormData({
        honoree_name: "",
        dedication_message: "",
        donor_name: "",
        donor_email: "",
        birth_date: "",
        passing_date: "",
      });
      setPhotoFile(null);
      setPhotoPreview(null);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding tribute:', error);
      toast({
        title: "Error",
        description: "Failed to add tribute. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDates = (birthDate: string | null, passingDate: string | null) => {
    if (!birthDate && !passingDate) return null;

    const birth = birthDate ? format(new Date(birthDate), 'MMM d, yyyy') : '?';
    const passing = passingDate ? format(new Date(passingDate), 'MMM d, yyyy') : '?';

    if (birthDate && passingDate) {
      return `${birth} — ${passing}`;
    }
    if (birthDate) return `Born ${birth}`;
    if (passingDate) return `Passed ${passing}`;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Featured Memorial - Zachory */}
        <section className="py-16 bg-gradient-hero overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-creek opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-lg mx-auto">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-creek">
                <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-6">Zachory Lane Rice</h2>
                <img
                  src={galleryPortrait}
                  alt="Zachory Lane Rice"
                  className="w-full aspect-square rounded-xl object-cover border border-border mb-6"
                />
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    5/14/23<br />
                    To the greatest guy I ever knew.<br />
                    <span className="text-primary italic">The first creek freak.</span><br />
                    My fishing bud. My best friend. My son.<br />
                    I'll see you again.
                  </p>
                  <TreePine className="w-8 h-8 text-primary mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <TreePine className="w-10 h-10 text-primary" />
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Memorial Forest
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Each tree represents a life remembered and celebrated
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These tributes honor those who touched our hearts. Their memory lives on
                through the cypress trees planted in their name.
              </p>

              {/* Back to Plant a Tree */}
              <Button asChild variant="outline" className="mt-6">
                <Link to="/plant-a-tree">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Plant a Tree
                </Link>
              </Button>
              {isAdmin && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-8" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Dedication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Add Memorial Tribute</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="honoree_name">Honoree's Name *</Label>
                        <Input
                          id="honoree_name"
                          value={formData.honoree_name}
                          onChange={(e) => setFormData({ ...formData, honoree_name: e.target.value })}
                          placeholder="Name of the person being honored"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="dedication_message">Dedication Message</Label>
                        <Textarea
                          id="dedication_message"
                          value={formData.dedication_message}
                          onChange={(e) => setFormData({ ...formData, dedication_message: e.target.value })}
                          placeholder="A heartfelt message in their memory..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="birth_date">Birth Date</Label>
                          <Input
                            id="birth_date"
                            type="date"
                            value={formData.birth_date}
                            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="passing_date">Passing Date</Label>
                          <Input
                            id="passing_date"
                            type="date"
                            value={formData.passing_date}
                            onChange={(e) => setFormData({ ...formData, passing_date: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="donor_name">Planted By</Label>
                        <Input
                          id="donor_name"
                          value={formData.donor_name}
                          onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                          placeholder="Name of the person dedicating"
                        />
                      </div>

                      <div>
                        <Label htmlFor="donor_email">Email (for records)</Label>
                        <Input
                          id="donor_email"
                          type="email"
                          value={formData.donor_email}
                          onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                          placeholder="admin@creek-freaks.com"
                        />
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <Label>Photo (optional)</Label>
                        <div className="mt-2">
                          {photoPreview ? (
                            <div className="relative inline-block">
                              <img
                                src={photoPreview}
                                alt="Preview"
                                className="w-24 h-24 rounded-xl object-cover border border-border"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setPhotoFile(null);
                                  setPhotoPreview(null);
                                }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                              <Upload className="w-5 h-5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Upload photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Adding..." : "Add to Memorial Wall"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </section>

        {/* Tributes Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <TreePine className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Loading tributes...</p>
                </div>
              </div>
            ) : tributes.length === 0 ? (
              <div className="text-center py-12">
                <TreePine className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No tributes yet. Be the first to plant a tree in memory of a loved one.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {tributes.map((tribute) => (
                  <div
                    key={tribute.id}
                    className="bg-background rounded-2xl p-6 border border-border shadow-soft hover:shadow-creek transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {tribute.honoree_photo_url ? (
                        <img
                          src={tribute.honoree_photo_url}
                          alt={tribute.honoree_name || "Memorial"}
                          className="w-20 h-20 rounded-xl object-cover border border-border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center">
                          <TreePine className="w-10 h-10 text-primary/50" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-xl font-semibold text-foreground truncate">
                          {tribute.honoree_name}
                        </h3>
                        {formatDates(tribute.birth_date, tribute.passing_date) && (
                          <p className="text-sm text-muted-foreground">
                            {formatDates(tribute.birth_date, tribute.passing_date)}
                          </p>
                        )}
                      </div>
                    </div>

                    {tribute.dedication_message && (
                      <p className="mt-4 text-foreground/90 italic leading-relaxed">
                        "{tribute.dedication_message}"
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Planted by {tribute.donor_name || "Anonymous"}
                      </p>
                      <TreePine className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MemorialWall;
