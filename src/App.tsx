import { LanguageToggle } from "./components/toggle/languageToggle";
import { ModeToggle } from "./components/toggle/mode-toggle";
import { TimerSection } from "./components/timer/timerSection";
import { SettingsDialog } from "./components/settings/settingsDialog";
import { useSettingsStore } from "./stores/settingStore";
import { useEffect } from "react";
import { StatsSection } from "./components/stats/statsSection";
import { TodoSection } from "./components/todo/todoSection";

function App() {
  useEffect(() => {
    useSettingsStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Timora</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageToggle />
          <SettingsDialog />
        </div>
      </header>

      {/* MAIN */}
      <main className="min-h-[calc(100vh-4rem)] p-6 flex">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 my-auto w-full">
          <div className="lg:col-span-1 ">
            <TimerSection />
          </div>
          <div className="lg:col-span-2 space-y-6  max-h-[500px] overflow-y-auto">
            <TodoSection />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <StatsSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
