import { useEffect } from "react";
import { useTodoActions, useTodos } from "../../stores/todoStore";
import { useTodoUi } from "../../stores/todoUiStore";

export function useTodoShortcuts(opts: { beginEdit: () => void }) {
  const todos = useTodos();
  const { selectedId } = useTodoUi();
  const { deleteTodo, toggleTodo } = useTodoActions();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.getAttribute("contenteditable") === "true";

      if (inInput) return;
      if (!selectedId) return;

      const exists = todos.some((t) => t.id === selectedId);
      if (!exists) return;

      // Edit
      if (e.key.toLowerCase() === "e") {
        e.preventDefault();
        opts.beginEdit();
        return;
      }

      // Toggle complete
      if (e.key === " ") {
        e.preventDefault();
        toggleTodo(selectedId);
        return;
      }

      // Delete
      if (
        e.key === "Delete" ||
        e.key === "Backspace" ||
        ((e.metaKey || e.ctrlKey) && e.key === "Backspace")
      ) {
        e.preventDefault();
        deleteTodo(selectedId);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, todos, deleteTodo, toggleTodo, opts]);
}
