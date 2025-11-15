import { useState, useRef } from "react";
import { Scale, Home, BookOpen, Download } from "lucide-react";
import { LawyerPanel } from "@/components/LawyerPanel";
import { JudgePanel } from "@/components/JudgePanel";
import { VerdictTimeline } from "@/components/VerdictTimeline";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HowItWorks } from "@/components/HowItWorks";
import { Toaster } from "@/components/ui/toaster";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

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
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const downloadSampleDataset = () => {
    const sampleData = `AI JUDGE - SAMPLE LEGAL CASE DATASET
=======================================

Case Title: Sharma vs. ABC Motors Pvt. Ltd.
Dispute: Consumer complaint regarding defective vehicle

===========================================
PLAINTIFF'S INITIAL CASE (SIDE A)
===========================================

Facts:
1. Mr. Rajesh Sharma purchased a brand new sedan from ABC Motors Pvt. Ltd. on January 15, 2023
2. Within 3 months, the vehicle's engine started showing major defects including frequent stalling
3. Despite multiple visits to authorized service centers, the problem persisted
4. ABC Motors refused to replace the vehicle or provide adequate compensation
5. The defect has caused significant inconvenience and financial loss to Mr. Sharma

Claims:
- Replacement of the defective vehicle with a new one
- Full refund of purchase price with interest
- Compensation of ₹50,000 for mental agony and inconvenience
- Litigation costs

Legal Basis:
Consumer Protection Act, 2019 - Protection against defective goods and deficiency in service

===========================================
DEFENDANT'S INITIAL CASE (SIDE B)
===========================================

Facts:
1. ABC Motors sold a vehicle that underwent all standard quality checks
2. Initial inspection reports showed the vehicle was in perfect condition
3. Post-sale inspection revealed unauthorized modifications made by the plaintiff
4. Service records show the plaintiff used non-recommended engine oil
5. The warranty clearly states that unauthorized modifications void coverage

Defense:
- No manufacturing defect in the vehicle as sold
- Issues arose due to customer's improper maintenance and modifications
- Warranty does not cover damages from customer misuse
- Company offered repair services which were declined by plaintiff

Legal Basis:
Sale of Goods Act, 1930 - Caveat emptor principle; Warranty terms and conditions

===========================================
ROUND 1 ARGUMENTS
===========================================

SIDE A - FIRST ARGUMENT:
"The vehicle developed engine problems within the warranty period, which clearly indicates a manufacturing defect. Multiple authorized service centers documented the recurring issue in their service reports. The Consumer Protection Act mandates replacement or refund for defective goods within the warranty period. The defendant's claim of unauthorized modifications is unsubstantiated and appears to be a tactic to avoid liability. We have maintenance records proving regular authorized servicing."

SIDE B - FIRST ARGUMENT:
"Our technical inspection report dated March 20, 2023 clearly shows aftermarket performance chips installed in the engine control unit, which violates warranty terms. The service center logs indicate the plaintiff repeatedly ignored recommendations for proper maintenance. The Sale of Goods Act protects sellers when damage results from buyer's actions post-sale. We offered repair services in good faith, but the plaintiff refused, seeking unwarranted compensation instead."

===========================================
ROUND 2 ARGUMENTS
===========================================

SIDE A - SECOND ARGUMENT:
"The defendant's technical report was conducted only after we filed the complaint, raising questions about its authenticity. Our independent mechanic's report confirms no aftermarket modifications were made. The recurring engine stalling occurred even before the alleged 'inspection' date. The defendant is attempting to fabricate evidence to escape liability. Consumer rights cannot be negated through baseless accusations."

SIDE B - SECOND ARGUMENT:
"The independent mechanic cited by the plaintiff is not certified by our company and lacks expertise in our vehicle models. Our service centers maintain digital records that cannot be altered, showing the plaintiff's vehicle history. The warranty document, signed by the plaintiff, explicitly lists modifications as void conditions. We have photographic evidence of the aftermarket chips taken during inspection."

===========================================
ROUND 3 ARGUMENTS
===========================================

SIDE A - THIRD ARGUMENT:
"The photographic evidence presented by the defendant does not conclusively prove when the alleged modifications were made. It could have been done by their own service center to create false evidence. Our purchase agreement includes a clause guaranteeing vehicle quality for 3 years. The recurring nature of the problem, documented from month one, proves the defect existed from manufacture. Multiple other customers have reported similar issues with the same vehicle model."

SIDE B - THIRD ARGUMENT:
"We present service records from 50 other customers who purchased the same model without any reported engine issues, proving our manufacturing quality. The metadata from our inspection photographs confirms they were taken before the complaint was filed. The plaintiff's claim of a manufacturing defect affecting multiple customers is unsubstantiated. Our warranty covers manufacturing defects, but this is clearly a case of post-purchase modification and misuse."

===========================================
ROUND 4 ARGUMENTS
===========================================

SIDE A - FOURTH ARGUMENT:
"We have gathered affidavits from three other customers experiencing identical engine problems with the same model, contradicting the defendant's claim of isolated incident. The timing of the defendant's 'inspection' and 'evidence gathering' only after our legal notice suggests fabrication. Consumer protection laws exist precisely to prevent such corporate tactics. The defendant has failed to explain why their authorized service centers documented the same problem repeatedly before any alleged modifications."

SIDE B - FOURTH ARGUMENT:
"The three affidavits presented are from owners who also made similar aftermarket modifications, as proven by our extended investigation. Our service centers documented problems but also noted signs of tampering in their internal notes. We have maintained complete transparency in our service records. The plaintiff's demand for replacement plus compensation is excessive and suggests opportunistic litigation rather than genuine grievance."

===========================================
ROUND 5 ARGUMENTS
===========================================

SIDE A - FIFTH ARGUMENT (FINAL):
"This case exemplifies corporate negligence and attempts to blame the consumer. The preponderance of evidence - early service reports, multiple customer complaints, timeline of events - all point to a manufacturing defect. The defendant's changing narrative and late-produced 'evidence' lack credibility. We have maintained our vehicle properly and seek only fair compensation for a genuinely defective product. Justice demands that consumer rights be upheld against corporate evasion tactics."

SIDE B - FIFTH ARGUMENT (FINAL):
"We have provided comprehensive, timestamped, and verified evidence of post-purchase modifications voiding the warranty. Our quality control processes are robust, proven by thousands of satisfied customers. We offered reasonable solutions including repair services, which were rejected. The plaintiff's refusal to cooperate with our investigation and immediate escalation to legal action suggests ulterior motives. We have fulfilled all our obligations under the Sale of Goods Act and warranty terms. The complaint should be dismissed."

===========================================
END OF SAMPLE DATASET
===========================================

Instructions for Use:
1. Copy the "PLAINTIFF'S INITIAL CASE (SIDE A)" content and paste it into Side A's Case Documents
2. Copy the "DEFENDANT'S INITIAL CASE (SIDE B)" content and paste it into Side B's Case Documents
3. Click "Submit Initial Case Documents" in the Judge panel
4. After receiving the initial verdict, submit arguments from each side in sequence
5. Use the Round 1-5 arguments provided above for testing the full debate flow

Note: This is a fictional case created for demonstration purposes only.`;

    const blob = new Blob([sampleData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AI-Judge-Sample-Dataset.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleInitialVerdict = (verdict: VerdictData) => {
    setCurrentVerdict(verdict);
    setTimeline([{ round: 0, verdict, timestamp: new Date() }]);
    setDocsLocked(true);
  };

  const handleNewArgument = (verdict: VerdictData, side: "A" | "B") => {
    setCurrentVerdict(verdict);
    // Calculate round based on how many arguments this side has already submitted
    const roundNumber = side === "A" ? (5 - argumentsLeftA + 1) : (5 - argumentsLeftB + 1);
    setTimeline(prev => [...prev, { round: roundNumber, verdict, timestamp: new Date() }]);
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
        <header className="border-b border-border/50 bg-glass-bg/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
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
              
              <div className="flex items-center gap-4">
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    <NavigationMenuItem>
                      <Button
                        variant="ghost"
                        onClick={scrollToTop}
                        className="gap-2 text-foreground/80 hover:text-foreground hover:bg-accent/50"
                      >
                        <Home className="w-4 h-4" />
                        {language === "en" ? "Home" : "होम"}
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button
                        variant="ghost"
                        onClick={scrollToHowItWorks}
                        className="gap-2 text-foreground/80 hover:text-foreground hover:bg-accent/50"
                      >
                        <BookOpen className="w-4 h-4" />
                        {language === "en" ? "How it Works" : "यह कैसे काम करता है"}
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button
                        variant="ghost"
                        onClick={downloadSampleDataset}
                        className="gap-2 text-foreground/80 hover:text-foreground hover:bg-accent/50"
                      >
                        <Download className="w-4 h-4" />
                        {language === "en" ? "Sample Dataset" : "नमूना डेटासेट"}
                      </Button>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                
                <LanguageToggle language={language} onLanguageChange={setLanguage} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* How It Works */}
          <div ref={howItWorksRef}>
            <HowItWorks language={language} />
          </div>
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
