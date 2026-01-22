import { Waves, Heart, Users, Mic } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "The creek listens when the world is too loud",
    description: "There's something about water that speaks to the soul. We believe in the therapeutic power of creeks, rivers, and the quiet moments they offer.",
  },
  {
    icon: Users,
    title: "Raw stories. Real ripples.",
    description: "Share your journey, read others' experiences, and find connection with those who understand the healing power of nature.",
  },
  {
    icon: Heart,
    title: "Join the stream. Share the journey.",
    description: "Every purchase supports a memorial monument and mental health awareness. Your support helps keep memories alive.",
  },
  {
    icon: Mic,
    title: "Casting for Sanity",
    description: "Through our podcast and blog, we share raw, honest stories of struggle, survival, and finding peace in unexpected places.",
  },
];

export function MissionSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why <span className="text-primary">Creek</span> <span className="text-creek-sunset">Freaks</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Born from loss, built on hope. Creek Freaks is more than a brand—it's a movement
            for those who find solace in nature and strength in sharing their stories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-secondary border border-border hover:border-primary/30 hover:shadow-creek transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}