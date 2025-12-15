import { useTranslation } from "react-i18next";
import { useTodoShortcuts } from "./useTodoShortcuts";
import { useTodoUiActions } from "../../stores/todoUiStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TodoFilters } from "./todoFilters";
import { TodoInput } from "./todoInput";
import { TodoList } from "./todoList";

export function TodoSection() {
  const { t } = useTranslation();
  const { setSelected } = useTodoUiActions();
  useTodoShortcuts({
    beginEdit: () => {
      const el = document.activeElement as HTMLElement | null;
      el?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    },
  });

  return (
    <section aria-labelledby="todo-heading" className="h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle id="todo-heading" className="text-lg font-semibold">
            {t("todo.title")}
          </CardTitle>

          <div className="pt-2">
            <TodoFilters />
          </div>
        </CardHeader>

        <CardContent className="flex-1 min-h-0 flex flex-col gap-4">
          <TodoInput />
          <div
            className="flex-1 min-h-0 pr-1"
            onClick={() => setSelected(null)}
          >
            <TodoList />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
