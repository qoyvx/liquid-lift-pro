import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Smoothly interpolates a value on mount / change. */
export function useSpringValue(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const initial = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = initial + (target - initial) * eased;
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function ProgressBar({
  value,
  className,
  tone = "primary",
}: {
  value: number;
  className?: string;
  tone?: "primary" | "violet" | "accent";
}) {
  const v = useSpringValue(Math.max(0, Math.min(1, value)));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <div
        className={cn(
          "h-full rounded-full",
          tone === "primary" && "bg-[var(--gradient-primary)]",
          tone === "violet" && "bg-violet",
          tone === "accent" && "bg-accent",
        )}
        style={{
          width: "100%",
          transform: `scaleX(${v})`,
          transformOrigin: "left",
          background: tone === "primary" ? "var(--gradient-primary)" : undefined,
          boxShadow: "0 0 12px -2px color-mix(in oklab, var(--primary) 60%, transparent)",
        }}
      />
    </div>
  );
}

export function Ring({
  value,
  size = 92,
  stroke = 8,
  children,
  tone = "var(--primary)",
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  tone?: string;
}) {
  const v = useSpringValue(Math.max(0, Math.min(1, value)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.09)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-1">
      <h2 className="text-[0.72rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
        {children}
      </h2>
      {hint ? <span className="text-[0.7rem] text-muted-foreground/80">{hint}</span> : null}
    </div>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "glass glass-sheen w-full overflow-hidden p-4 text-left",
        onClick && "press",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "glass-soft inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.12em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
