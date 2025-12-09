import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "pastel" | "system";
export type Language = "en" | "de";

export interface SettingsState {
  theme: Theme;
  language: Language;
  pomodoroDuration: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number; 
  autoStartBreaks: boolean;
  autoStartPomodoro: boolean;
  soundOn: boolean;
  volume: number; 

  actions: {
    setTheme: (theme: Theme) => void;
    setLanguage: (lang: Language) => void;
    setPomodoroDuration: (min: number) => void;
    setShortBreak: (min: number) => void;
    setLongBreak: (min: number) => void;
    setLongBreakInterval: (i: number) => void;
    toggleAutoStartBreaks: () => void;
    toggleAutoStartPomodoro: () => void;
    toggleSound: () => void;
    setVolume: (v: number) => void;
  };
}

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "system",
      language: navigator.language.startsWith("de") ? "de" : "en",

      // Durations (minutes)
      pomodoroDuration: 25,
      shortBreak: 5,
      longBreak: 15,

      longBreakInterval: 4, // NEW — matches pomodoro technique

      // Behavior
      autoStartBreaks: false,
      autoStartPomodoro: false,

      // Audio
      soundOn: true,
      volume: 0.8, // 0–1

      actions: {
        setTheme: (theme) => set({ theme }),

        setLanguage: (language) => set({ language }),

        setPomodoroDuration: (v) => set({ pomodoroDuration: clamp(v, 10, 90) }),

        setShortBreak: (v) => set({ shortBreak: clamp(v, 1, 30) }),

        setLongBreak: (v) => set({ longBreak: clamp(v, 5, 60) }),

        setLongBreakInterval: (i) =>
          set({ longBreakInterval: clamp(i, 1, 10) }),

        toggleAutoStartBreaks: () =>
          set({ autoStartBreaks: !get().autoStartBreaks }),

        toggleAutoStartPomodoro: () =>
          set({ autoStartPomodoro: !get().autoStartPomodoro }),

        toggleSound: () => set({ soundOn: !get().soundOn }),

        // volume 0–1
        setVolume: (v) => set({ volume: clamp(v, 0, 1) }),
      },
    }),
    {
      name: "timora-settings",
    }
  )
);

export const useSettings = () => useSettingsStore((s) => s);
export const useSettingsActions = () => useSettingsStore((s) => s.actions);
