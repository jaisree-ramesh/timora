import { create } from "zustand";

export type TodoFilter = "all" | "active" | "completed";

interface TodoUiState {
  filter: TodoFilter;
  selectedId: string | null;

  actions: {
    setFilter: (filter: TodoFilter) => void;
    setSelected: (id: string | null) => void;
  };
}

export const useTodoUiStore = create<TodoUiState>((set) => ({
  filter: "all",
  selectedId: null,
  actions: {
    setFilter: (filter) => set({ filter }),
    setSelected: (id) => set({ selectedId: id }),
  },
}));

export const useTodoUi = () => useTodoUiStore((s) => s);
export const useTodoUiActions = () => useTodoUiStore((s) => s.actions);
