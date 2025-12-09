import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  deleted: boolean; // soft delete for undo
}

interface TodoState {
  todos: ITodo[];

  actions: {
    addTodo: (title: string) => { success: boolean; error?: string };
    toggleTodo: (id: string) => { success: boolean; error?: string };
    editTodo: (
      id: string,
      title: string
    ) => { success: boolean; error?: string };
    deleteTodo: (id: string) => { success: boolean; error?: string };
    restoreTodo: (id: string) => { success: boolean; error?: string };
    clearCompleted: () => { success: boolean };
  };
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      actions: {
        addTodo: (title) => {
          const clean = title.trim();
          if (!clean) return { success: false, error: "Todo cannot be empty." };

          const newTodo: ITodo = {
            id: crypto.randomUUID(),
            title: clean,
            completed: false,
            createdAt: Date.now(),
            deleted: false,
          };

          set({ todos: [...get().todos, newTodo] });
          return { success: true };
        },

        toggleTodo: (id) => {
          const state = get();
          const exists = state.todos.find((t) => t.id === id);
          if (!exists) return { success: false, error: "Todo not found." };

          set({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            ),
          });

          return { success: true };
        },

        editTodo: (id, title) => {
          const clean = title.trim();
          if (!clean)
            return { success: false, error: "New title cannot be empty." };

          const state = get();
          const exists = state.todos.find((t) => t.id === id);

          if (!exists) 
            return { success: false, error: "Todo not found." };

          set({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, title: clean } : t
            ),
          });

          return { success: true };
        },

        deleteTodo: (id) => {
          const state = get();
          const exists = state.todos.find((t) => t.id === id);
          if (!exists) return { success: false, error: "Todo not found." };

          // Soft delete
          set({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, deleted: true } : t
            ),
          });

          return { success: true };
        },

        restoreTodo: (id) => {
          const state = get();
          const exists = state.todos.find((t) => t.id === id);
          if (!exists) return { success: false, error: "Todo not found." };

          set({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, deleted: false } : t
            ),
          });

          return { success: true };
        },

        clearCompleted: () => {
          set({
            todos: get().todos.filter(
              (t) => !t.completed || t.deleted // keep deleted to allow undo
            ),
          });
          return { success: true };
        },
      },
    }),
    {
      name: "timora-todos",
    }
  )
);

export const useTodos = () => useTodoStore((s) => s.todos);
export const useTodoActions = () => useTodoStore((s) => s.actions);
