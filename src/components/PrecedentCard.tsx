import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import type { Language } from "@/pages/Index";

interface PrecedentCardProps {
  precedent: {
    title: string;
    summary: string;
    relevance: string;
  };
  language: Language;
}

export const PrecedentCard = ({ precedent, language }: PrecedentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 bg-muted/20 border-border/30 hover:border-purple-glow/30 transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 flex-1">
            <BookOpen className="w-4 h-4 text-gold-justice mt-1 flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-semibold text-foreground">{precedent.title}</h4>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-gold-justice">
                  {language === "en" ? "Relevance:" : "प्रासंगिकता:"}
                </span>{" "}
                {precedent.relevance}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="pt-3 border-t border-border/30 animate-fade-in">
            <p className="text-sm text-muted-foreground">{precedent.summary}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
