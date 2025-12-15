import { useTranslation } from "react-i18next";
import { useTimerTick } from "../hooks/timerTickHook";
import { Card } from "../ui/card";
import { TimerControls } from "./timerControls";
import { TimerDisplay } from "./timerDisplay";
import { ModeIndicator } from "./modeIndicator";
import { useSyncTimer } from "../hooks/syncTimerHook";

export function TimerSection() {
  useTimerTick();
  useSyncTimer();
  const { t } = useTranslation();

  return (
    <section aria-labelledby="timer-heading" className="max-w-2xl mx-auto">
      <Card className="p-6 flex flex-col items-center">
        <h2
          id="timer-heading"
          className="mb-4 w-full text-left text-lg font-semibold"
        >
          {t("timer.title")}
        </h2>

        <ModeIndicator />
        <TimerDisplay />
        <TimerControls />
      </Card>
    </section>
  );
}
