import { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical } from "lucide-react";
import { useTodoActions } from "@/stores/todoStore";
import { useTodoUi, useTodoUiActions } from "@/stores/todoUiStore";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoItemRow({ id, text, completed }: Props) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoActions();
  const { selectedId } = useTodoUi();
  const { setSelected } = useTodoUiActions();
  const isSelected = selectedId === id;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setDraft(text);
  }, [text]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    const next = draft.trim();
    if (next && next !== text) editTodo(id, next);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(text);
    setEditing(false);
  };

  // dnd-kit sortable
  const sortable = useSortable({ id });
  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(sortable.transform),
      transition: sortable.transition,
    }),
    [sortable.transform, sortable.transition]
  );

  return (
    <li
      ref={sortable.setNodeRef}
      style={style}
      className={cn(
        "group flex items-center justify-between gap-2 rounded-md border p-2",
        isSelected ? "border-ring ring-2 ring-ring/30" : "border-border"
      )}
      role="listitem"
      aria-label={text}
      tabIndex={0}
      onFocus={() => setSelected(id)}
      onClick={() => setSelected(id)}
      onDoubleClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !editing) setEditing(true);
        if (e.key === "Escape" && editing) cancel();
      }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* drag handle (keyboard + mouse) */}
        <button
          type="button"
          className="cursor-grab inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={t("todo.reorder")}
          {...sortable.attributes}
          {...sortable.listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleTodo(id)}
          aria-label={completed ? t("todo.incomplete") : t("todo.complete")}
        />

        {!editing ? (
          <span
            className={cn(
              "text-sm truncate",
              completed && "line-through text-muted-foreground"
            )}
          >
            {text}
          </span>
        ) : (
          <Input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
            aria-label={t("todo.editTodo")}
            className="h-8"
          />
        )}
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => deleteTodo(id)}
        aria-label={t("todo.deleteTask", { task: text })}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
