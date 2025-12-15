import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";
import { StatsSummary } from "./statsSummary";
import { StatsWeekly } from "./statsWeekly";

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="stats-heading">
      <Card>
        <CardHeader>
          <CardTitle id="stats-heading">{t("stats.title")}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <StatsSummary />
          <Separator />
          <StatsWeekly />
          <Separator />

          <p className="text-xs text-muted-foreground">{t("stats.hint")}</p>
        </CardContent>
      </Card>
    </section>
  );
}
