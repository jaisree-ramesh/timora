import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoState {
  todos: TodoItem[];

  actions: {
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
    reorderTodos: (from: number, to: number) => void;
  };
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      actions: {
        /** ADD */
        addTodo: (text) => {
          const newTodo: TodoItem = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
          };

          set({
            todos: [...get().todos, newTodo],
          });
        },

        /** TOGGLE COMPLETE */
        toggleTodo: (id) => {
          set({
            todos: get().todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          });
        },

        /** EDIT TODO TEXT */
        editTodo: (id, text) => {
          set({
            todos: get().todos.map((todo) =>
              todo.id === id ? { ...todo, text } : todo
            ),
          });
        },

        /** DELETE TODO */
        deleteTodo: (id) => {
          set({
            todos: get().todos.filter((todo) => todo.id !== id),
          });
        },

        /** CLEAR COMPLETED TASKS */
        clearCompleted: () => {
          set({
            todos: get().todos.filter((todo) => !todo.completed),
          });
        },

        /** DRAG-AND-DROP REORDERING */
        reorderTodos: (from, to) => {
          const list = [...get().todos];
          const [moved] = list.splice(from, 1);
          list.splice(to, 0, moved);

          set({ todos: list });
        },
      },
    }),
    {
      name: "timora-todo",
    }
  )
);

export const useTodos = () => useTodoStore((s) => s.todos);
export const useTodoActions = () => useTodoStore((s) => s.actions);
