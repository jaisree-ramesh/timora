import { act } from "react";

/**
 * Safely updates a Zustand store without removing existing fields like `actions`.
 * We only override the keys we pass in `partial`.
 */
export function setZustandState<TState>(
  store: { setState: (fn: (state: TState) => TState) => void },
  partial: Partial<TState>
) {
  act(() => {
    store.setState((state: TState) => ({
      ...state,
      ...partial,
    }));
  });
}
