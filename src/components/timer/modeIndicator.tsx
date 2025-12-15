import { Badge } from "../../components/ui/badge";
import { Timer, Coffee, Moon } from "lucide-react";
import { useTimerStore } from "../../stores/timerStore";
import { useTranslation } from "react-i18next";
import type { JSX } from "react";
import type { TimerMode } from "../../types/type";
import { cn } from "@/lib/utils";

export function ModeIndicator() {
  const mode = useTimerStore((s) => s.mode);
  const switchMode = useTimerStore((s) => s.actions.switchMode);
  const { t } = useTranslation();

  const modes: { id: TimerMode; label: string; icon: JSX.Element }[] = [
    {
      id: "focus",
      label: t("timer.focus"),
      icon: <Timer className="w-4 h-4 mr-1" />,
    },
    {
      id: "shortBreak",
      label: t("timer.shortBreak"),
      icon: <Coffee className="w-4 h-4 mr-1" />,
    },
    {
      id: "longBreak",
      label: t("timer.longBreak"),
      icon: <Moon className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <div
      className="flex items-center justify-center gap-3"
      role="tablist"
      aria-label={t("timer.modeSelector")}
    >
      {modes.map(({ id, label, icon }) => {
        const isActive = mode === id;

        return (
          <Badge
            key={id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => switchMode(id)}
            className={cn(
              "cursor-pointer flex items-center px-4 py-2 rounded-full text-sm select-none transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            )}
          >
            {icon}
            {label}
          </Badge>
        );
      })}
    </div>
  );
}
