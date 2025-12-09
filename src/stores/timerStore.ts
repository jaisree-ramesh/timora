import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSettingsStore } from "./settingStore";
import { useStatsStore } from "./statStore";
import type { TimerMode } from "../types/type";

interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  isRunning: boolean;
  cycles: number; // counts number of pomodoros completed until long break

  actions: {
    start: () => void;
    pause: () => void;
    reset: () => void;
    tick: () => void;
    switchMode: (mode: TimerMode) => void;
  };
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: "focus",
      isRunning: false,
      secondsLeft: useSettingsStore.getState().pomodoroDuration * 60,
      cycles: 0,

      actions: {
        start: () => set({ isRunning: true }),
        pause: () => set({ isRunning: false }),

        reset: () => {
          const settings = useSettingsStore.getState();
          const mode = get().mode;

          const duration =
            mode === "focus"
              ? settings.pomodoroDuration
              : mode === "shortBreak"
              ? settings.shortBreak
              : settings.longBreak;

          set({
            secondsLeft: duration * 60,
            isRunning: false,
          });
        },

        switchMode: (newMode) => {
          const settings = useSettingsStore.getState();

          const duration =
            newMode === "focus"
              ? settings.pomodoroDuration
              : newMode === "shortBreak"
              ? settings.shortBreak
              : settings.longBreak;

          set({
            mode: newMode,
            isRunning: false,
            secondsLeft: duration * 60,
          });
        },

        tick: () => {
          const state = get();
          if (!state.isRunning) return;

          // If timer still has more than 1 second → just decrement
          if (state.secondsLeft > 1) {
            set({ secondsLeft: state.secondsLeft - 1 });
            return;
          }

          // Handle the last second (1 → 0)
          if (state.secondsLeft === 1) {
            set({ secondsLeft: 0 });
          }

          // NOW the timer has finished → run finishing logic
          const stats = useStatsStore.getState().actions;

          if (state.mode === "focus") {
            // Record stats
            stats.addSession(useSettingsStore.getState().pomodoroDuration);

            const nextCycle = state.cycles + 1;

            if (nextCycle >= 4) {
              // Switch to long break
              set({ cycles: 0 });
              get().actions.switchMode("longBreak");
            } else {
              // Switch to short break
              set({ cycles: nextCycle });
              get().actions.switchMode("shortBreak");
            }
          } else {
            // break finished → go back to focus mode
            get().actions.switchMode("focus");
          }
        },
      },
    }),
    { name: "timora-timer" }
  )
);

export const useTimer = () => useTimerStore((s) => s);
export const useTimerActions = () => useTimerStore((s) => s.actions);
