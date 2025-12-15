import { useEffect, useRef } from "react";
import { useSettingsStore } from "../../stores/settingStore";
import { useTimerStore } from "../../stores/timerStore";

export function useSyncTimer() {
  const isRunning = useTimerStore((s) => s.isRunning);
  const mode = useTimerStore((s) => s.mode);
  const reset = useTimerStore((s) => s.actions.reset);

  const pomodoroDuration = useSettingsStore((s) => s.pomodoroDuration);
  const shortBreak = useSettingsStore((s) => s.shortBreak);
  const longBreak = useSettingsStore((s) => s.longBreak);

  // Store previous values safely
  const prev = useRef({
    pomodoroDuration,
    shortBreak,
    longBreak,
  });

  useEffect(() => {
    // never reset while running
    if (isRunning) return;

    let shouldReset = false;

    if (
      mode === "focus" &&
      prev.current.pomodoroDuration !== pomodoroDuration
    ) {
      shouldReset = true;
    }

    if (mode === "shortBreak" && prev.current.shortBreak !== shortBreak) {
      shouldReset = true;
    }

    if (mode === "longBreak" && prev.current.longBreak !== longBreak) {
      shouldReset = true;
    }

    if (shouldReset) {
      reset();
    }

    // update previous values AFTER comparison
    prev.current = {
      pomodoroDuration,
      shortBreak,
      longBreak,
    };
  }, [isRunning, mode, pomodoroDuration, shortBreak, longBreak, reset]);
}
