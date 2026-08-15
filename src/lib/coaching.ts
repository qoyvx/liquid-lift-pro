export type Principle = {
  id: string;
  title: string;
  short: string;
  why: string;
  apply: string;
  detail: string[];
};

export const PRINCIPLES: Principle[] = [
  {
    id: "specificity",
    title: "Specificity",
    short: "Adaptations are specific to the work performed.",
    why: "Your body adapts to the exact demands you place on it. Heavy low-rep work builds strength expression; moderate rep work with sufficient volume drives hypertrophy.",
    apply:
      "Your Saturday and Sunday sessions are strength-biased (6–12 reps, longer rest). Tuesday through Thursday are hypertrophy-biased (10–20 reps, shorter rest). Keep each session true to its intent.",
    detail: [
      "Match exercise selection, rep range and rest to the goal of the session.",
      "Do not turn strength days into fatigue chasing, or hypertrophy days into ego lifting.",
    ],
  },
  {
    id: "overload",
    title: "Overload",
    short: "The stimulus must be challenging enough to force adaptation.",
    why: "Without a sufficiently demanding stimulus there is no reason for the body to change. Sets taken close enough to failure with meaningful load create that signal.",
    apply:
      "Work within the prescribed RIR for your current week. Sets ended far from the target RIR under-stimulate; sets to absolute failure every time over-fatigue you.",
    detail: [
      "Load, reps, and proximity to failure all contribute to the stimulus.",
      "Overload is a requirement, not a licence to add weight recklessly.",
    ],
  },
  {
    id: "progression",
    title: "Progression",
    short: "Manage progress over time, not inside every single session.",
    why: "Trying to make every workout dramatically harder leads to technique breakdown and accumulated fatigue rather than long-term progress.",
    apply:
      "Across this 12-week block, expect small consistent increases in reps or load. A session that simply matches last week with better technique is not a failure.",
    detail: [
      "Progress can come from reps, load, technique quality, or control — not load alone.",
      "Track your numbers so progression is based on data, not feel.",
    ],
  },
  {
    id: "double-progression",
    title: "Double Progression",
    short: "Fill the rep range first, then add load.",
    why: "It separates two variables so you always know why a set changed. It also protects technique because load only moves when performance justifies it.",
    apply:
      "For 3 × 8–10: stay inside 8–10 reps. When every working set hits 10 clean reps at the planned RIR, increase the load slightly next session. The app never changes your weight automatically — you confirm it.",
    detail: [
      "Top of range on all working sets + clean technique + planned RIR = increase load.",
      "After a load increase you will usually drop back toward the bottom of the range. That is expected.",
    ],
  },
  {
    id: "rir",
    title: "RIR — Reps In Reserve",
    short: "How many more good reps you could have performed.",
    why: "RIR standardises effort across exercises and days, so intensity can be programmed instead of guessed.",
    apply:
      "Weeks 1–2: approximately 3 RIR. Weeks 3–4: approximately 2 RIR. Weeks 5–6: approximately 1–2 RIR. Log RIR on every set.",
    detail: [
      "2 RIR means you could have done two more clean reps with the same technique.",
      "Routine training to absolute failure is not required and is not encouraged.",
    ],
  },
  {
    id: "recovery",
    title: "Recovery",
    short: "Adaptation happens between sessions, not during them.",
    why: "Training creates the signal; sleep, nutrition and rest days convert it into progress. Chronic under-recovery flattens performance.",
    apply:
      "Target 7–9 hours of sleep. Monday and Friday are genuine rest days. If performance repeatedly drops, reduce training stress instead of forcing progression.",
    detail: [
      "Repeated performance decline is data, not weakness.",
      "Reduce sets or load for a few sessions rather than pushing through.",
    ],
  },
  {
    id: "volume",
    title: "Volume",
    short: "More sets are not automatically better.",
    why: "Volume drives growth up to the point where it exceeds what you can recover from — past that it costs performance.",
    apply:
      "Your sessions use a focused set count per muscle. Add volume only if recovery, sleep and performance are all in good shape.",
    detail: [
      "Productive and recoverable beats maximal on paper.",
      "Judge volume by performance trend across weeks, not by soreness.",
    ],
  },
  {
    id: "failure",
    title: "Failure Training",
    short: "Training close to failure is not the same as training to failure.",
    why: "Sets near failure deliver most of the stimulus at a fraction of the fatigue cost of true failure on every set.",
    apply:
      "Keep routine work at the prescribed RIR. Save true failure for occasional isolation or machine finishers where technique risk is low.",
    detail: [
      "Failure on compounds costs the most recovery and carries the highest technique risk.",
      "Consistency across the week matters more than a heroic single set.",
    ],
  },
  {
    id: "selection",
    title: "Exercise Selection",
    short: "Choose movements you can load, control, and progress.",
    why: "An exercise is useful when it trains the target muscle through a good range of motion, is stable enough to push, and can be progressed safely.",
    apply:
      "Your program uses stable compounds first, then machines and dumbbells for controlled accessory volume.",
    detail: [
      "Prioritise: effective loading, stable technique, appropriate range of motion, progressability, recoverability.",
      "Swap an exercise only for a close equivalent so tracking stays meaningful.",
    ],
  },
  {
    id: "machines",
    title: "Machines vs Free Weights",
    short: "Both are useful tools with different strengths.",
    why: "Machines provide stability and controlled loading, which makes it easy to push close to failure. Free weights allow more movement freedom and demand more coordination and stabilisation.",
    apply:
      "Your program deliberately mixes both: barbell and dumbbell work for coordination and loading, machines for controlled accessory volume.",
    detail: [
      "Neither category is universally superior.",
      "Choose per exercise based on the goal, the muscle, and how well you can progress it.",
    ],
  },
  {
    id: "simple",
    title: "Keep Training Simple",
    short: "More exercises and techniques do not automatically mean better results.",
    why: "Complexity adds fatigue and noise to your data without necessarily adding stimulus.",
    apply:
      "Run this block as written. Progress it. Judge it after 12 weeks of consistent execution.",
    detail: ["Effective training is progressive, recoverable, and sustainable."],
  },
  {
    id: "splits",
    title: "Split Routines",
    short: "Splitting training organises volume and recovery.",
    why: "Dividing the week by movement pattern lets you accumulate quality volume per muscle while leaving time for recovery.",
    apply:
      "Your split: Saturday Upper, Sunday Lower, Monday Rest, Tuesday Push, Wednesday Pull, Thursday Legs, Friday Rest.",
    detail: [
      "Strength-biased upper/lower early in the week, hypertrophy push/pull/legs after.",
      "Rest days are part of the program, not gaps in it.",
    ],
  },
  {
    id: "supersets",
    title: "Supersets",
    short: "Pairing exercises with limited rest between them.",
    why: "Supersets increase training density and save time, especially for non-competing muscle groups.",
    apply:
      "Optional on hypertrophy days for small isolation pairs, e.g. lateral raises with a triceps movement. Do not superset your heavy strength lifts.",
    detail: ["Watch total fatigue: density gains can cost performance on the second exercise."],
  },
  {
    id: "pre-exhaustion",
    title: "Pre-Exhaustion",
    short: "An isolation exercise performed before a compound movement.",
    why: "It pre-fatigues the target muscle so it becomes the limiting factor in the compound that follows.",
    apply:
      "Optional technique, not a mandatory part of this program. Example: chest fly before incline press on a push day.",
    detail: ["Expect lower loads on the compound afterwards — that is the point, not a regression."],
  },
  {
    id: "drop-sets",
    title: "Drop Sets",
    short: "Reduce the load after a set and continue for extra reps.",
    why: "It extends a set past the point of load-limited failure to add stimulus in a short time.",
    apply:
      "Advanced optional technique. If used, keep it to the last set of an isolation or machine exercise.",
    detail: ["High fatigue cost — use sparingly, not on every session."],
  },
  {
    id: "periodization",
    title: "Periodization",
    short: "Organising training into phases with changing loading and stress.",
    why: "Planned variation in intensity and volume manages fatigue and keeps progress moving over months.",
    apply:
      "This 12-week block progresses from ~3 RIR toward 1–2 RIR, moving from strength emphasis into hypertrophy volume.",
    detail: ["Phases give the block a direction and a clear end point to evaluate."],
  },
  {
    id: "warmup",
    title: "Warm-Up",
    short: "2–4 gradual warm-up sets on the first major movement.",
    why: "Warm-ups prepare tissue and rehearse technique at increasing loads without adding meaningful fatigue.",
    apply:
      "Perform 2–4 ramping sets before your first big lift of the session. These do not count as working sets and are not logged.",
    detail: ["Later exercises usually need one light ramp set at most."],
  },
  {
    id: "technique",
    title: "Technique",
    short: "Technique takes priority over simply adding weight.",
    why: "Consistent technique makes your logged numbers comparable week to week and keeps the target muscle doing the work.",
    apply:
      "Controlled repetitions, consistent range of motion, stable setup. If technique changes, the load was too heavy.",
    detail: ["Same setup, same range, same tempo — then progress the load."],
  },
];

export const tipForDate = (date = new Date()) => {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return PRINCIPLES[dayIndex % PRINCIPLES.length] as Principle;
};
