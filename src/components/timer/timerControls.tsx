import { Button } from "../../components/ui/button";
import { useTimerStore } from "../../stores/timerStore";
import { useTranslation } from "react-i18next";
import { Play, Pause, RotateCcw } from "lucide-react";

export function TimerControls() {
  const { t } = useTranslation();
  const isRunning = useTimerStore((s) => s.isRunning);
  const { start, pause, reset } = useTimerStore((s) => s.actions);

  const handleStartPause = () => {
    if (isRunning) pause();
    else start();
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={handleStartPause}
        aria-pressed={isRunning}
        aria-label={isRunning ? t("timer.pause") : t("timer.start")}
      >
        {isRunning ? (
          <>
            <Pause className="h-4 w-4" />
            <span className="sr-only">{t("timer.pause")}</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span className="sr-only">{t("timer.start")}</span>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={reset}
        aria-label={t("timer.reset")}
      >
        <RotateCcw className="h-4 w-4" />
        <span className="sr-only">{t("timer.reset")}</span>
      </Button>
    </div>
  );
}
