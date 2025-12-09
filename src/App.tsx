import { LanguageToggle } from "./components/toggle/languageToggle";
import { ModeToggle } from "./components/toggle/mode-toggle";
import { TimerSection } from "./components/timer/timerSection";
import { SettingsDialog } from "./components/settings/settingsDialog";
import { useSettingsStore } from "./stores/settingStore";
import { useEffect } from "react";

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
      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Timer Section */}
        <section id="timer">
          <TimerSection />
        </section>

        {/* Todo Section */}
        <section id="todos">
          <div className="bg-card p-6 rounded-md shadow-sm border border-border">
            <h2 className="text-lg font-medium mb-2">To-Do List</h2>
            {/* TodoList component will go here */}
            Work in progress...
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats">
          <div className="bg-card p-6 rounded-md shadow-sm border border-border">
            <h2 className="text-lg font-medium mb-2">Stats</h2>
            {/* StatsSummary will go here */}
            Work in progress...
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
