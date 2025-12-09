import { act } from "react";
import { setZustandState } from "./utils/zustandTestUtils";

// ---- MOCKS ----

// mock stats store
const addSessionMock = jest.fn();

jest.mock("../stores/statStore", () => ({
  useStatsStore: {
    getState: () => ({
      actions: {
        addSession: addSessionMock,
      },
    }),
  },
}));

// mock settings store
jest.mock("../stores/settingStore", () => ({
  useSettingsStore: {
    getState: () => ({
      pomodoroDuration: 25,
      shortBreak: 5,
      longBreak: 15,
    }),
  },
}));

// IMPORTANT: import timer store AFTER mocks
import { useTimerStore } from "../stores/timerStore";

describe("Timer Logic", () => {
  beforeEach(() => {
    addSessionMock.mockReset();

    // reset to a known base state
    setZustandState<typeof useTimerStore.getState>(
      useTimerStore as any,
      {
        mode: "focus",
        isRunning: false,
        secondsLeft: 25 * 60,
        cycles: 0,
      } as any
    );
  });

  test("finishing focus triggers stats + shortBreak", () => {
    // simulate a running focus session that has already reached 0
    setZustandState<typeof useTimerStore.getState>(
      useTimerStore as any,
      {
        mode: "focus",
        isRunning: true,
        secondsLeft: 0,
        cycles: 0,
      } as any
    );

    act(() => {
      useTimerStore.getState().actions.tick();
    });

    // addSession should be called with pomodoroDuration (25)
    expect(addSessionMock).toHaveBeenCalledTimes(1);
    expect(addSessionMock).toHaveBeenCalledWith(25);

    const s = useTimerStore.getState();
    expect(s.mode).toBe("shortBreak");
    expect(s.secondsLeft).toBe(5 * 60);
    expect(s.cycles).toBe(1);
  });

  test("after 4 focus cycles → longBreak", () => {
    // simulate finishing the 4th focus session
    setZustandState<typeof useTimerStore.getState>(
      useTimerStore as any,
      {
        mode: "focus",
        isRunning: true,
        secondsLeft: 0,
        cycles: 3, // already completed 3; this tick finishes the 4th
      } as any
    );

    act(() => {
      useTimerStore.getState().actions.tick();
    });

    expect(addSessionMock).toHaveBeenCalledTimes(1);
    expect(addSessionMock).toHaveBeenCalledWith(25);

    const s = useTimerStore.getState();
    expect(s.mode).toBe("longBreak");
    expect(s.secondsLeft).toBe(15 * 60);
    expect(s.cycles).toBe(0);
  });

  test("finishing break returns to focus", () => {
    // simulate a break (shortBreak or longBreak) that has completed
    setZustandState<typeof useTimerStore.getState>(
      useTimerStore as any,
      {
        mode: "shortBreak",
        isRunning: true,
        secondsLeft: 0,
        cycles: 2,
      } as any
    );

    act(() => {
      useTimerStore.getState().actions.tick();
    });

    const s = useTimerStore.getState();
    expect(s.mode).toBe("focus");
    expect(s.secondsLeft).toBe(25 * 60);
  });
});
