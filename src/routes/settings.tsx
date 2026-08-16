import { createFileRoute } from "@tanstack/react-router";
import { setState, useStore } from "@/lib/store";
import { Card, SectionTitle } from "@/components/app/ui";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Elite Gym Tracker" },
      {
        name: "description",
        content: "Edit your profile, body-weight goal, program start date and daily macro targets.",
      },
      { property: "og:title", content: "Settings — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Profile, goal weight, program start date and nutrition targets.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const profile = useStore((s) => s.profile);
  const nutrition = useStore((s) => s.nutrition);

  return (
    <div className="stagger space-y-6">
      <header className="pt-2">
        <p className="text-[0.62rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
          Preferences
        </p>
        <h1 className="text-[1.7rem] font-extrabold">Settings</h1>
      </header>

      <SectionTitle>Profile</SectionTitle>
      <Card className="space-y-3 p-4">
        <Field
          label="Name"
          value={profile.name}
          onChange={(v) => setState((s) => ({ ...s, profile: { ...s.profile, name: v } }))}
        />
        <Field
          label="Goal weight (kg)"
          value={String(profile.goalKg)}
          numeric
          onChange={(v) =>
            setState((s) => ({ ...s, profile: { ...s.profile, goalKg: Number(v) || 0 } }))
          }
        />
        <Field
          label="Program start date"
          value={profile.startDate}
          type="date"
          onChange={(v) => setState((s) => ({ ...s, profile: { ...s.profile, startDate: v } }))}
        />
      </Card>

      <SectionTitle hint="Daily targets">Nutrition</SectionTitle>
      <Card className="space-y-3 p-4">
        <Field
          label="Calories (kcal)"
          numeric
          value={String(nutrition.kcal)}
          onChange={(v) =>
            setState((s) => ({ ...s, nutrition: { ...s.nutrition, kcal: Number(v) || 0 } }))
          }
        />
        <Field
          label="Protein (g)"
          numeric
          value={String(nutrition.protein)}
          onChange={(v) =>
            setState((s) => ({ ...s, nutrition: { ...s.nutrition, protein: Number(v) || 0 } }))
          }
        />
        <Field
          label="Carbohydrates (g)"
          numeric
          value={String(nutrition.carbs)}
          onChange={(v) =>
            setState((s) => ({ ...s, nutrition: { ...s.nutrition, carbs: Number(v) || 0 } }))
          }
        />
        <Field
          label="Fats (g)"
          numeric
          value={String(nutrition.fats)}
          onChange={(v) =>
            setState((s) => ({ ...s, nutrition: { ...s.nutrition, fats: Number(v) || 0 } }))
          }
        />
      </Card>

      <SectionTitle>Data</SectionTitle>
      <Card className="p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          All training, nutrition and profile data is stored on this device only. No account or
          server is required.
        </p>
        <button
          onClick={() => {
            if (confirm("Erase all logged sessions and intake? This cannot be undone.")) {
              setState((s) => ({ ...s, sessions: {}, intake: {}, weights: {} }));
            }
          }}
          className="press glass-soft mt-4 w-full rounded-2xl py-3 text-[0.65rem] font-bold tracking-[0.16em] uppercase"
          style={{ color: "oklch(0.7 0.19 22)" }}
        >
          Erase all training data
        </button>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  numeric,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  numeric?: boolean;
  type?: string;
}) {
  return (
    <label className="field-glow grid grid-cols-[minmax(0,1fr)_7.5rem] items-center gap-3 rounded-xl">
      <span className="min-w-0 truncate text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        value={value}
        type={type ?? "text"}
        inputMode={numeric ? "numeric" : undefined}
        onChange={(e) => onChange(numeric ? e.target.value.replace(/[^0-9.]/g, "") : e.target.value)}
        className="num glass-soft w-full min-w-0 rounded-xl px-3 py-2.5 text-right text-sm font-bold transition-all duration-300 focus:brightness-110"
      />
    </label>
  );
}
