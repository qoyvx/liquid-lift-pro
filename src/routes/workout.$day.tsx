import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { dateKey, dayByKey, PROGRAM, rirForWeek, totalSets, type DayPlan } from "@/lib/program";
import { lastPerformance, programWeek, sessionStats, useSession, useStore } from "@/lib/store";
import { Card, Pill, ProgressBar, Ring, SectionTitle } from "@/components/app/ui";
import { IconCheck, IconChevron, IconReset, IconTimer } from "@/components/app/icons";
import { useRestTimer } from "@/components/app/RestTimer";

export const Route = createFileRoute("/workout/$day")({
  head: () => ({
    meta: [
      { title: "Session — Elite Gym Tracker" },
      {
        name: "description",
        content: "Track sets, load, reps and RIR for the session with an automatic rest timer.",
      },
      { property: "og:title", content: "Session — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Log load, reps and RIR set by set with an automatic premium rest timer.",
      },
    ],
  }),
  component: WorkoutSession,
});

function WorkoutSession() {
  const { day } = useParams({ from: "/workout/$day" });
  const plan = dayByKey(day) ?? (PROGRAM[0] as DayPlan);
  const key = dateKey();
  const week = useStore(programWeek);
  const { session, updateSet, finish, reset } = useSession(key, plan);
  const stats = sessionStats(session);
  const { start } = useRestTimer();
  const [open, setOpen] = useState<string | null>(plan.exercises[0]?.id ?? null);
  const history = useStore((s) => s.sessions);

  if (plan.rest) {
    return (
      <div className="stagger space-y-5 pt-2">
        <BackLink />
        <Card className="p-6 text-center">
          <Pill>{plan.label}</Pill>
          <h1 className="mt-3 text-2xl font-extrabold">REST / RECOVERY</h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            No training scheduled. Adaptation happens now: target 7–9 hours of sleep, hit your
            calorie and protein targets, and keep movement light.
          </p>
          <Link
            to="/coach"
            className="press glass-soft mt-5 block rounded-2xl py-3 text-xs font-bold tracking-[0.16em] uppercase"
          >
            Recovery guidance
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="stagger space-y-6">
      <BackLink />

      <Card className="sheen-sweep p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Pill>{plan.label} · {plan.type}</Pill>
            <h1 className="mt-3 text-3xl font-extrabold">{plan.title}</h1>
            <p className="num mt-1 text-xs text-muted-foreground">
              {plan.exercises.length} exercises · {totalSets(plan)} sets · target {rirForWeek(week)}
            </p>
          </div>
          <Ring value={stats.pct} size={78} stroke={7}>
            <p className="num text-base font-extrabold">{Math.round(stats.pct * 100)}%</p>
          </Ring>
        </div>
        <ProgressBar value={stats.pct} className="mt-4" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={finish}
            disabled={stats.done === 0}
            className="press rounded-2xl py-3 text-xs font-extrabold tracking-[0.14em] uppercase disabled:opacity-40"
            style={{
              background: "var(--gradient-primary)",
              color: "oklch(0.14 0.035 265)",
            }}
          >
            {session.completedAt ? "Session saved" : "Finish session"}
          </button>
          <button
            onClick={reset}
            className="press glass-soft flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold tracking-[0.14em] uppercase"
          >
            <IconReset width={14} height={14} /> Reset
          </button>
        </div>
      </Card>

      <SectionTitle hint="Tap to expand">Exercises</SectionTitle>
      <div className="space-y-3">
        {plan.exercises.map((exercise) => {
          const sets = session.sets[exercise.id] ?? [];
          const doneCount = sets.filter((s) => s.done).length;
          const expanded = open === exercise.id;
          return (
            <div
              key={exercise.id}
              className="glass glass-sheen overflow-hidden rounded-[var(--radius-2xl)] transition-all duration-300"
              style={
                expanded
                  ? { boxShadow: "0 22px 46px -22px oklch(0.05 0.04 265 / 0.95), inset 0 1px 0 var(--glass-edge)" }
                  : undefined
              }
            >
              <button
                onClick={() => setOpen(expanded ? null : exercise.id)}
                className="press-deep flex w-full items-center gap-3 p-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{exercise.name}</p>
                  <p className="num mt-0.5 text-[0.68rem] text-muted-foreground">
                    {exercise.sets} × {exercise.reps} · {exercise.rest}s rest
                  </p>
                </div>
                <span className="num shrink-0 text-[0.68rem] text-muted-foreground">
                  {doneCount}/{exercise.sets}
                </span>
                <IconChevron
                  width={16}
                  height={16}
                  className="shrink-0 text-muted-foreground transition-transform duration-300"
                  style={{ transform: expanded ? "rotate(90deg)" : "none" }}
                />
              </button>

              {expanded && (
                <div className="animate-rise space-y-2 border-t border-white/10 p-3">
                  <div className="grid grid-cols-[1.6rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_2.2rem] gap-1.5 px-1 text-[0.52rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                    <span>Set</span>
                    <span>KG</span>
                    <span>Reps</span>
                    <span>RIR</span>
                    <span />
                  </div>
                  {sets.map((s, i) => (
                    <SetRow
                      key={i}
                      index={i}
                      entry={s}
                      prev={lastPerformance({ sessions: history } as never, exercise.id, key, i)}
                      onChange={(patch) => updateSet(exercise.id, i, patch)}
                      onToggle={(next) => {
                        updateSet(exercise.id, i, { done: next });
                        if (next) start(exercise.rest, exercise.name, `Set ${i + 1} of ${exercise.sets}`);
                      }}
                      repsPlaceholder={exercise.reps}
                    />
                  ))}
                  {false && sets.map((s, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1.6rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_2.2rem] items-center gap-1.5"
                    >
                      <span className="num text-center text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <NumField
                        value={s.weight}
                        onChange={(v) => updateSet(exercise.id, i, { weight: v })}
                        placeholder="—"
                      />
                      <NumField
                        value={s.reps}
                        onChange={(v) => updateSet(exercise.id, i, { reps: v })}
                        placeholder={exercise.reps}
                      />
                      <NumField
                        value={s.rir}
                        onChange={(v) => updateSet(exercise.id, i, { rir: v })}
                        placeholder="RIR"
                      />
                      <button
                        onClick={() => {
                          const next = !s.done;
                          updateSet(exercise.id, i, { done: next });
                          if (next) start(exercise.rest, exercise.name, `Set ${i + 1} of ${exercise.sets}`);
                        }}
                        aria-label={`Complete set ${i + 1}`}
                        className="press-deep grid h-9 w-9 place-items-center rounded-xl transition-all duration-300"
                        style={{
                          background: s.done ? "var(--gradient-primary)" : "oklch(1 0 0 / 0.07)",
                          color: s.done ? "oklch(0.14 0.035 265)" : "oklch(0.68 0.03 262)",
                          border: "1px solid color-mix(in oklab, white 12%, transparent)",
                          boxShadow: s.done
                            ? "0 8px 20px -10px oklch(0.7 0.18 270 / 0.9)"
                            : "none",
                        }}
                      >
                        <IconCheck
                          width={15}
                          height={15}
                          className={s.done ? "animate-pop" : ""}
                        />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => start(exercise.rest, exercise.name, "Manual rest")}
                    className="press glass-soft mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[0.62rem] font-bold tracking-[0.16em] uppercase"
                  >
                    <IconTimer width={13} height={13} /> Start {exercise.rest}s rest
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/workouts"
      className="press glass-soft inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.62rem] font-bold tracking-[0.16em] uppercase"
    >
      <IconChevron width={13} height={13} style={{ transform: "rotate(180deg)" }} /> All workouts
    </Link>
  );
}

function NumField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="field-glow min-w-0 rounded-xl">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, "").slice(0, 5))}
        inputMode="decimal"
        placeholder={placeholder}
        className="num glass-soft w-full min-w-0 rounded-xl px-2 py-2 text-center text-sm font-bold transition-all duration-300 placeholder:text-[0.62rem] placeholder:font-medium placeholder:text-muted-foreground/70 focus:brightness-110"
      />
    </div>
  );
}
