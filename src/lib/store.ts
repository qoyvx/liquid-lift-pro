import { useCallback, useSyncExternalStore } from "react";
import { dateKey, dayForDate, PROGRAM, type DayPlan } from "./program";

export type SetEntry = { done: boolean; weight: string; reps: string; rir: string };
export type Session = {
  dayKey: string;
  sets: Record<string, SetEntry[]>;
  completedAt?: string;
};

export type AppState = {
  profile: { name: string; goalKg: number; startDate: string; sleepTarget: number };
  nutrition: { kcal: number; protein: number; carbs: number; fats: number };
  sessions: Record<string, Session>;
  intake: Record<string, Macros>;
  weights: Record<string, number>;
};

export type Macros = { kcal: number; protein: number; carbs: number; fats: number };

const STORAGE_KEY = "elite-gym-tracker-v1";
const SCHEMA_VERSION = 1;

const defaultState = (): AppState => ({
  profile: {
    name: "Abdeldjalil",
    goalKg: 75,
    startDate: new Date().toISOString().slice(0, 10),
    sleepTarget: 8,
  },
  nutrition: { kcal: 3250, protein: 165, carbs: 402, fats: 110 },
  sessions: {},
  intake: {},
  weights: {},
});

let state: AppState = defaultState();
let hydrated = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

/** Debounced, non-destructive persistence (survives app close / process kill). */
let persistTimer: ReturnType<typeof setTimeout> | null = null;

const writeNow = () => {
  if (typeof window === "undefined") return;
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: SCHEMA_VERSION, ...state }));
  } catch {
    /* ignore */
  }
};

const persist = () => {
  if (typeof window === "undefined") return;
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(writeNow, 250);
};

export const hydrateStore = () => {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      state = {
        ...defaultState(),
        ...parsed,
        profile: { ...defaultState().profile, ...(parsed.profile ?? {}) },
        nutrition: { ...defaultState().nutrition, ...(parsed.nutrition ?? {}) },
        sessions: parsed.sessions ?? {},
        intake: parsed.intake ?? {},
        weights: parsed.weights ?? {},
      };
    }
  } catch {
    /* ignore */
  }
  emit();

  // Never lose in-flight edits when Android backgrounds / kills the WebView.
  window.addEventListener("pagehide", writeNow);
  window.addEventListener("beforeunload", writeNow);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") writeNow();
  });
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const getSnapshot = () => state;
const SERVER_STATE = defaultState();
const getServerSnapshot = () => SERVER_STATE;

export function useStore<T>(selector: (s: AppState) => T): T {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return selector(snapshot);
}

export const setState = (updater: (s: AppState) => AppState) => {
  state = updater(state);
  persist();
  emit();
};

export const emptySets = (count: number): SetEntry[] =>
  Array.from({ length: count }, () => ({ done: false, weight: "", reps: "", rir: "" }));

export const getSession = (s: AppState, key: string, plan: DayPlan): Session => {
  const existing = s.sessions[key];
  const sets: Record<string, SetEntry[]> = {};
  plan.exercises.forEach((e) => {
    const prev = existing?.sets?.[e.id];
    sets[e.id] =
      prev && prev.length === e.sets ? prev : [...emptySets(e.sets)].map((d, i) => prev?.[i] ?? d);
  });
  const completedAt = existing?.completedAt;
  return completedAt ? { dayKey: plan.key, sets, completedAt } : { dayKey: plan.key, sets };
};

export const useSession = (key: string, plan: DayPlan) => {
  const session = useStore((s) => getSession(s, key, plan));

  const updateSet = useCallback(
    (exId: string, index: number, patch: Partial<SetEntry>) => {
      setState((s) => {
        const current = getSession(s, key, plan);
        const arr = (current.sets[exId] ?? []).map((x, i) => (i === index ? { ...x, ...patch } : x));
        return {
          ...s,
          sessions: { ...s.sessions, [key]: { ...current, sets: { ...current.sets, [exId]: arr } } },
        };
      });
    },
    [key, plan],
  );

  const finish = useCallback(() => {
    setState((s) => {
      const current = getSession(s, key, plan);
      return {
        ...s,
        sessions: {
          ...s.sessions,
          [key]: { ...current, completedAt: new Date().toISOString() },
        },
      };
    });
  }, [key, plan]);

  const reset = useCallback(() => {
    setState((s) => {
      const sets: Record<string, SetEntry[]> = {};
      plan.exercises.forEach((e) => (sets[e.id] = emptySets(e.sets)));
      return { ...s, sessions: { ...s.sessions, [key]: { dayKey: plan.key, sets } } };
    });
  }, [key, plan]);

  return { session, updateSet, finish, reset };
};

