import { useState } from "react";
import { Upload, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Language, VerdictData } from "@/pages/Index";
import { supabase } from "@/integrations/supabase/client";

interface LawyerPanelProps {
  side: "A" | "B";
  caseId: string;
  language: Language;
  onArgumentSubmitted: (verdict: VerdictData, side: "A" | "B") => void;
  argumentsLeft: number;
  currentVerdict: VerdictData | null;
  onDocsChange: (docs: string) => void;
  otherSideDocs: string;
  docsLocked: boolean;
}

export const LawyerPanel = ({
  side,
  caseId,
  language,
  onArgumentSubmitted,
  argumentsLeft,
  currentVerdict,
  onDocsChange,
  otherSideDocs,
  docsLocked,
}: LawyerPanelProps) => {
  const [documents, setDocuments] = useState("");
  const [argument, setArgument] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setDocuments(text);
    onDocsChange(text);
    toast({
      title: language === "en" ? "Document uploaded" : "दस्तावेज़ अपलोड किया गया",
      description: language === "en" ? `${file.name} loaded successfully` : `${file.name} सफलतापूर्वक लोड किया गया`,
    });
  };

  const handleSubmitArgument = async () => {
    if (!argument.trim() || !currentVerdict || argumentsLeft === 0) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-judge-verdict", {
        body: {
          caseId,
          previousVerdict: currentVerdict,
          argument,
          side,
          language,
          type: "argument",
        },
      });

      if (error) throw error;
      onArgumentSubmitted(data.verdict, side);
      setArgument("");
      toast({
        title: language === "en" ? "Argument submitted" : "तर्क प्रस्तुत किया गया",
        description: language === "en" ? "Judge is reconsidering the verdict" : "जज फैसले पर पुनर्विचार कर रहे हैं",
      });
    } catch (error) {
      console.error("Error submitting argument:", error);
      toast({
        title: language === "en" ? "Error" : "त्रुटि",
        description: language === "en" ? "Failed to submit argument" : "तर्क प्रस्तुत करने में विफल",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sideLabel = language === "en" 
    ? `Side ${side} (${side === "A" ? "Plaintiff" : "Defendant"})` 
    : `पक्ष ${side} (${side === "A" ? "वादी" : "प्रतिवादी"})`;
  const uploadLabel = language === "en" ? "Upload Documents" : "दस्तावेज़ अपलोड करें";
  const argumentLabel = language === "en" ? "Submit Argument" : "तर्क प्रस्तुत करें";
  const getVerdictLabel = language === "en" ? "Get Verdict" : "फैसला प्राप्त करें";

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50 shadow-card animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{sideLabel}</h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            side === "A" 
              ? "bg-purple-glow/20 text-purple-glow border border-purple-glow/30" 
              : "bg-gold-justice/20 text-gold-justice border border-gold-justice/30"
          }`}>
            {language === "en" ? "Lawyer" : "वकील"}
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="w-4 h-4" />
            {uploadLabel}
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${side}`}
              disabled={docsLocked}
            />
            <label
              htmlFor={`file-upload-${side}`}
              className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border/50 rounded-lg transition-colors bg-muted/20 ${
                docsLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"
              }`}
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {docsLocked 
                  ? (language === "en" ? "Document locked for this case" : "इस मामले के लिए दस्तावेज़ लॉक है")
                  : documents 
                    ? (language === "en" ? "Document loaded" : "दस्तावेज़ लोड किया गया") 
                    : (language === "en" ? "Click to upload" : "अपलोड करने के लिए क्लिक करें")
                }
              </span>
            </label>
          </div>
        </div>

        {currentVerdict && argumentsLeft > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Arguments left:" : "शेष तर्क:"} {argumentsLeft}
              </span>
            </div>
            <Textarea
              placeholder={language === "en" ? "Have you thought of this?" : "क्या आपने इस पर विचार किया है?"}
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              className="min-h-[120px] bg-background/50 border-border/50"
            />
            <Button
              onClick={handleSubmitArgument}
              disabled={!argument.trim() || isLoading}
              className="w-full bg-gradient-to-r from-purple-glow to-primary hover:opacity-90 shadow-glow"
            >
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? (language === "en" ? "Submitting..." : "प्रस्तुत कर रहे हैं...") : argumentLabel}
            </Button>
          </div>
        )}

        {argumentsLeft === 0 && currentVerdict && (
          <div className="text-center text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
            {language === "en" ? "No arguments left" : "कोई तर्क शेष नहीं"}
          </div>
        )}
      </div>
    </Card>
  );
};
