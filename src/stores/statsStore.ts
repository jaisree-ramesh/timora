import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DayStats {
  minutes: number;
  sessions: number;
}

interface StatsState {
  totalMinutes: number;
  totalSessions: number;
  streak: number;
  lastActiveDate: string | null;
  history: Record<string, DayStats>;

  actions: {
    addSession: (minutes: number) => void;
    resetStats: () => void;
  };
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayISO() {
  return new Date(Date.now() - 86400000).toISOString().slice(0, 10);
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      totalMinutes: 0,
      totalSessions: 0,
      streak: 0,
      lastActiveDate: null,
      history: {},

      actions: {
        addSession: (minutes) => {
          const today = todayISO();
          const yesterday = yesterdayISO();
          const state = get();

          // ─── STREAK LOGIC ───
          let newStreak = 1;

          if (state.lastActiveDate === today) {
            newStreak = state.streak; // already counted today
          } else if (state.lastActiveDate === yesterday) {
            newStreak = state.streak + 1;
          }

          // ─── TODAY STATS ───
          const prevDay = state.history[today] ?? {
            minutes: 0,
            sessions: 0,
          };

          const updatedDay: DayStats = {
            minutes: prevDay.minutes + minutes,
            sessions: prevDay.sessions + 1,
          };

          set({
            totalMinutes: state.totalMinutes + minutes,
            totalSessions: state.totalSessions + 1,
            streak: newStreak,
            lastActiveDate: today,
            history: {
              ...state.history,
              [today]: updatedDay,
            },
          });
        },

        resetStats: () =>
          set({
            totalMinutes: 0,
            totalSessions: 0,
            streak: 0,
            lastActiveDate: null,
            history: {},
          }),
      },
    }),
    {
      name: "timora-stats",
    }
  )
);

export const useStats = () => useStatsStore((s) => s);
export const useStatsActions = () => useStatsStore((s) => s.actions);
