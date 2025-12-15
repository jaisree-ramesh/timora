import {
  useTodoUi,
  useTodoUiActions,
  type TodoFilter,
} from "@/stores/todoUiStore";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useTranslation } from "react-i18next";

export function TodoFilters() {
  const { filter } = useTodoUi();
  const { setFilter } = useTodoUiActions();
  const {t} = useTranslation();

  return (
    <ToggleGroup
      type="single"
      value={filter}
      onValueChange={(v) => v && setFilter(v as TodoFilter)}
      aria-label="Filter todos"
      className="justify-start"
    >
      <ToggleGroupItem value="all" aria-label="All">
       {t('todo.all')}
      </ToggleGroupItem>
      <ToggleGroupItem value="active" aria-label="Active">
        {t('todo.active')}
      </ToggleGroupItem>
      <ToggleGroupItem value="completed" aria-label="Completed">
        {t('todo.completed')}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
