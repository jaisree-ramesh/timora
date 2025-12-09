import { useSettingsStore } from "../../stores/settingStore";
import { useTimerStore } from "../../stores/timerStore";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";


export function TimerDisplay() {
  const { t } = useTranslation();
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const mode = useTimerStore((s) => s.mode);
  const secondsLeft = useTimerStore((s) => s.secondsLeft);

  const { pomodoroDuration, shortBreak, longBreak } = useSettingsStore();

  const totalSeconds = useMemo(() => {
    switch (mode) {
      case "focus":
        return pomodoroDuration * 60;
      case "shortBreak":
        return shortBreak * 60;
      case "longBreak":
        return longBreak * 60;
      default:
        return pomodoroDuration * 60;
    }
  }, [mode, pomodoroDuration, shortBreak, longBreak]);

  const progress =
    totalSeconds > 0 ? Math.max(0, Math.min(1, secondsLeft / totalSeconds)) : 0;

  const strokeDashoffset = circumference * (1 - progress);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const modeKey = mode === "focus" ? "focus" : "break"; // reuse existing keys: timer.focus / timer.break

  return (
    <div
      className="flex flex-col items-center gap-4"
      role="timer"
      aria-label={t("timer.ariaLabel", {
        mode: t(`timer.${modeKey}`),
        time: `${minutes}:${seconds}`,
      })}
      aria-live="off"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {t(`timer.${modeKey}`)}
      </p>

      <div className="relative h-56 w-56">
        {/* Background ring */}
        <svg className="h-full w-full" viewBox="0 0 240 240">
          <circle
            cx="120"
            cy="120"
            r={radius}
            strokeWidth="12"
            className="stroke-muted"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            strokeWidth="12"
            className="stroke-primary origin-center -rotate-90"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.35s ease-out",
            }}
            strokeLinecap="round"
          />
        </svg>

        {/* Time label in the center */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold tabular-nums">
            {minutes}:{seconds}
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            {t("timer.remaining")}
          </span>
        </div>
      </div>
    </div>
  );
}
