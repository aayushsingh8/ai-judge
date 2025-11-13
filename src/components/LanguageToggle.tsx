import { Button } from "@/components/ui/button";
import type { Language } from "@/pages/Index";

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-lg border border-border/30">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("en")}
        className={language === "en" ? "bg-primary shadow-glow" : ""}
      >
        🇬🇧 English
      </Button>
      <Button
        variant={language === "hi" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("hi")}
        className={language === "hi" ? "bg-primary shadow-glow" : ""}
      >
        🇮🇳 हिंदी
      </Button>
    </div>
  );
};
