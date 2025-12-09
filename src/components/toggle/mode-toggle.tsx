import { Moon, Sun, Rainbow } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "./themeProvider";
import type { ThemeMode } from "../../types/type";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [current, setCurrent] = useState<ThemeMode>("light");

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrent(prefersDark ? "dark" : "light");
    } else {
      setCurrent(theme as ThemeMode);
    }
  }, [theme]);

  const toggleTheme = () => {
    const next: ThemeMode =
      current === "light" ? "dark" : current === "dark" ? "pastel" : "light";

    setTheme(next);
    setCurrent(next);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative cursor-pointer text-muted-foreground"
    >
      {current === "light" && <Moon className="h-5 w-5 " />}
      {current === "dark" && <Rainbow className="h-5 w-5" />}
      {current === "pastel" && <Sun className="h-5 w-5" />}
    </Button>
  );
}
