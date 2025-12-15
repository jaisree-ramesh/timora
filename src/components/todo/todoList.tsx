import { useMemo } from "react";
import { useTodos, useTodoActions } from "@/stores/todoStore";
import { useTodoUi } from "@/stores/todoUiStore";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { TodoItemRow } from "./todoItemRow";
import { useTranslation } from "react-i18next";

export function TodoList() {
  const todos = useTodos();
  const { reorderTodos } = useTodoActions();
  const { filter } = useTodoUi();
const {t} = useTranslation();
  const visible = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const ids = useMemo(() => visible.map((t) => t.id), [visible]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = todos.findIndex((t) => t.id === active.id);
    const to = todos.findIndex((t) => t.id === over.id);
    if (from === -1 || to === -1) return;

    reorderTodos(from, to);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2" role="list" aria-label={t("todo.title")}>
          {visible.map((todo) => (
            <TodoItemRow
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
