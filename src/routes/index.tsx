import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  dateKey,
  dayForDate,
  PROGRAM,
  rirForWeek,
  totalSets,
  weekDates,
  type DayPlan,
} from "@/lib/program";
import {
  addIntake,
  emptyMacros,
  getSession,
  programWeek,
  resetIntake,
  sessionStats,
  streak,
  useStore,
  weekCompletion,
} from "@/lib/store";
import { tipForDate } from "@/lib/coaching";
import { AnimatedNumber, Card, Pill, ProgressBar, Ring, SectionTitle } from "@/components/app/ui";
import { IconBolt, IconChevron, IconFlame, IconMoon, IconPlate, IconTimer } from "@/components/app/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Elite Gym Tracker" },
      {
        name: "description",
        content:
          "Your daily training command center: today's session, weekly split, program progress, nutrition and coaching.",
      },
      { property: "og:title", content: "Today — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Today's session, weekly split, program progress, nutrition and coaching.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const today = new Date();
  const plan = dayForDate(today);
  const key = dateKey(today);
  const dates = weekDates(today);
  const week = useStore(programWeek);
  const session = useStore((s) => getSession(s, key, plan));
  const stats = sessionStats(session);
  const nutrition = useStore((s) => s.nutrition);
  const intake = useStore((s) => s.intake[key] ?? emptyMacros());
  const profile = useStore((s) => s.profile);
  const wk = useStore((s) => weekCompletion(s, dates));
  const st = useStore(streak);
  const completed = useStore((s) =>
    Object.entries(s.sessions)
      .filter(([, v]) => v.completedAt)
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 4),
  );
  const totalCompleted = useStore(
    (s) => Object.values(s.sessions).filter((v) => v.completedAt).length,
  );
  const doneFlags = useStore((s) =>
    dates.map((d) => (s.sessions[dateKey(d)]?.completedAt ? "1" : "0")).join(""),
  );
  const tip = tipForDate(today);
  const [tipOpen, setTipOpen] = useState(false);

  const trainingDaysPerBlock = PROGRAM.filter((d) => !d.rest).length * 12;

  return (
    <div className="stagger space-y-7">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pt-2">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
            Week {week} / 12 · {rirForWeek(week)}
          </p>
          <h1 className="truncate text-[1.7rem] leading-tight font-extrabold">
            <span className="text-gradient">ABDELDJALIL</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            {plan.rest ? "Rest & recovery day" : `Today · ${plan.title} — ${plan.type}`}
          </p>
        </div>
        <Link
          to="/settings"
          className="press glass grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
        >
          <span className="font-display text-base font-extrabold">A</span>
        </Link>
      </header>

      {/* Hero */}
      <section>
        <Card className="sheen-sweep p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Pill>{plan.label} · {plan.type}</Pill>
              <h2 className="mt-3 text-3xl font-extrabold">{plan.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {plan.rest
                  ? "No training scheduled — prioritise sleep and food."
                  : `${plan.exercises.length} exercises · ${totalSets(plan)} working sets`}
              </p>
            </div>
            <Ring value={plan.rest ? 1 : stats.pct} size={82} stroke={7}>
              <div className="text-center">
                <p className="num text-lg leading-none font-extrabold">
                  {plan.rest ? "—" : <><AnimatedNumber value={stats.pct * 100} />%</>}
                </p>
                <p className="text-[0.55rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {plan.rest ? "rest" : "done"}
                </p>
              </div>
            </Ring>
          </div>

          {!plan.rest && (
            <>
              <div className="mt-4 flex items-center justify-between text-[0.68rem] text-muted-foreground">
                <span className="num">
                  {stats.done} / {stats.total} sets completed
                </span>
                <span>Goal {profile.goalKg} KG</span>
              </div>
              <ProgressBar value={stats.pct} className="mt-2" />
              <Link
                to="/workout/$day"
                params={{ day: plan.key }}
                className="press mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-[0.14em] uppercase"
                style={{
                  background: "var(--gradient-primary)",
                  color: "oklch(0.14 0.035 265)",
                  boxShadow: "0 14px 30px -14px oklch(0.7 0.18 275 / 0.95)",
                }}
              >
                <IconBolt width={17} height={17} />
                {stats.done > 0 ? "Continue workout" : "Start workout"}
              </Link>
            </>
          )}
          {plan.rest && (
            <Link
              to="/coach"
              className="press glass-soft mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold tracking-[0.14em] uppercase"
            >
              Read recovery guidance
            </Link>
          )}
        </Card>
      </section>

      {/* Weekly schedule */}
      <section>
        <SectionTitle hint={`${wk.done}/${wk.total} sessions`}>Weekly schedule</SectionTitle>
        <div className="grid grid-cols-7 gap-1.5">
          {PROGRAM.map((d, i) => {
            const isToday = d.key === plan.key;
            const done = doneFlags[i] === "1";
            return (
              <Link
                key={d.key}
                to="/workout/$day"
                params={{ day: d.key }}
                className={`press-deep flex flex-col items-center justify-center gap-1 rounded-2xl py-2.5 text-center transition-all duration-500 ${
                  isToday ? "glass scale-[1.04]" : "glass-soft"
                }`}
                style={
                  isToday
                    ? { boxShadow: "inset 0 1px 0 var(--glass-edge), 0 10px 22px -14px oklch(0.7 0.18 270 / 0.9)" }
                    : undefined
                }
              >
                <span
                  className="text-[0.55rem] font-extrabold tracking-[0.06em]"
                  style={{ color: isToday ? "oklch(0.95 0.01 260)" : "oklch(0.62 0.03 262)" }}
                >
                  {d.label}
                </span>
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[0.5rem] font-bold transition-all duration-500 ${done ? "animate-pop" : ""}`}
                  style={{
                    background: d.rest
                      ? "oklch(1 0 0 / 0.08)"
                      : done
                        ? "var(--gradient-primary)"
                        : "oklch(1 0 0 / 0.12)",
                    color: done ? "oklch(0.14 0.035 265)" : "oklch(0.8 0.02 262)",
                  }}
                >
                  {d.rest ? "·" : done ? "✓" : d.title.charAt(0)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Program progress */}
      <section>
        <SectionTitle hint={`Week ${week} of 12`}>Program progress</SectionTitle>
        <Card>
          <div className="flex items-center gap-4">
            <Ring value={week / 12} size={78} stroke={7} tone="oklch(0.68 0.19 300)">
              <div className="text-center">
                <p className="num text-lg leading-none font-extrabold">{week}</p>
                <p className="text-[0.5rem] tracking-[0.14em] text-muted-foreground uppercase">
                  / 12 wk
                </p>
              </div>
            </Ring>
            <div className="min-w-0 flex-1 space-y-3">
              <Stat label="Workouts completed" value={totalCompleted} sub={`of ${trainingDaysPerBlock} planned`} />
              <ProgressBar value={totalCompleted / trainingDaysPerBlock} tone="violet" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <IconFlame width={14} height={14} />
                <span className="num">
                  {st > 0 ? `${st} session streak` : "No streak yet — log a session"}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Recovery */}
      <section>
        <SectionTitle>Recovery & readiness</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <IconMoon width={18} height={18} className="text-accent" />
            <p className="num mt-2 text-2xl font-extrabold">7–9h</p>
            <p className="text-[0.65rem] text-muted-foreground">Sleep target</p>
          </Card>
          <Card className="p-4">
            <IconTimer width={18} height={18} className="text-accent" />
            <p className="num mt-2 text-2xl font-extrabold">{PROGRAM.filter((d) => d.rest).length}</p>
            <p className="text-[0.65rem] text-muted-foreground">Rest days / week</p>
          </Card>
        </div>
        <Card className="mt-3 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            If performance repeatedly drops or recovery is poor, reduce training stress rather than
            forcing progression. Current intensity target:{" "}
            <span className="font-bold text-foreground">{rirForWeek(week)}</span>.
          </p>
        </Card>
      </section>

      {/* Nutrition */}
      <section>
        <SectionTitle hint="Tap to log">Nutrition — today</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <MacroCard
            label="Calories"
            unit="kcal"
            value={intake.kcal}
            target={nutrition.kcal}
            step={250}
            onAdd={(v) => addIntake(key, { kcal: v })}
          />
          <MacroCard
            label="Protein"
            unit="g"
            value={intake.protein}
            target={nutrition.protein}
            step={20}
            onAdd={(v) => addIntake(key, { protein: v })}
          />
          <MacroCard
            label="Carbs"
            unit="g"
            value={intake.carbs}
            target={nutrition.carbs}
            step={50}
            onAdd={(v) => addIntake(key, { carbs: v })}
          />
          <MacroCard
            label="Fats"
            unit="g"
            value={intake.fats}
            target={nutrition.fats}
            step={10}
            onAdd={(v) => addIntake(key, { fats: v })}
          />
        </div>
        <button
          onClick={() => resetIntake(key)}
          className="press glass-soft mt-3 w-full rounded-2xl py-2.5 text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase"
        >
          Reset today's intake
        </button>
      </section>

      {/* Coaching tip */}
      <section>
        <SectionTitle hint="Daily">Today's coaching tip</SectionTitle>
        <Card onClick={() => setTipOpen((o) => !o)} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Pill>Principle</Pill>
              <h3 className="mt-3 text-xl font-extrabold">{tip.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{tip.short}</p>
            </div>
            <IconChevron
              width={18}
              height={18}
              className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300"
              style={{ transform: tipOpen ? "rotate(90deg)" : "none" }}
            />
          </div>
          {tipOpen && (
            <div className="animate-rise mt-4 space-y-3 border-t border-white/10 pt-4">
              <Block title="Why it matters" body={tip.why} />
              <Block title="Apply it to your program" body={tip.apply} />
            </div>
          )}
        </Card>
      </section>

      {/* Principles shortcut */}
      <section>
        <SectionTitle hint="18 topics">Training principles</SectionTitle>
        <Link to="/coach" className="press glass glass-sheen flex items-center gap-3 rounded-[var(--radius-2xl)] p-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
            <IconPlate width={20} height={20} style={{ color: "oklch(0.14 0.035 265)" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Open the coach library</p>
            <p className="truncate text-xs text-muted-foreground">
              Overload, double progression, RIR, volume, periodization…
            </p>
          </div>
          <IconChevron width={16} height={16} className="shrink-0 text-muted-foreground" />
        </Link>
      </section>

      {/* Recent activity */}
      <section>
        <SectionTitle>Recent activity</SectionTitle>
        {completed.length === 0 ? (
          <Card className="p-5 text-center">
            <p className="text-xs text-muted-foreground">
              No completed sessions logged yet. Finish a workout and it will appear here.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {completed.map(([d, s]) => {
              const p = PROGRAM.find((x) => x.key === s.dayKey);
              const done = Object.values(s.sets).flat().filter((x) => x.done).length;
              return (
                <Card key={d} className="flex items-center gap-3 p-4">
                  <div className="glass-soft grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[0.6rem] font-extrabold">
                    {p?.label ?? "—"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {p?.title} — {p?.type}
                    </p>
                    <p className="num text-[0.68rem] text-muted-foreground">
                      {d} · {done} sets
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
      <p className="num text-xl font-extrabold">
        <AnimatedNumber value={value} />{" "}
        <span className="text-[0.62rem] font-medium text-muted-foreground">{sub}</span>
      </p>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent uppercase">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function MacroCard({
  label,
  unit,
  value,
  target,
  step,
  onAdd,
}: {
  label: string;
  unit: string;
  value: number;
  target: number;
  step: number;
  onAdd: (v: number) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[0.6rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </p>
        <p className="num text-[0.6rem] text-muted-foreground">
          {target} {unit}
        </p>
      </div>
      <p className="num mt-1 text-2xl font-extrabold">
        <AnimatedNumber value={value} duration={600} />
      </p>
      <ProgressBar value={target ? value / target : 0} className="mt-2 h-1.5" />
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <button
          onClick={() => onAdd(-step)}
          className="press-deep glass-soft num rounded-xl py-1.5 text-[0.65rem] font-bold"
        >
          −{step}
        </button>
        <button
          onClick={() => onAdd(step)}
          className="press-deep glass-soft num rounded-xl py-1.5 text-[0.65rem] font-bold"
        >
          +{step}
        </button>
      </div>
    </Card>
  );
}
