import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp } from "lucide-react";

export function ProgressSection() {
  // These would be dynamic values from your backend
  const raised = 0;
  const goal = 10000;
  const percentage = 0;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Memorial Fund Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  Help us reach our goal
                </p>
              </div>
            </div>

            <div className="mb-4">
              <Progress value={percentage} className="h-4" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ${raised.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  raised of ${goal.toLocaleString()} goal
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">{percentage}%</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Every purchase brings us closer to building a lasting memorial monument
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}