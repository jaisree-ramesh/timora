import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function TodoShortcutsHelp() {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("todo.shortcuts", )}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-64 text-sm space-y-2">
        <p className="font-medium">
          {t("todo.shortcutsTitle")}
        </p>

        <ul className="space-y-1 text-muted-foreground">
          <li>
            <kbd className="kbd">Enter</kbd> -{" "}
            {t("todo.shortcutEdit")}
          </li>
          <li>
            <kbd className="kbd">E</kbd> - {t("todo.shortcutEdit")}
          </li>
          <li>
            <kbd className="kbd">Delete</kbd> /{" "}
            <kbd className="kbd">Backspace</kbd> -{" "}
            {t("todo.shortcutDelete")}
          </li>
          <li>
            <kbd className="kbd">Esc</kbd> -{" "}
            {t("todo.shortcutCancel")}
          </li>
          <li>
            Drag <span className="opacity-70">⋮⋮</span> -{" "}
            {t("todo.shortcutReorder")}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
