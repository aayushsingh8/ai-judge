import { Card } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";
import type { Language } from "@/pages/Index";

interface ComparisonTableProps {
  comparison: {
    agreements: string[];
    contradictions: string[];
    strengths: {
      sideA: string[];
      sideB: string[];
    };
  };
  language: Language;
}

export const ComparisonTable = ({ comparison, language }: ComparisonTableProps) => {
  return (
    <Card className="p-4 bg-muted/20 border-border/30">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        {language === "en" ? "Document Comparison" : "दस्तावेज़ तुलना"}
      </h3>

      <div className="space-y-4">
        {/* Agreements */}
        {comparison.agreements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-green-400 flex items-center gap-2">
              <Check className="w-3 h-3" />
              {language === "en" ? "Agreements" : "सहमतियाँ"}
            </h4>
            <ul className="space-y-1">
              {comparison.agreements.map((item, idx) => (
                <li key={idx} className="text-xs text-muted-foreground pl-5">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contradictions */}
        {comparison.contradictions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-red-400 flex items-center gap-2">
              <X className="w-3 h-3" />
              {language === "en" ? "Contradictions" : "विरोधाभास"}
            </h4>
            <ul className="space-y-1">
              {comparison.contradictions.map((item, idx) => (
                <li key={idx} className="text-xs text-muted-foreground pl-5">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-purple-glow flex items-center gap-1">
              <Star className="w-3 h-3" />
              {language === "en" ? "Side A Strengths" : "पक्ष A की मजबूतियां"}
            </h4>
            <ul className="space-y-1">
              {comparison.strengths.sideA.map((item, idx) => (
                <li key={idx} className="text-xs text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gold-justice flex items-center gap-1">
              <Star className="w-3 h-3" />
              {language === "en" ? "Side B Strengths" : "पक्ष B की मजबूतियां"}
            </h4>
            <ul className="space-y-1">
              {comparison.strengths.sideB.map((item, idx) => (
                <li key={idx} className="text-xs text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
