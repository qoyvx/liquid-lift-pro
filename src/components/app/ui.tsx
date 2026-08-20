import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Reveals children with a spring-y rise the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return (
    <div
      ref={ref}
      className={cn(shown ? "animate-reveal" : "reveal-hidden", className)}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Height-animated collapsible region (grid-rows technique, no layout thrash). */
export function Collapse({
  open,
  children,
  className,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="collapse-grid" data-open={open ? "true" : "false"} aria-hidden={!open}>
      <div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

/** Shimmering placeholder for loading states. */
export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn("skeleton", className)} style={style} />;
}

/** Animated, friendly empty state. */
export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="animate-reveal glass glass-sheen rounded-[var(--radius-2xl)] p-7 text-center">
      {icon ? (
        <div className="animate-float mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/8">
          {icon}
        </div>
      ) : null}
      <p className="text-sm font-extrabold">{title}</p>
      {body ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{body}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

/** Liquid glass toggle with a spring knob. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="toggle-track press-spring relative h-7 w-12 shrink-0 rounded-full"
      style={{
        background: checked ? "var(--gradient-primary)" : "oklch(1 0 0 / 0.12)",
        boxShadow: checked
          ? "0 8px 20px -10px oklch(0.7 0.18 270 / 0.9), inset 0 1px 0 var(--glass-edge)"
          : "inset 0 1px 0 color-mix(in oklab, white 18%, transparent)",
      }}
    >
      <span
        className="toggle-knob absolute top-1 left-1 h-5 w-5 rounded-full bg-white"
        style={{ transform: checked ? "translate3d(20px,0,0)" : "none" }}
      />
    </button>
  );
}

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

/** Smoothly counts a number from its previous value to the new one. */
export function AnimatedNumber({
  value,
  decimals = 0,
  className,
  duration = 750,
}: {
  value: number;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const v = useSpringValue(value, duration);
  const [flash, setFlash] = useState(0);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    setFlash((f) => f + 1);
  }, [value]);
  return (
    <span
      key={flash}
      className={cn("num tabular-nums inline-block", flash > 0 && "animate-value", className)}
    >
      {v.toFixed(decimals)}
    </span>
  );
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
          v > 0.02 && "bar-shine",
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
          transition: "box-shadow 0.4s var(--ease-liquid)",
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
  const complete = value >= 0.999;
  return (
    <div
      className={cn("relative grid shrink-0 place-items-center", complete && "ring-halo")}
      style={{ width: size, height: size }}
    >
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
          style={{ filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--primary) 45%, transparent))" }}
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
        "transition-shadow duration-300",
        onClick && "press-deep",
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
