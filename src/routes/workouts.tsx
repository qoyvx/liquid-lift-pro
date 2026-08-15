import { createFileRoute, Link } from "@tanstack/react-router";
import { PROGRAM, dateKey, dayForDate, totalSets, weekDates } from "@/lib/program";
import { useStore } from "@/lib/store";
import { Card, Pill, SectionTitle } from "@/components/app/ui";
import { IconChevron, IconMoon } from "@/components/app/icons";

export const Route = createFileRoute("/workouts")({
  head: () => ({
    meta: [
      { title: "Workouts — Elite Gym Tracker" },
      {
        name: "description",
        content:
          "The full weekly split: Upper and Lower strength, Push, Pull and Legs hypertrophy, with sets, rep ranges and rest.",
      },
      { property: "og:title", content: "Workouts — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Upper, Lower, Push, Pull and Legs sessions with sets, rep ranges and rest times.",
      },
    ],
  }),
  component: Workouts,
});

function Workouts() {
  const today = dayForDate();
  const dates = weekDates();
  const doneFlags = useStore((s) =>
    dates.map((d) => (s.sessions[dateKey(d)]?.completedAt ? "1" : "0")).join(""),
  );

  return (
    <div className="animate-screen space-y-6">
      <header className="pt-2">
        <p className="text-[0.62rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
          Training split
        </p>
        <h1 className="text-[1.7rem] font-extrabold">Workouts</h1>
      </header>

      <SectionTitle hint="Saturday → Friday">This week</SectionTitle>
      <div className="space-y-3">
        {PROGRAM.map((d, i) => (
          <Link
            key={d.key}
            to="/workout/$day"
            params={{ day: d.key }}
            className="press glass glass-sheen block rounded-[var(--radius-2xl)] p-4"
            style={
              d.key === today.key
                ? { boxShadow: "inset 0 1px 0 var(--glass-edge), 0 16px 34px -20px oklch(0.7 0.18 270 / 0.95)" }
                : undefined
            }
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill>{d.label}</Pill>
                  {d.key === today.key && (
                    <span className="text-[0.55rem] font-extrabold tracking-[0.18em] text-accent uppercase">
                      Today
                    </span>
                  )}
                  {doneFlags[i] === "1" && (
                    <span className="text-[0.55rem] font-extrabold tracking-[0.18em] uppercase" style={{ color: "oklch(0.78 0.15 155)" }}>
                      Completed
                    </span>
                  )}
                </div>
                <h2 className="mt-2 truncate text-lg font-extrabold">
                  {d.rest ? "REST / RECOVERY" : `${d.title} — ${d.type}`}
                </h2>
                <p className="num mt-0.5 text-xs text-muted-foreground">
                  {d.rest
                    ? "Sleep, food, light movement"
                    : `${d.exercises.length} exercises · ${totalSets(d)} sets`}
                </p>
              </div>
              {d.rest ? (
                <IconMoon width={18} height={18} className="shrink-0 text-muted-foreground" />
              ) : (
                <IconChevron width={18} height={18} className="shrink-0 text-muted-foreground" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
