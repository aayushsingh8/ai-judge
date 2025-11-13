import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { TimelineEntry, Language } from "@/pages/Index";

interface VerdictTimelineProps {
  timeline: TimelineEntry[];
  language: Language;
}

export const VerdictTimeline = ({ timeline, language }: VerdictTimelineProps) => {
  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50 shadow-card animate-slide-up">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-glow" />
        {language === "en" ? "Verdict Evolution Timeline" : "फैसले का विकास समयरेखा"}
      </h2>

      <div className="space-y-4">
        {timeline.map((entry, idx) => (
          <div key={idx} className="relative pl-8 pb-6 last:pb-0">
            {/* Timeline line */}
            {idx < timeline.length - 1 && (
              <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-purple-glow to-transparent" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-purple-glow to-primary shadow-glow" />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-purple-glow/50 text-purple-glow">
                  {entry.round === 0 
                    ? (language === "en" ? "Initial" : "प्रारंभिक")
                    : `${language === "en" ? "Round" : "दौर"} ${entry.round}`
                  }
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {entry.timestamp.toLocaleTimeString()}
                </span>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg border border-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {language === "en" ? "Confidence:" : "विश्वास:"}
                  </span>
                  <span className="text-sm text-purple-glow font-bold">
                    {entry.verdict.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {language === "en" ? "Bias:" : "पूर्वाग्रह:"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {entry.verdict.bias}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-border/30">
                  {entry.verdict.verdict}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
