import { Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../../components/ui/dialog";
import { SettingsPanel } from "./settingsPanel";
import { useTranslation } from "react-i18next";

export function SettingsDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("settings.openSettings")}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className=" max-h-[90vh]">
        {/* Screen-reader-only title */}
        <DialogTitle className="sr-only">{t("settings.title")}</DialogTitle>
        <SettingsPanel />
      </DialogContent>
    </Dialog>
  );
}
