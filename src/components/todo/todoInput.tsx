import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTodoStore } from "../../stores/todoStore";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

export function TodoInput() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const addTodo = useTodoStore((s) => s.actions.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4"
      aria-label={t("todo.addTaskForm")}
    >
      <Input
        placeholder={t("todo.placeholder")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label={t("todo.addTask")}
      />

      <Button
        type="submit"
        size="icon"
        variant="default"
        aria-label={t("todo.addTask")}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}
