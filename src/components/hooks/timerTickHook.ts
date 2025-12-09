import { useEffect } from "react";
import { useTimerStore } from "../../stores/timerStore";

export function useTimerTick() {
  const isRunning = useTimerStore((s) => s.isRunning);
  const tick = useTimerStore((s) => s.actions.tick);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);
}
