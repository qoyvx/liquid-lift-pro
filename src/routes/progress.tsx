import { createFileRoute } from "@tanstack/react-router";
import { dateKey, PROGRAM, weekDates } from "@/lib/program";
import { programWeek, streak, useStore, weekCompletion } from "@/lib/store";
import { AnimatedNumber, Card, ProgressBar, Ring, SectionTitle } from "@/components/app/ui";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Elite Gym Tracker" },
      {
        name: "description",
        content:
          "Program completion, weekly consistency, set volume and full training history from your logged sessions.",
      },
      { property: "og:title", content: "Progress — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Program completion, weekly consistency, volume and full training history.",
      },
    ],
  }),
  component: Progress,
});

function Progress() {
  const dates = weekDates();
  const week = useStore(programWeek);
  const wk = useStore((s) => weekCompletion(s, dates));
  const st = useStore(streak);
  const sessions = useStore((s) =>
    Object.entries(s.sessions).sort((a, b) => (a[0] < b[0] ? 1 : -1)),
  );
  const totalSetsDone = sessions.reduce(
    (acc, [, v]) => acc + Object.values(v.sets).flat().filter((x) => x.done).length,
    0,
  );
  const totalVolume = sessions.reduce(
    (acc, [, v]) =>
      acc +
      Object.values(v.sets)
        .flat()
        .filter((x) => x.done)
        .reduce((a, x) => a + (parseFloat(x.weight) || 0) * (parseFloat(x.reps) || 0), 0),
    0,
  );
  const completedCount = sessions.filter(([, v]) => v.completedAt).length;
  const planned = PROGRAM.filter((d) => !d.rest).length * 12;

  return (
    <div className="stagger space-y-6">
      <header className="pt-2">
        <p className="text-[0.62rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
          12-week block
        </p>
        <h1 className="text-[1.7rem] font-extrabold">Progress</h1>
      </header>

      <Card className="sheen-sweep p-5">
        <div className="flex items-center gap-5">
          <Ring value={completedCount / planned} size={104} stroke={9}>
            <div className="text-center">
              <p className="num text-2xl leading-none font-extrabold">
                <AnimatedNumber value={completedCount} />
              </p>
              <p className="text-[0.5rem] tracking-[0.14em] text-muted-foreground uppercase">
                sessions
              </p>
            </div>
          </Ring>
          <div className="min-w-0 flex-1 space-y-3">
            <Row label="Program week" value={`${week} / 12`} />
            <ProgressBar value={week / 12} tone="violet" />
            <Row label="This week" value={`${wk.done} / ${wk.total}`} />
            <ProgressBar value={wk.total ? wk.done / wk.total : 0} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Metric label="Sets" value={totalSetsDone} />
        <Metric label="Volume" value={Math.round(totalVolume)} sub="kg" />
        <Metric label="Streak" value={st} />
      </div>

      <section>
        <SectionTitle hint="Sat → Fri">Weekly consistency</SectionTitle>
        <Card className="p-4">
          <div className="grid grid-cols-7 gap-1.5">
            {PROGRAM.map((d, i) => {
              const done = useWeekDone(dates, i);
              return (
                <div key={d.key} className="flex flex-col items-center gap-2">
                  <span className="text-[0.52rem] font-extrabold text-muted-foreground">
                    {d.label}
                  </span>
                  <div
                    className="h-14 w-full rounded-xl transition-all duration-500"
                    style={{
                      background: d.rest
                        ? "oklch(1 0 0 / 0.06)"
                        : done
                          ? "var(--gradient-primary)"
                          : "oklch(1 0 0 / 0.11)",
                      opacity: d.rest ? 0.6 : 1,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>Training history</SectionTitle>
        {sessions.length === 0 ? (
          <Card className="p-5 text-center">
            <p className="text-xs text-muted-foreground">
              Nothing logged yet. Completed sets and sessions will build your history here.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {sessions.map(([d, s]) => {
              const plan = PROGRAM.find((p) => p.key === s.dayKey);
              const done = Object.values(s.sets).flat().filter((x) => x.done).length;
              const total = Object.values(s.sets).flat().length;
              if (done === 0) return null;
              return (
                <Card key={d} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {plan?.title} — {plan?.type}
                      </p>
                      <p className="num text-[0.68rem] text-muted-foreground">{d}</p>
                    </div>
                    <span
                      className="num shrink-0 text-[0.68rem] font-bold"
                      style={{ color: s.completedAt ? "oklch(0.78 0.15 155)" : undefined }}
                    >
                      {done}/{total} sets
                    </span>
                  </div>
                  <ProgressBar value={total ? done / total : 0} className="mt-3 h-1.5" />
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function useWeekDone(dates: Date[], i: number) {
  const k = dateKey(dates[i] as Date);
  return useStore((s) => Boolean(s.sessions[k]?.completedAt));
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="num text-sm font-extrabold">{value}</span>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card className="p-4 text-center">
      <p className="num text-xl font-extrabold">
        <AnimatedNumber value={value} />
      </p>
      <p className="text-[0.55rem] tracking-[0.14em] text-muted-foreground uppercase">
        {sub ? `${label} · ${sub}` : label}
      </p>
    </Card>
  );
}
