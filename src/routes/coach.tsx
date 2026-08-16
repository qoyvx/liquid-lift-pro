import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRINCIPLES } from "@/lib/coaching";
import { rirForWeek } from "@/lib/program";
import { programWeek, useStore } from "@/lib/store";
import { Card, Pill, SectionTitle } from "@/components/app/ui";
import { IconChevron } from "@/components/app/icons";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Coach — Elite Gym Tracker" },
      {
        name: "description",
        content:
          "Training education: specificity, overload, double progression, RIR, recovery, volume, periodization and technique.",
      },
      { property: "og:title", content: "Coach — Elite Gym Tracker" },
      {
        property: "og:description",
        content: "Evidence-based training principles applied directly to your 12-week program.",
      },
    ],
  }),
  component: Coach,
});

function Coach() {
  const [open, setOpen] = useState<string | null>(null);
  const week = useStore(programWeek);

  return (
    <div className="stagger space-y-6">
      <header className="pt-2">
        <p className="text-[0.62rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
          Training education
        </p>
        <h1 className="text-[1.7rem] font-extrabold">Coach</h1>
      </header>

      <Card className="sheen-sweep p-5">
        <Pill>Current phase</Pill>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You are in <span className="font-bold text-foreground">week {week} of 12</span>. Intensity
          target for this phase is{" "}
          <span className="font-bold text-foreground">{rirForWeek(week)}</span>. Use double
          progression: fill the rep range at that RIR before adding load.
        </p>
      </Card>

      <SectionTitle hint={`${PRINCIPLES.length} principles`}>Principles library</SectionTitle>
      <div className="space-y-3">
        {PRINCIPLES.map((p) => {
          const expanded = open === p.id;
          return (
            <div
              key={p.id}
              className="glass glass-sheen overflow-hidden rounded-[var(--radius-2xl)] transition-all duration-300"
              style={
                expanded
                  ? { boxShadow: "0 22px 46px -22px oklch(0.05 0.04 265 / 0.95), inset 0 1px 0 var(--glass-edge)" }
                  : undefined
              }
            >
              <button
                onClick={() => setOpen(expanded ? null : p.id)}
                className="press-deep flex w-full items-start gap-3 p-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-extrabold">{p.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.short}</p>
                </div>
                <IconChevron
                  width={16}
                  height={16}
                  className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300"
                  style={{ transform: expanded ? "rotate(90deg)" : "none" }}
                />
              </button>
              {expanded && (
                <div className="animate-rise space-y-4 border-t border-white/10 p-4">
                  <Block title="Why it matters" body={p.why} />
                  <Block title="Apply it to your program" body={p.apply} />
                  <div>
                    <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent uppercase">
                      Key points
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {p.detail.map((d) => (
                        <li key={d} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--gradient-primary)" }}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
