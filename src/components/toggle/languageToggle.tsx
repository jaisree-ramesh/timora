import { useSettings, useSettingsActions } from "../../stores/settingStore";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const { language } = useSettings();
  const { setLanguage } = useSettingsActions();

  // Sync i18n whenever state changes
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const next = language === "en" ? "de" : "en";
    setLanguage(next); // Zustand + localStorage
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="relative cursor-pointer text-muted-foreground"
      aria-label={i18n.t("languageToggle")}
    >
      {language.toUpperCase()}
      <span className="sr-only">{i18n.t("languageToggle")}</span>
    </Button>
  );
}
