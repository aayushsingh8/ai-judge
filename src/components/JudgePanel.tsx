import { useState } from "react";
import { Scale, TrendingUp, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Language, VerdictData } from "@/pages/Index";
import { PrecedentCard } from "@/components/PrecedentCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ArgumentScores } from "@/components/ArgumentScores";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface JudgePanelProps {
  verdict: VerdictData | null;
  language: Language;
  caseId: string;
  sideADocs: string;
  sideBDocs: string;
  onVerdictReceived: (verdict: VerdictData) => void;
}

export const JudgePanel = ({ verdict, language, caseId, sideADocs, sideBDocs, onVerdictReceived }: JudgePanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleDownloadPDF = () => {
    // PDF export functionality will be implemented
    console.log("Downloading PDF...");
  };

  const handleGetVerdict = async () => {
    if (!sideADocs || !sideBDocs) {
      toast({
        title: language === "en" ? "Missing documents" : "दस्तावेज़ गायब हैं",
        description: language === "en" ? "Both sides must upload documents first" : "दोनों पक्षों को पहले दस्तावेज़ अपलोड करने होंगे",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-judge-verdict", {
        body: {
          caseId,
          sideADocs,
          sideBDocs,
          language,
          type: "initial",
        },
      });

      if (error) throw error;
      onVerdictReceived(data.verdict);
      toast({
        title: language === "en" ? "Verdict received" : "फैसला प्राप्त हुआ",
        description: language === "en" ? "AI Judge has analyzed the case" : "एआई जज ने मामले का विश्लेषण किया है",
      });
    } catch (error) {
      console.error("Error getting verdict:", error);
      toast({
        title: language === "en" ? "Error" : "त्रुटि",
        description: language === "en" ? "Failed to get verdict" : "फैसला प्राप्त करने में विफल",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBiasBadgeColor = (bias: string) => {
    if (bias.toLowerCase().includes("neutral")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (bias.toLowerCase().includes("slight")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50 shadow-card animate-fade-in lg:col-span-1">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-glow to-primary shadow-glow">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {language === "en" ? "AI Judge" : "एआई जज"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Impartial Analysis" : "निष्पक्ष विश्लेषण"}
              </p>
            </div>
          </div>
          {verdict && (
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              size="sm"
              className="border-border/50"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          )}
        </div>

        {!verdict ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-glow/20 to-primary/20 flex items-center justify-center animate-pulse-glow">
              <Scale className="w-8 h-8 text-purple-glow" />
            </div>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Waiting for both sides to submit documents..." 
                : "दोनों पक्षों से दस्तावेज़ प्रस्तुत करने की प्रतीक्षा में..."}
            </p>
            {sideADocs && sideBDocs && (
              <Button
                onClick={handleGetVerdict}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-glow to-primary hover:opacity-90 transition-opacity shadow-glow"
              >
                <Scale className="w-4 h-4 mr-2" />
                {isLoading
                  ? language === "en" ? "Analyzing..." : "विश्लेषण कर रहे हैं..."
                  : language === "en" ? "Get Verdict" : "फैसला प्राप्त करें"}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Case Summary */}
            <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-glow" />
                {language === "en" ? "Case Summary" : "मामले का सारांश"}
              </h3>
              <p className="text-sm text-muted-foreground">{verdict.summary}</p>
            </div>

            {/* Confidence Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {language === "en" ? "Confidence" : "विश्वास"}
                </span>
                <span className="text-purple-glow font-bold">{verdict.confidence}%</span>
              </div>
              <Progress value={verdict.confidence} className="h-2" />
            </div>

            {/* Bias Detection */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Bias Analysis" : "पूर्वाग्रह विश्लेषण"}
              </span>
              <Badge className={getBiasBadgeColor(verdict.bias)}>
                {verdict.bias}
              </Badge>
            </div>

            {/* Legal Reasoning */}
            <div className="p-4 bg-background/50 rounded-lg border border-border/30">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {language === "en" ? "Legal Reasoning" : "कानूनी तर्क"}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{verdict.reasoning}</p>
            </div>

            {/* Final Verdict */}
            <div className="p-4 bg-gradient-to-br from-purple-glow/10 to-primary/10 rounded-lg border border-purple-glow/30 shadow-glow">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {language === "en" ? "Verdict" : "फैसला"}
              </h3>
              <p className="text-sm font-medium text-purple-glow">{verdict.verdict}</p>
            </div>

            {/* Argument Scores (if available) */}
            {verdict.argumentScores && (
              <ArgumentScores scores={verdict.argumentScores} language={language} />
            )}

            {/* Document Comparison */}
            {verdict.comparison && (
              <ComparisonTable comparison={verdict.comparison} language={language} />
            )}

            {/* Legal Precedents */}
            {verdict.precedents && verdict.precedents.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {language === "en" ? "Relevant Precedents" : "प्रासंगिक मिसालें"}
                </h3>
                {verdict.precedents.map((precedent, idx) => (
                  <PrecedentCard key={idx} precedent={precedent} language={language} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
