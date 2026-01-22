import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mic, Play, Clock, Headphones, Bell, Loader2, Trash2 } from "lucide-react";
import { usePodcastEpisodes, useDeleteEpisode } from "@/hooks/usePodcast";
import { useAuth } from "@/hooks/useAuth";
import { AddEpisodeDialog } from "@/components/AddEpisodeDialog";
import { PodcastAudioRecorder } from "@/components/PodcastAudioRecorder";
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

const Podcast = () => {
  const { data: episodes, isLoading } = usePodcastEpisodes();
  const { isAdmin } = useAuth();
  const deleteMutation = useDeleteEpisode();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-16 mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-10 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-creek-water/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Headphones className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Listen & Reflect
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                The <span className="text-primary">Creek Freaks</span> Podcast
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Stories of resilience, healing, and the quiet wisdom found in nature's embrace.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Podcast Cover */}
          <div className="max-w-md mx-auto mb-16">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-creek-water overflow-hidden shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <div className="w-24 h-24 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <Mic className="w-12 h-12 opacity-90" />
                  </div>
                  <h2 className="font-serif text-4xl font-bold mb-2">Creek Freaks</h2>
                  <p className="text-lg opacity-80">Podcast</p>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  All Episodes
                </h2>
              </div>
              {isAdmin && <AddEpisodeDialog />}
            </div>

            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && (!episodes || episodes.length === 0) && (
              <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No episodes yet. Stay tuned!</p>
              </div>
            )}

            <div className="space-y-6">
              {episodes?.map((episode, index) => (
                <div
                  key={episode.id}
                  className="group relative bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-serif font-bold text-lg">{episodes.length - index}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {episode.title}
                        </h3>
                        {isAdmin && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Episode?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{episode.title}" and its audio.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(episode.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {episode.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{episode.duration || "Coming Soon"}</span>
                        </div>
                        <span className="text-muted-foreground px-2">•</span>
                        <span className="text-muted-foreground">{new Date(episode.published_at).toLocaleDateString()}</span>
                      </div>

                      {/* Audio Player for Everyone */}
                      {episode.audio_url && (
                        <audio controls className="w-full mt-2 h-10">
                          <source src={episode.audio_url} type="audio/webm" />
                          <source src={episode.audio_url} type="audio/mp4" />
                          <source src={episode.audio_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}

                      {/* Admin Recorder */}
                      {isAdmin && (
                        <div className="mt-4 border-t pt-4">
                          <PodcastAudioRecorder
                            episodeId={episode.id}
                            episodeTitle={episode.title}
                            existingAudioUrl={episode.audio_url}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe Notice */}
            <div className="relative mt-12 bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-10 border border-border text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  Subscribe for Updates
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Be the first to know when new episodes drop. We're recording and will launch soon!
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Notified
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Podcast;
