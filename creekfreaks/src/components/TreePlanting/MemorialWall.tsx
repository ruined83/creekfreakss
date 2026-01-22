import { useState, useEffect } from "react";
import { format } from "date-fns";
import { TreePine, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Tribute {
  id: string;
  honoree_name: string;
  dedication_message: string | null;
  honoree_photo_url: string | null;
  birth_date: string | null;
  passing_date: string | null;
  donor_name: string;
  created_at: string;
}

export function MemorialWall() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTributes();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('tributes-channel')
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
    // Query the secure public_tributes view which excludes sensitive data (email, payment info)
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
    <section className="py-16 bg-card" id="memorial-wall">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TreePine className="w-8 h-8 text-primary" />
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Memorial Forest
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each tree represents a life remembered and celebrated. 
            These tributes honor those who touched our hearts.
          </p>
        </div>

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
              Be the first to plant a tree in memory of a loved one.
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
                      alt={tribute.honoree_name}
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
                    Planted by {tribute.donor_name}
                  </p>
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
