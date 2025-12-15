import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../stores/settingStore";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import AccessibleSlider from "./accessibleSlider";
import ToggleRow from "./toggleRow";
import { ModeToggle } from "../toggle/mode-toggle";
import { LanguageToggle } from "../toggle/languageToggle";

export function SettingsPanel() {
  const { t } = useTranslation();

  const {
    pomodoroDuration,
    shortBreak,
    longBreak,
    longBreakInterval,
    autoStartPomodoro,
    autoStartBreaks,
    soundOn,
    volume,
  } = useSettingsStore((s) => s);

  const actions = useSettingsStore((s) => s.actions);

  return (
    <>
      {/* HEADER */}
      <DialogHeader>
        <DialogTitle className="text-muted-foreground text-xl">
          {t("settings.title")}
        </DialogTitle>
      </DialogHeader>
      <Separator />
      {/* CONTENT GRID */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          {/* APPEARANCE */}
          <section
            className="space-y-4 mb-4"
            aria-labelledby="appearance-heading"
          >
            <div
              id="appearance-heading"
              className=" font-medium text-muted-foreground text-base"
            >
              {t("settings.appearance")}
            </div>

            <div className="flex items-start justify-start gap-5">
              <ModeToggle />
              <LanguageToggle />
            </div>
          </section>

          <Separator className="mb-3" />

          {/* BEHAVIOR */}
          <fieldset className="space-y-4 mb-4">
            <legend className="text-base font-medium text-muted-foreground">
              {t("settings.behavior")}
            </legend>

            <ToggleRow
              id="auto-start-pomodoro"
              label={t("settings.autoStartPomodoro")}
              checked={autoStartPomodoro}
              onChange={actions.toggleAutoStartPomodoro}
            />

            <ToggleRow
              id="auto-start-breaks"
              label={t("settings.autoStartBreaks")}
              checked={autoStartBreaks}
              onChange={actions.toggleAutoStartBreaks}
            />
          </fieldset>
          <Separator className="mb-3" />

          {/* SOUND */}
          <fieldset className="space-y-6">
            <legend className="text-sm font-medium text-muted-foreground">
              {t("settings.sound")}
            </legend>

            <ToggleRow
              id="sound-toggle"
              label={t("settings.soundOn")}
              checked={soundOn}
              onChange={actions.toggleSound}
            />

            <AccessibleSlider
              id="volume-slider"
              label={`${t("settings.volume")}: ${(volume * 100).toFixed(0)}%`}
              value={Math.round(volume * 100)}
              min={0}
              max={100}
              step={1}
              onChange={(v) => actions.setVolume(v / 100)}
              unit="%"
            />
          </fieldset>
        </div>

        <div className="space-y-8">
          {/* TIMER DURATIONS */}
          <fieldset className="space-y-6">
            <legend className="text-base font-medium text-muted-foreground">
              {t("settings.timerDurations")}
            </legend>

            <AccessibleSlider
              id="pomodoro-duration"
              label={t("settings.pomodoro")}
              value={pomodoroDuration}
              min={10}
              max={60}
              onChange={actions.setPomodoroDuration}
            />

            <AccessibleSlider
              id="short-break"
              label={t("settings.shortBreak")}
              value={shortBreak}
              min={1}
              max={30}
              onChange={actions.setShortBreak}
              unit={t("settings.min")}
            />

            <AccessibleSlider
              id="long-break"
              label={t("settings.longBreak")}
              value={longBreak}
              min={5}
              max={60}
              onChange={actions.setLongBreak}
              unit={t("settings.min")}
            />

            <AccessibleSlider
              id="long-break-interval"
              label={t("settings.longBreakInterval")}
              value={longBreakInterval}
              min={1}
              max={10}
              onChange={actions.setLongBreakInterval}
              unit={t("settings.sessions")}
            />
          </fieldset>
        </div>
      </div>
    </>
  );
}
