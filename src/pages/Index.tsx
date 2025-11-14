import { useState } from "react";
import { Scale } from "lucide-react";
import { LawyerPanel } from "@/components/LawyerPanel";
import { JudgePanel } from "@/components/JudgePanel";
import { VerdictTimeline } from "@/components/VerdictTimeline";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HowItWorks } from "@/components/HowItWorks";
import { Toaster } from "@/components/ui/toaster";

export type Language = "en" | "hi";

export interface VerdictData {
  summary: string;
  reasoning: string;
  verdict: string;
  confidence: number;
  bias: string;
  precedents?: Array<{ title: string; summary: string; relevance: string }>;
  comparison?: { agreements: string[]; contradictions: string[]; strengths: { sideA: string[]; sideB: string[] } };
  argumentScores?: { clarity: number; evidence: number; strength: string };
}

export interface TimelineEntry {
  round: number;
  verdict: VerdictData;
  timestamp: Date;
}

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [caseId, setCaseId] = useState<string>(() => `case_${Date.now()}`);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [currentVerdict, setCurrentVerdict] = useState<VerdictData | null>(null);
  const [argumentsLeftA, setArgumentsLeftA] = useState(5);
  const [argumentsLeftB, setArgumentsLeftB] = useState(5);
  const [sideADocs, setSideADocs] = useState<string>("");
  const [sideBDocs, setSideBDocs] = useState<string>("");
  const [docsLocked, setDocsLocked] = useState(false);

  const handleInitialVerdict = (verdict: VerdictData) => {
    setCurrentVerdict(verdict);
    setTimeline([{ round: 0, verdict, timestamp: new Date() }]);
    setDocsLocked(true);
  };

  const handleNewArgument = (verdict: VerdictData, side: "A" | "B") => {
    setCurrentVerdict(verdict);
    setTimeline(prev => [...prev, { round: timeline.length, verdict, timestamp: new Date() }]);
    if (side === "A") {
      setArgumentsLeftA(prev => Math.max(0, prev - 1));
    } else {
      setArgumentsLeftB(prev => Math.max(0, prev - 1));
    }
  };

  const handleReset = () => {
    setCaseId(`case_${Date.now()}`);
    setTimeline([]);
    setCurrentVerdict(null);
    setArgumentsLeftA(5);
    setArgumentsLeftB(5);
    setSideADocs("");
    setSideBDocs("");
    setDocsLocked(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-glow/10 via-background to-legal-navy/30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-glow/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-justice/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-glass-bg/40 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-glow to-primary shadow-glow">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-glow to-gold-justice bg-clip-text text-transparent">
                    AI Judge
                  </h1>
                  <p className="text-sm text-muted-foreground">Impartial Legal Analysis</p>
                </div>
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* How It Works */}
          <HowItWorks language={language} />
          {/* Reset Button */}
          {currentVerdict && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {language === "en" ? "🔄 Reset & Start New Case" : "🔄 रीसेट करें और नया मामला शुरू करें"}
              </button>
            </div>
          )}

          {/* Three Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <LawyerPanel
              side="A"
              caseId={caseId}
              language={language}
              onArgumentSubmitted={handleNewArgument}
              argumentsLeft={argumentsLeftA}
              currentVerdict={currentVerdict}
              onDocsChange={setSideADocs}
              otherSideDocs={sideBDocs}
              docsLocked={docsLocked}
            />

            <JudgePanel 
              verdict={currentVerdict} 
              language={language}
              caseId={caseId}
              sideADocs={sideADocs}
              sideBDocs={sideBDocs}
              onVerdictReceived={handleInitialVerdict}
            />

            <LawyerPanel
              side="B"
              caseId={caseId}
              language={language}
              onArgumentSubmitted={handleNewArgument}
              argumentsLeft={argumentsLeftB}
              currentVerdict={currentVerdict}
              onDocsChange={setSideBDocs}
              otherSideDocs={sideADocs}
              docsLocked={docsLocked}
            />
          </div>

          {/* Timeline */}
          {timeline.length > 0 && (
            <VerdictTimeline timeline={timeline} language={language} />
          )}
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default Index;
