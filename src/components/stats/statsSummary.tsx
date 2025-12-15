import { useTranslation } from "react-i18next";
import { useStatsStore } from "@/stores/statsStore";

export function StatsSummary() {
  const { t } = useTranslation();
  const { totalMinutes, totalSessions, streak } = useStatsStore((s) => s);

  const formatMinutes = (total: number) => {
    if (total <= 0) return `0 ${t("stats.min", "min")}`;

    const h = Math.floor(total / 60);
    const m = total % 60;

    if (h === 0) return `${m} ${t("stats.min", "min")}`;
    if (m === 0) return `${h} ${t("stats.h", "h")}`;
    return `${h} ${t("stats.h", "h")} ${m} ${t("stats.min", "min")}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("stats.focusTime")}
        </span>
        <div className="text-xl font-semibold">
          {formatMinutes(totalMinutes)}
        </div>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("stats.sessions")}
        </span>
        <div className="text-xl font-semibold">{totalSessions}</div>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("stats.streak")}
        </span>
        <div className="text-xl font-semibold">{streak}</div>
      </div>
    </div>
  );
}
