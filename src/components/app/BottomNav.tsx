import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconCoach, IconHome, IconProgress, IconSettings, IconWorkouts } from "./icons";

const TABS = [
  { to: "/", label: "Home", Icon: IconHome },
  { to: "/workouts", label: "Workouts", Icon: IconWorkouts },
  { to: "/progress", label: "Progress", Icon: IconProgress },
  { to: "/coach", label: "Coach", Icon: IconCoach },
  { to: "/settings", label: "Settings", Icon: IconSettings },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeIndex = Math.max(
    0,
    TABS.findIndex((t) => (t.to === "/" ? pathname === "/" : pathname.startsWith(t.to))),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [box, setBox] = useState({ x: 0, w: 0 });
  const [traveling, setTraveling] = useState(false);
  const prevIndex = useRef(activeIndex);

  const measure = () => {
    const c = containerRef.current;
    const el = itemRefs.current[activeIndex];
    if (!c || !el) return;
    const cb = c.getBoundingClientRect();
    const eb = el.getBoundingClientRect();
    setBox({ x: eb.left - cb.left + eb.width / 2, w: Math.min(eb.width - 6, 62) });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    prevIndex.current = activeIndex;
    setTraveling(true);
    const t = setTimeout(() => setTraveling(false), 330);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.65rem)]">
      <div
        ref={containerRef}
        className="glass glass-sheen pointer-events-auto relative flex w-full max-w-md items-stretch justify-between rounded-[26px] px-1.5 py-1.5"
        style={{ ["--glass-blur" as string]: "16px" }}
      >
        {/* continuous liquid indicator */}
        <div
          aria-hidden
          className="absolute top-1.5 bottom-1.5 rounded-[20px]"
          style={{
            left: 0,
            width: box.w,
            transform: `translate3d(${box.x - box.w / 2}px,0,0) scaleX(${traveling ? 1.28 : 1}) scaleY(${traveling ? 0.92 : 1})`,
            transition:
              "transform 430ms var(--ease-liquid), width 430ms var(--ease-liquid), box-shadow 430ms var(--ease-liquid)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, white 22%, transparent), transparent 55%), var(--glass-bg-active)",
            border: "1px solid color-mix(in oklab, white 20%, transparent)",
            boxShadow: traveling
              ? "inset 0 1px 0 var(--glass-edge), 0 6px 22px -8px oklch(0.65 0.18 280 / 0.75)"
              : "inset 0 1px 0 var(--glass-edge), 0 8px 20px -10px oklch(0.68 0.17 258 / 0.85)",
            backdropFilter: "blur(6px) saturate(180%)",
            WebkitBackdropFilter: "blur(6px) saturate(180%)",
            willChange: "transform, width",
          }}
        />
        {TABS.map((t, i) => {
          const active = i === activeIndex;
          return (
            <Link
              key={t.to}
              to={t.to}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="press relative z-10 flex flex-1 flex-col items-center justify-center gap-1 rounded-[20px] py-2"
            >
              <t.Icon
                active={active}
                width={21}
                height={21}
                className="transition-all duration-300"
                style={{
                  color: active ? "oklch(0.98 0.01 260)" : "oklch(0.68 0.03 262)",
                  transform: active ? "translateY(-1px) scale(1.08)" : "none",
                }}
              />
              <span
                className="text-[0.55rem] font-bold tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ color: active ? "oklch(0.95 0.01 260)" : "oklch(0.6 0.03 262)" }}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
