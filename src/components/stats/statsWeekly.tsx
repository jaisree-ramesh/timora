import { useTranslation } from "react-i18next";
import { useStatsStore } from "../../stores/statsStore";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export function StatsWeekly() {
  const { t } = useTranslation();
  const history = useStatsStore((s) => s.history);

  const getDays = () => {
    const result: { key: string; label: string }[] = [];
    const today = new Date();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);

      const key = d.toISOString().slice(0, 10);
      const label = `${d.getDate().toString().padStart(2, "0")}/${(
        d.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")} – ${d.toLocaleDateString(undefined, {
        weekday: "short",
      })}`;

      result.push({ key, label });
    }

    return result;
  };

  const days = getDays();

  const chartData = days.map((d) => ({
    label: d.label,
    minutes: history[d.key]?.minutes ?? 0,
  }));

  const chartConfig = {
    minutes: {
      label: t("stats.minutes"),
      color: "var(--chart-1)",
    },
    label: {
      color: "var(--chart-label)",
    },
  } satisfies ChartConfig;

  return (
    <section aria-labelledby="weekly-stats-heading" className="space-y-3">
      <h3
        id="weekly-stats-heading"
        className="text-sm font-medium text-muted-foreground"
      >
        {t("stats.weekly")}
      </h3>

      <ChartContainer config={chartConfig} className="h-[240px]">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ right: 16 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />

          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            hide
          />

          <XAxis type="number" hide />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => [
                  `${value} ${t("stats.min")}`,
                  t("stats.focusTime"),
                ]}
              />
            }
          />

          <Bar
            dataKey="minutes"
            layout="vertical"
            fill="var(--chart-1)"
            radius={6}
          >
            <LabelList
              dataKey="label"
              position="insideLeft"
              offset={8}
              className="fill-[var(--accent-foreground)] text-xs"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </section>
  );
}
