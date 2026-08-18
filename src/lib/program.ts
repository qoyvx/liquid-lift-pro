export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // seconds
};

export type DayPlan = {
  key: DayKey;
  weekday: number; // JS getDay(): 0=Sun
  label: string; // SAT
  fullLabel: string;
  title: string; // UPPER
  type: string; // STRENGTH
  rest: boolean;
  exercises: Exercise[];
};

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const ex = (id: string, name: string, sets: number, reps: string, rest: number): Exercise => ({
  id,
  name,
  sets,
  reps,
  rest,
});

export const PROGRAM: DayPlan[] = [
  {
    key: "mon",
    weekday: 1,
    label: "MON",
    fullLabel: "Monday",
    title: "REST",
    type: "RECOVERY",
    rest: true,
    exercises: [],
  },
  {
    key: "tue",
    weekday: 2,
    label: "TUE",
    fullLabel: "Tuesday",
    title: "PUSH",
    type: "HYPERTROPHY",
    rest: false,
    exercises: [
      ex("tue-1", "Incline Bench Press", 3, "10–12", 90),
      ex("tue-2", "Leaning DB Lateral Raise", 4, "12–15", 60),
      ex("tue-3", "Chest Fly Machine", 3, "12–15", 60),
      ex("tue-4", "DB Skullcrusher", 3, "15–20", 60),
      ex("tue-5", "Dumbbell Lateral Raise", 2, "15–20", 45),
    ],
  },
  {
    key: "wed",
    weekday: 3,
    label: "WED",
    fullLabel: "Wednesday",
    title: "PULL",
    type: "HYPERTROPHY",
    rest: false,
    exercises: [
      ex("wed-1", "Cable Row Machine", 3, "10–12", 90),
      ex("wed-2", "Lat Pull Down (Underhand)", 3, "AMRAP", 90),
      ex("wed-3", "Bent-Over DB Reverse Fly", 3, "15–20", 60),
      ex("wed-4", "Barbell Bicep Curl", 3, "12–15", 60),
      ex("wed-5", "Dumbbell Rear Delt Row", 3, "15–20", 60),
      ex("wed-6", "Flat Bench DB Crunch", 3, "15–20", 60),
    ],
  },
  {
    key: "thu",
    weekday: 4,
    label: "THU",
    fullLabel: "Thursday",
    title: "LEGS",
    type: "HYPERTROPHY",
    rest: false,
    exercises: [
      ex("thu-1", "Hack Squat Machine", 3, "12–15", 120),
      ex("thu-2", "Dumbbell RDL", 3, "15–20", 90),
      ex("thu-3", "Walking Lunges (DB)", 2, "12 / leg", 90),
      ex("thu-4", "Calf Press Machine", 4, "15–20", 60),
      ex("thu-5", "Leg Extension (Finisher)", 2, "20–30", 60),
    ],
  },
  {
    key: "fri",
    weekday: 5,
    label: "FRI",
    fullLabel: "Friday",
    title: "REST",
    type: "RECOVERY",
    rest: true,
    exercises: [],
  },
  {
    key: "sat",
    weekday: 6,
    label: "SAT",
    fullLabel: "Saturday",
    title: "UPPER",
    type: "STRENGTH",
    rest: false,
    exercises: [
      ex("sat-1", "Flat Bench Press", 3, "6–8", 120),
      ex("sat-2", "One-Arm Dumbbell Row", 3, "8–10", 90),
      ex("sat-3", "Shoulder Press Machine", 3, "8–10", 120),
      ex("sat-4", "Lat Pull Down Machine", 3, "8–10", 90),
      ex("sat-5", "Seated Dip Machine", 2, "10–12", 90),
      ex("sat-6", "Dumbbell Bicep Curl", 2, "10–12", 60),
    ],
  },
  {
    key: "sun",
    weekday: 0,
    label: "SUN",
    fullLabel: "Sunday",
    title: "LOWER",
    type: "STRENGTH",
    rest: false,
    exercises: [
      ex("sun-1", "Leg Press Machine", 3, "8–10", 180),
      ex("sun-2", "Barbell RDL", 3, "10–12", 120),
      ex("sun-3", "Leg Curl Machine", 3, "10–12", 90),
      ex("sun-4", "Leg Extension Machine", 3, "12–15", 90),
      ex("sun-5", "Standing Calf Machine", 4, "10–12", 60),
    ],
  },
];

/**
 * SINGLE SOURCE OF TRUTH — JS Date.getDay() → training day.
 * 0 Sun = LOWER, 1 Mon = REST, 2 Tue = PUSH, 3 Wed = PULL,
 * 4 Thu = LEGS, 5 Fri = REST, 6 Sat = UPPER.
 */
export const WEEKDAY_SCHEDULE: Record<number, DayKey> = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

export const dayByKey = (key: string) => PROGRAM.find((d) => d.key === key);

export const dayForDate = (date = new Date()): DayPlan =>
  dayByKey(WEEKDAY_SCHEDULE[date.getDay()] as string) ?? (PROGRAM[0] as DayPlan);

export const totalSets = (d: DayPlan) => d.exercises.reduce((s, e) => s + e.sets, 0);

export const dateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

/** Dates of the current training week (Monday → Sunday). */
export const weekDates = (today = new Date()) => {
  const offsetToMon = (today.getDay() + 6) % 7; // Mon -> 0
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - offsetToMon);
  return PROGRAM.map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export const rirForWeek = (week: number) => {
  if (week <= 2) return "≈ 3 RIR";
  if (week <= 4) return "≈ 2 RIR";
  if (week <= 6) return "≈ 1–2 RIR";
  return "≈ 1–2 RIR";
};
