import { create } from "zustand";
import { useSettingsStore } from "./settingStore";
import { useStatsStore } from "./statsStore";
import type { TimerMode } from "../types/type";

interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  isRunning: boolean;
  cycles: number;

  actions: {
    start: () => void;
    pause: () => void;
    reset: () => void;
    tick: () => void;
    switchMode: (mode: TimerMode) => void;
  };
}

export const useTimerStore = create<TimerState>((set, get) => ({
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
        secondsLeft: duration * 60,
        isRunning: false,
      });
    },

    tick: () => {
      const state = get();
      if (!state.isRunning) return;

      if (state.secondsLeft > 1) {
        set({ secondsLeft: state.secondsLeft - 1 });
        return;
      }

      // Timer finished
      set({ secondsLeft: 0, isRunning: false });

      const stats = useStatsStore.getState().actions;
      const settings = useSettingsStore.getState();

      if (state.mode === "focus") {
        stats.addSession(settings.pomodoroDuration);

        const nextCycle = state.cycles + 1;

        if (nextCycle >= 4) {
          set({ cycles: 0 });
          get().actions.switchMode("longBreak");
        } else {
          set({ cycles: nextCycle });
          get().actions.switchMode("shortBreak");
        }
      } else {
        get().actions.switchMode("focus");
      }
    },
  },
}));

export const useTimer = () => useTimerStore((s) => s);
export const useTimerActions = () => useTimerStore((s) => s.actions);
