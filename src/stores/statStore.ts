
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DayStats {
  minutes: number;
  sessions: number;
}

interface StatsState {
  totalMinutes: number;
  totalSessions: number;
  streak: number; // days in a row
  lastActiveDate: string | null;
  history: Record<string, DayStats>;

  actions: {
    addSession: (minutes: number) => void;
    resetStats: () => void;
  };
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
          const today = new Date().toISOString().slice(0, 10);
          const state = get();

          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .slice(0, 10);

          // Streak logic
          let newStreak = state.streak;
          if (state.lastActiveDate === today) {
            // already counted today → streak stays same
          } else if (state.lastActiveDate === yesterday) {
            newStreak += 1; // consecutive day
          } else {
            newStreak = 1; // reset streak
          }

          // Update today's stats
          const todayStats = state.history[today] || {
            minutes: 0,
            sessions: 0,
          };

          todayStats.minutes += minutes;
          todayStats.sessions += 1;

          set({
            totalMinutes: state.totalMinutes + minutes,
            totalSessions: state.totalSessions + 1,
            lastActiveDate: today,
            streak: newStreak,
            history: {
              ...state.history,
              [today]: todayStats,
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
