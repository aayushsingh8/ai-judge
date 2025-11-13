import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";
import type { Language } from "@/pages/Index";

interface ArgumentScoresProps {
  scores: {
    clarity: number;
    evidence: number;
    strength: string;
  };
  language: Language;
}

export const ArgumentScores = ({ scores, language }: ArgumentScoresProps) => {
  const getStrengthColor = (strength: string) => {
    if (strength.toLowerCase().includes("strong")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (strength.toLowerCase().includes("medium")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <Card className="p-4 bg-muted/20 border-border/30">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Award className="w-4 h-4 text-gold-justice" />
        {language === "en" ? "Argument Quality" : "तर्क गुणवत्ता"}
      </h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {language === "en" ? "Clarity" : "स्पष्टता"}
            </span>
            <span className="font-medium text-foreground">{scores.clarity}/10</span>
          </div>
          <Progress value={scores.clarity * 10} className="h-1.5" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {language === "en" ? "Evidence Support" : "साक्ष्य समर्थन"}
            </span>
            <span className="font-medium text-foreground">{scores.evidence}/10</span>
          </div>
          <Progress value={scores.evidence * 10} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            {language === "en" ? "Overall Strength" : "समग्र शक्ति"}
          </span>
          <Badge className={getStrengthColor(scores.strength)}>
            {scores.strength}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