export const sessionStats = (session: Session) => {
  const all = Object.values(session.sets).flat();
  const done = all.filter((s) => s.done).length;
  return { done, total: all.length, pct: all.length ? done / all.length : 0 };
};

/** Program week 1..12 based on profile start date. */
export const programWeek = (s: AppState) => {
  const start = new Date(s.profile.startDate + "T00:00:00");
  const diff = Math.floor((Date.now() - start.getTime()) / 86_400_000);
  return Math.min(12, Math.max(1, Math.floor(diff / 7) + 1));
};

export const completedWorkouts = (s: AppState) =>
  Object.entries(s.sessions)
    .filter(([, v]) => Boolean(v.completedAt))
    .sort((a, b) => (a[0] < b[0] ? 1 : -1));

export const streak = (s: AppState) => {
  let count = 0;
  const d = new Date();
  for (let i = 0; i < 60; i++) {
    const key = dateKey(d);
    const plan = dayForDate(d);
    if (!plan || plan.rest) {
      d.setDate(d.getDate() - 1);
      continue;
    }
    if (s.sessions[key]?.completedAt) {
      count++;
    } else if (i > 0 || false) {
      break;
    } else {
      // today not done yet — keep looking backwards without breaking
      d.setDate(d.getDate() - 1);
      continue;
    }
    d.setDate(d.getDate() - 1);
  }
  return count;
};

export const weekCompletion = (s: AppState, dates: Date[]) => {
  const trainingDays = PROGRAM.filter((p) => !p.rest).length;
  const done = dates.filter(
    (d, i) => !PROGRAM[i]?.rest && s.sessions[dateKey(d)]?.completedAt,
  ).length;
  return { done, total: trainingDays };
};

export const emptyMacros = (): Macros => ({ kcal: 0, protein: 0, carbs: 0, fats: 0 });

export const addIntake = (key: string, delta: Partial<Macros>) =>
  setState((s) => {
    const current = s.intake[key] ?? emptyMacros();
    return {
      ...s,
      intake: {
        ...s.intake,
        [key]: {
          kcal: Math.max(0, current.kcal + (delta.kcal ?? 0)),
          protein: Math.max(0, current.protein + (delta.protein ?? 0)),
          carbs: Math.max(0, current.carbs + (delta.carbs ?? 0)),
          fats: Math.max(0, current.fats + (delta.fats ?? 0)),
        },
      },
    };
  });

export const resetIntake = (key: string) =>
  setState((s) => ({ ...s, intake: { ...s.intake, [key]: emptyMacros() } }));

export const logBodyWeight = (key: string, kg: number) =>
  setState((s) => ({ ...s, weights: { ...s.weights, [key]: kg } }));

/**
 * Most recent logged performance for an exercise before `beforeKey`.
 * Returns null when there is no history — never invents values.
 */
export const lastPerformance = (
  s: AppState,
  exerciseId: string,
  beforeKey: string,
  setIndex: number,
): { weight: string; reps: string; rir: string; date: string } | null => {
  const keys = Object.keys(s.sessions)
    .filter((k) => k < beforeKey)
    .sort()
    .reverse();
  for (const k of keys) {
    const arr = s.sessions[k]?.sets?.[exerciseId];
    if (!arr?.length) continue;
    const entry = arr[setIndex] ?? [...arr].reverse().find((e) => e.weight || e.reps);
    if (entry && (entry.weight || entry.reps)) {
      return { weight: entry.weight, reps: entry.reps, rir: entry.rir, date: k };
    }
  }
  return null;
};
