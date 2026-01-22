import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Loader2,
  LogOut,
  TreePine,
  Check,
  X,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Mail,
  DollarSign,
  BookOpen
} from "lucide-react";
import { ChapterAudioUpload } from "@/components/ChapterAudioUpload";
import { ChapterManager } from "@/components/ChapterManager";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Tribute {
  id: string;
  honoree_name: string;
  dedication_message: string | null;
  honoree_photo_url: string | null;
  birth_date: string | null;
  passing_date: string | null;
  donor_name: string;
  donor_email: string;
  donation_amount: number | null;
  payment_method: string | null;
  payment_confirmed: boolean;
  is_public: boolean;
  created_at: string;
}

const Admin = () => {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/admin/auth");
      } else if (!isAdmin) {
        navigate("/admin/auth");
      } else {
        fetchTributes();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchTributes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tree_tributes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tributes:", error);
      toast({
        title: "Error",
        description: "Failed to load tributes",
        variant: "destructive",
      });
    } else {
      setTributes(data || []);
    }
    setLoading(false);
  };

  const handleConfirmPayment = async (id: string) => {
    setActionLoading(id);
    const { error } = await supabase
      .from("tree_tributes")
      .update({ payment_confirmed: true })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Confirmed",
        description: "The tribute is now visible on the memorial wall.",
      });
      fetchTributes();
    }
    setActionLoading(null);
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    setActionLoading(id);
    const { error } = await supabase
      .from("tree_tributes")
      .update({ is_public: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } else {
      toast({
        title: currentStatus ? "Hidden" : "Published",
        description: currentStatus
          ? "Tribute is now hidden from the memorial wall."
          : "Tribute is now visible on the memorial wall.",
      });
      fetchTributes();
    }
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    const { error } = await supabase
      .from("tree_tributes")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete tribute",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Tribute has been removed.",
      });
      fetchTributes();
    }
    setActionLoading(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pendingTributes = tributes.filter((t) => !t.payment_confirmed);
  const confirmedTributes = tributes.filter((t) => t.payment_confirmed);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TreePine className="w-8 h-8 text-primary" />
            <h1 className="font-serif text-xl font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Total Tributes</p>
            <p className="text-2xl font-bold text-foreground">{tributes.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Pending Payment</p>
            <p className="text-2xl font-bold text-accent">{pendingTributes.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold text-primary">{confirmedTributes.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Total Donations</p>
            <p className="text-2xl font-bold text-foreground">
              ${tributes.filter(t => t.payment_confirmed).reduce((sum, t) => sum + (t.donation_amount || 0), 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Tribute Management
          </h2>
          <Button variant="outline" size="sm" onClick={fetchTributes}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Pending Tributes */}
        {pendingTributes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Awaiting Payment Confirmation ({pendingTributes.length})
            </h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Honoree</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTributes.map((tribute) => (
                      <TableRow key={tribute.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {tribute.honoree_photo_url ? (
                              <img
                                src={tribute.honoree_photo_url}
                                alt={tribute.honoree_name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                <TreePine className="w-5 h-5 text-primary/50" />
                              </div>
                            )}
                            <span className="font-medium">{tribute.honoree_name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{tribute.donor_name}</p>
                            <a
                              href={`mailto:${tribute.donor_email}`}
                              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              {tribute.donor_email}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          {tribute.donation_amount
                            ? `$${tribute.donation_amount.toFixed(2)}`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {tribute.payment_method || "Not specified"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(tribute.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleConfirmPayment(tribute.id)}
                              disabled={actionLoading === tribute.id}
                            >
                              {actionLoading === tribute.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Confirm
                                </>
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Tribute?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the tribute for {tribute.honoree_name}.
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(tribute.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* Confirmed Tributes */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Confirmed Tributes ({confirmedTributes.length})
          </h3>
          {confirmedTributes.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <TreePine className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No confirmed tributes yet.</p>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Honoree</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {confirmedTributes.map((tribute) => (
                      <TableRow key={tribute.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {tribute.honoree_photo_url ? (
                              <img
                                src={tribute.honoree_photo_url}
                                alt={tribute.honoree_name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                <TreePine className="w-5 h-5 text-primary/50" />
                              </div>
                            )}
                            <div>
                              <span className="font-medium">{tribute.honoree_name}</span>
                              {tribute.dedication_message && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  "{tribute.dedication_message}"
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{tribute.donor_name}</TableCell>
                        <TableCell>
                          {tribute.donation_amount
                            ? `$${tribute.donation_amount.toFixed(2)}`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={tribute.is_public ? "default" : "secondary"}>
                            {tribute.is_public ? "Public" : "Hidden"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(tribute.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleVisibility(tribute.id, tribute.is_public)}
                              disabled={actionLoading === tribute.id}
                            >
                              {tribute.is_public ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Tribute?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the tribute for {tribute.honoree_name}.
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(tribute.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        {/* Chapter Audio Management */}
        <div className="mt-12 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Story Audio Management
            </h2>
          </div>
          <ChapterAudioUpload />
        </div>

        {/* Chapter Management */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <ChapterManager />
        </div>
      </main>
    </div>
  );
};

export default Admin;
