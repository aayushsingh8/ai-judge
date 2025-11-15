import { Scale, Download, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useState } from "react";
import { Language } from "./Index";

const SampleDataset = () => {
  const [language, setLanguage] = useState<Language>("en");

  const downloadPlaintiffCase = () => {
    const plaintiffData = `PLAINTIFF'S CASE - SIDE A
=======================================

Case Title: Sharma vs. ABC Motors Pvt. Ltd.
Plaintiff: Mr. Rajesh Sharma
Defendant: ABC Motors Pvt. Ltd.

FACTS OF THE CASE:
1. Mr. Rajesh Sharma purchased a brand new sedan from ABC Motors Pvt. Ltd. on January 15, 2023
2. Within 3 months, the vehicle's engine started showing major defects including frequent stalling
3. Despite multiple visits to authorized service centers, the problem persisted
4. ABC Motors refused to replace the vehicle or provide adequate compensation
5. The defect has caused significant inconvenience and financial loss to Mr. Sharma

CLAIMS:
- Replacement of the defective vehicle with a new one
- Full refund of purchase price with interest
- Compensation of ₹50,000 for mental agony and inconvenience
- Litigation costs

LEGAL BASIS:
Consumer Protection Act, 2019 - Protection against defective goods and deficiency in service

This case demonstrates a clear violation of consumer rights where a manufacturing defect has caused continuous problems despite good faith attempts to resolve through authorized service channels.`;

    const blob = new Blob([plaintiffData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plaintiff_case.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadDefendantCase = () => {
    const defendantData = `DEFENDANT'S CASE - SIDE B
=======================================

Case Title: Sharma vs. ABC Motors Pvt. Ltd.
Defendant: ABC Motors Pvt. Ltd.
Plaintiff: Mr. Rajesh Sharma

FACTS OF THE CASE:
1. ABC Motors sold a vehicle that underwent all standard quality checks
2. Initial inspection reports showed the vehicle was in perfect condition
3. Post-sale inspection revealed unauthorized modifications made by the plaintiff
4. Service records show the plaintiff used non-recommended engine oil
5. The warranty clearly states that unauthorized modifications void coverage

DEFENSE:
- No manufacturing defect in the vehicle as sold
- Issues arose due to customer's improper maintenance and modifications
- Warranty does not cover damages from customer misuse
- Company offered repair services which were declined by plaintiff

LEGAL BASIS:
Sale of Goods Act, 1930 - Caveat emptor principle; Warranty terms and conditions

The defendant maintains that all quality standards were met and the issues arose from post-purchase modifications and improper maintenance by the plaintiff.`;

    const blob = new Blob([defendantData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "defendant_case.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadArgumentsRounds = () => {
    const argumentsData = `5 ROUNDS OF ARGUMENTS - BOTH SIDES
=======================================

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
END OF ARGUMENTS
===========================================`;

    const blob = new Blob([argumentsData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "arguments_5_rounds.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-glow to-primary shadow-glow">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-glow to-gold-justice bg-clip-text text-transparent">
                    AI Judge
                  </h1>
                  <p className="text-sm text-muted-foreground">Sample Dataset</p>
                </div>
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {language === "en" ? "Back to Home" : "होम पर वापस जाएं"}
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-glow to-gold-justice bg-clip-text text-transparent">
                {language === "en" ? "Sample Legal Case Dataset" : "नमूना कानूनी मामला डेटासेट"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en" 
                  ? "Download sample case documents and arguments to test the AI Judge system"
                  : "एआई जज सिस्टम का परीक्षण करने के लिए नमूना केस दस्तावेज़ और तर्क डाउनलोड करें"}
              </p>
            </div>

            <Card className="border-border/50 bg-glass-bg/40 backdrop-blur-sm shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Download className="w-6 h-6 text-purple-glow" />
                  {language === "en" ? "Case: Sharma vs. ABC Motors Pvt. Ltd." : "मामला: शर्मा बनाम एबीसी मोटर्स प्रा. लिमिटेड"}
                </CardTitle>
                <CardDescription>
                  {language === "en" 
                    ? "A consumer complaint case regarding a defective vehicle. Download the initial case documents and argument rounds below."
                    : "दोषपूर्ण वाहन के संबंध में एक उपभोक्ता शिकायत मामला। नीचे प्रारंभिक केस दस्तावेज़ और तर्क राउंड डाउनलोड करें।"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Initial Case Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === "en" ? "📄 Initial Case Documents" : "📄 प्रारंभिक केस दस्तावेज़"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-purple-glow/30 hover:border-purple-glow/60 transition-all hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === "en" ? "Side A - Plaintiff" : "पक्ष A - वादी"}
                        </CardTitle>
                        <CardDescription>
                          {language === "en" ? "Mr. Sharma's complaint and claims" : "श्री शर्मा की शिकायत और दावे"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          onClick={downloadPlaintiffCase}
                          className="w-full gap-2 bg-gradient-to-r from-purple-glow to-primary hover:opacity-90"
                        >
                          <Download className="w-4 h-4" />
                          {language === "en" ? "Download plaintiff_case.txt" : "plaintiff_case.txt डाउनलोड करें"}
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-gold-justice/30 hover:border-gold-justice/60 transition-all hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === "en" ? "Side B - Defendant" : "पक्ष B - प्रतिवादी"}
                        </CardTitle>
                        <CardDescription>
                          {language === "en" ? "ABC Motors' defense and counter-claims" : "एबीसी मोटर्स की प्रतिरक्षा और प्रति-दावे"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          onClick={downloadDefendantCase}
                          className="w-full gap-2 bg-gradient-to-r from-gold-justice to-primary hover:opacity-90"
                        >
                          <Download className="w-4 h-4" />
                          {language === "en" ? "Download defendant_case.txt" : "defendant_case.txt डाउनलोड करें"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Arguments Rounds */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === "en" ? "⚖️ Complete Argument Rounds (1-5)" : "⚖️ पूर्ण तर्क राउंड (1-5)"}
                  </h3>
                  <Card className="border-primary/30 hover:border-primary/60 transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === "en" ? "5 Rounds of Arguments" : "तर्कों के 5 राउंड"}
                      </CardTitle>
                      <CardDescription>
                        {language === "en" 
                          ? "Complete arguments from both sides across 5 rounds - use these to test the full debate flow"
                          : "5 राउंड में दोनों पक्षों के पूर्ण तर्क - पूर्ण बहस प्रवाह का परीक्षण करने के लिए इनका उपयोग करें"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={downloadArgumentsRounds}
                        className="w-full gap-2 bg-gradient-to-r from-purple-glow via-primary to-gold-justice hover:opacity-90"
                      >
                        <Download className="w-4 h-4" />
                        {language === "en" ? "Download arguments_5_rounds.txt" : "arguments_5_rounds.txt डाउनलोड करें"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Instructions */}
                <div className="mt-8 p-6 rounded-lg bg-accent/30 border border-border/50">
                  <h3 className="font-semibold mb-3 text-lg">
                    {language === "en" ? "📋 How to Use These Files:" : "📋 इन फ़ाइलों का उपयोग कैसे करें:"}
                  </h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>{language === "en" ? "Download plaintiff_case.txt and defendant_case.txt" : "plaintiff_case.txt और defendant_case.txt डाउनलोड करें"}</li>
                    <li>{language === "en" ? "Copy the plaintiff case content and paste it into Side A's Case Documents field" : "वादी केस सामग्री की प्रतिलिपि बनाएँ और इसे साइड A के केस दस्तावेज़ फ़ील्ड में पेस्ट करें"}</li>
                    <li>{language === "en" ? "Copy the defendant case content and paste it into Side B's Case Documents field" : "प्रतिवादी केस सामग्री की प्रतिलिपि बनाएँ और इसे साइड B के केस दस्तावेज़ फ़ील्ड में पेस्ट करें"}</li>
                    <li>{language === "en" ? "Click 'Submit Initial Case Documents' in the Judge panel to get the initial verdict" : "प्रारंभिक फैसला प्राप्त करने के लिए जज पैनल में 'प्रारंभिक केस दस्तावेज़ सबमिट करें' पर क्लिक करें"}</li>
                    <li>{language === "en" ? "Download arguments_5_rounds.txt and use the arguments to submit rounds from each side" : "arguments_5_rounds.txt डाउनलोड करें और प्रत्येक पक्ष से राउंड सबमिट करने के लिए तर्कों का उपयोग करें"}</li>
                    <li>{language === "en" ? "Submit arguments alternately from both sides to see how the AI Judge evolves its verdict" : "दोनों पक्षों से बारी-बारी से तर्क सबमिट करें यह देखने के लिए कि एआई जज अपने फैसले को कैसे विकसित करता है"}</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-glow to-primary">
                  <Home className="w-5 h-5" />
                  {language === "en" ? "Start Testing AI Judge" : "एआई जज परीक्षण शुरू करें"}
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SampleDataset;
