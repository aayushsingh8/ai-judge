import { Scale, Upload, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/pages/Index";

interface HowItWorksProps {
  language: Language;
}

export const HowItWorks = ({ language }: HowItWorksProps) => {
  const steps = [
    {
      icon: Upload,
      titleEn: "Upload Documents",
      titleHi: "दस्तावेज़ अपलोड करें",
      descEn: "Both plaintiff (Side A) and defendant (Side B) upload their legal documents",
      descHi: "वादी (पक्ष A) और प्रतिवादी (पक्ष B) दोनों अपने कानूनी दस्तावेज़ अपलोड करते हैं",
    },
    {
      icon: Scale,
      titleEn: "AI Analysis",
      titleHi: "एआई विश्लेषण",
      descEn: "AI Judge analyzes both sides and provides an impartial initial verdict with confidence score",
      descHi: "एआई जज दोनों पक्षों का विश्लेषण करता है और विश्वास स्कोर के साथ निष्पक्ष प्रारंभिक फैसला देता है",
    },
    {
      icon: MessageSquare,
      titleEn: "Submit Arguments",
      titleHi: "तर्क प्रस्तुत करें",
      descEn: "Each side can submit up to 5 follow-up arguments to strengthen their case",
      descHi: "प्रत्येक पक्ष अपने मामले को मजबूत करने के लिए 5 फॉलो-अप तर्क प्रस्तुत कर सकता है",
    },
    {
      icon: FileText,
      titleEn: "Verdict Evolution",
      titleHi: "फैसले का विकास",
      descEn: "Watch the verdict evolve with each argument, tracked in an interactive timeline",
      descHi: "प्रत्येक तर्क के साथ फैसले के विकास को देखें, एक इंटरैक्टिव टाइमलाइन में ट्रैक किया गया",
    },
    {
      icon: CheckCircle,
      titleEn: "Final Judgment",
      titleHi: "अंतिम निर्णय",
      descEn: "Get the final verdict with bias detection, precedents, and comprehensive analysis",
      descHi: "पूर्वाग्रह का पता लगाने, मिसालों और व्यापक विश्लेषण के साथ अंतिम फैसला प्राप्त करें",
    },
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-glow to-gold-justice bg-clip-text text-transparent mb-2">
          {language === "en" ? "How It Works" : "यह कैसे काम करता है"}
        </h2>
        <p className="text-muted-foreground">
          {language === "en" 
            ? "Experience the future of legal analysis in 5 simple steps" 
            : "5 सरल चरणों में कानूनी विश्लेषण के भविष्य का अनुभव करें"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card backdrop-blur-xl border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-glow to-primary flex items-center justify-center shadow-glow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {language === "en" ? step.titleEn : step.titleHi}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en" ? step.descEn : step.descHi}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
