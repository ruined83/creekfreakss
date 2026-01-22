import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Wrench,
  PlayCircle,
  Camera,
  MessageCircle,
  Heart,
  Calendar,
  ChevronRight,
  ImageIcon
} from "lucide-react";
import chargerStartImage from "@/assets/charger-start.jpg";

// Placeholder data - will be replaced with database content
const buildUpdates = [
  {
    id: 1,
    title: "Day 1: The Vision",
    date: "Coming Soon",
    type: "video",
    thumbnail: null,
    description: "Introducing Zachory's 2007 Dodge Charger and the journey ahead. Right now she doesn't run, but we're about to change that.",
    status: "upcoming"
  }
];

const buildPhotos = [
  {
    id: 1,
    src: chargerStartImage,
    caption: "Where it all begins - Zachory's 2007 Dodge Charger",
    date: "Day 1"
  }
];

const projectStats = {
  currentStatus: "Not Running",
  targetGoal: "Full Restoration & Performance Build",
  startDate: "Coming Soon",
  model: "2007 Dodge Charger"
};

export default function ChargerProject() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Array<{ name: string; message: string; date: string }>>([]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setComments([
        { name, message, date: new Date().toLocaleDateString() },
        ...comments
      ]);
      setName("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
                <Car className="w-4 h-4 mr-2" />
                Memorial Build Project
              </Badge>

              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                Zachory's <span className="text-primary">Charger</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A 2007 Dodge Charger that belonged to Zachory. Follow along as we bring it back to life
                and build it into something he would have been proud of.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Latest Episode
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <Heart className="mr-2 h-5 w-5" />
                  Support the Build
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Stats */}
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Car className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-semibold text-foreground">{projectStats.model}</p>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-creek-sunset" />
                <p className="text-sm text-muted-foreground">Current Status</p>
                <p className="font-semibold text-foreground">{projectStats.currentStatus}</p>
              </div>
              <div className="text-center">
                <ChevronRight className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Goal</p>
                <p className="font-semibold text-foreground">Full Restoration</p>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-creek-sunset" />
                <p className="text-sm text-muted-foreground">Build Started</p>
                <p className="font-semibold text-foreground">{projectStats.startDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Build Episodes */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Build <span className="text-primary">Episodes</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every step of the journey documented. From diagnosis to completion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {buildUpdates.map((update) => (
                <Card key={update.id} className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-secondary/50 flex items-center justify-center relative">
                    {update.thumbnail ? (
                      <img src={update.thumbnail} alt={update.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <PlayCircle className="w-12 h-12 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground">Coming Soon</span>
                      </div>
                    )}
                    {update.status === "upcoming" && (
                      <Badge className="absolute top-3 right-3 bg-creek-sunset text-white">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </div>
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <CardDescription>{update.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}

              {/* Placeholder for future episodes */}
              <Card className="bg-card/50 border-dashed border-2 border-border flex items-center justify-center min-h-[300px]">
                <div className="text-center p-6">
                  <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">More episodes coming as the build progresses</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Build Photo Gallery */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                <ImageIcon className="inline-block w-8 h-8 mr-3 text-primary" />
                Build <span className="text-primary">Gallery</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Photos from every stage of the restoration journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {buildPhotos.map((photo) => (
                <Card key={photo.id} className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/80 text-foreground">
                      {photo.date}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground text-sm">{photo.caption}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Placeholder for more photos */}
              <Card className="bg-card/50 border-dashed border-2 border-border flex items-center justify-center min-h-[250px]">
                <div className="text-center p-6">
                  <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">More photos coming soon</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  <MessageCircle className="inline-block w-8 h-8 mr-3 text-primary" />
                  Share Your <span className="text-primary">Advice</span>
                </h2>
                <p className="text-muted-foreground">
                  Got tips for the build? Words of encouragement? Drop a message below.
                </p>
              </div>

              {/* Comment Form */}
              <Card className="bg-card border-border mb-8">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background"
                    />
                    <Textarea
                      placeholder="Share your advice, encouragement, or car tips..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="bg-background"
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Post Comment
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Comments Display */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <Card className="bg-card/50 border-border">
                    <CardContent className="py-12 text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Be the first to leave a comment!</p>
                    </CardContent>
                  </Card>
                ) : (
                  comments.map((comment, index) => (
                    <Card key={index} className="bg-card border-border">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold">
                              {comment.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{comment.name}</span>
                              <span className="text-sm text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-muted-foreground">{comment.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-creek-sunset/10 border-primary/20">
              <CardContent className="pt-8 pb-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-creek-sunset" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Support the Build
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Every contribution helps get this Charger back on the road.
                  Parts, tools, and time all add up.
                </p>
                <Button size="lg" className="bg-creek-sunset hover:bg-creek-sunset/90 text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate to the Build
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />

    </div>
  );
}
