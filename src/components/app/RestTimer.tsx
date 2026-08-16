import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IconClose, IconPause, IconPlay, IconReset, IconSkip } from "./icons";

type TimerCtx = {
  start: (seconds: number, exercise: string, setLabel: string) => void;
  active: boolean;
};

const Ctx = createContext<TimerCtx>({ start: () => {}, active: false });
export const useRestTimer = () => useContext(Ctx);

const SLOT_W = "1.22rem";
const SLOT_H = "2.6rem";

function DigitSlot({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [outgoing, setOutgoing] = useState<string | null>(null);

  useEffect(() => {
    setCurrent((prev) => {
      if (prev === value) return prev;
      setOutgoing(prev);
      return value;
    });
  }, [value]);

  useEffect(() => {
    if (outgoing === null) return;
    const t = setTimeout(() => setOutgoing(null), 340);
    return () => clearTimeout(t);
  }, [outgoing]);

  return (
    <span
      className="relative block overflow-hidden"
      style={{ width: SLOT_W, height: SLOT_H }}
      aria-hidden
    >
      {outgoing !== null && (
        <span
          key={`out-${outgoing}`}
          className="animate-digit-out absolute inset-0 grid place-items-center"
          style={{ lineHeight: SLOT_H }}
        >
          {outgoing}
        </span>
      )}
      <span
        key={`in-${current}`}
        className={outgoing !== null ? "animate-digit-in absolute inset-0 grid place-items-center" : "absolute inset-0 grid place-items-center"}
        style={{ lineHeight: SLOT_H }}
      >
        {current}
      </span>
    </span>
  );
}

function Digits({ seconds, running }: { seconds: number; running: boolean }) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return (
    <div
      className="num flex items-center justify-center text-[2.15rem] font-bold tracking-normal tabular-nums"
      style={{ lineHeight: 1 }}
      role="timer"
      aria-label={`${m}:${s}`}
    >
      <DigitSlot value={m[0]!} />
      <DigitSlot value={m[1]!} />
      <span
        aria-hidden
        className={running ? "animate-colon grid place-items-center" : "grid place-items-center"}
        style={{ width: "0.62rem", height: SLOT_H, lineHeight: SLOT_H, opacity: running ? undefined : 0.55 }}
      >
        :
      </span>
      <DigitSlot value={s[0]!} />
      <DigitSlot value={s[1]!} />
    </div>
  );
}

export function RestTimerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [total, setTotal] = useState(90);
  const [remaining, setRemaining] = useState(90);
  const [running, setRunning] = useState(false);
  const [meta, setMeta] = useState({ exercise: "", setLabel: "" });
  const raf = useRef<number | null>(null);
  const deadline = useRef(0);

  const stopLoop = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
  };

  useEffect(() => {
    if (!running) {
      stopLoop();
      return;
    }
    deadline.current = performance.now() + remaining * 1000;
    let last = -1;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline.current - performance.now()) / 1000));
      if (left !== last) {
        last = left;
        setRemaining(left);
      }
      if (left <= 0) {
        setRunning(false);
        try {
          navigator.vibrate?.([40, 60, 40]);
        } catch {
          /* ignore */
        }
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return stopLoop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const start = useCallback((seconds: number, exercise: string, setLabel: string) => {
    setTotal(seconds);
    setRemaining(seconds);
    setMeta({ exercise, setLabel });
    setClosing(false);
    setOpen(true);
    setRunning(true);
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setRunning(false);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 320);
  }, []);

  const adjust = (delta: number) => {
    setRemaining((r) => {
      const next = Math.max(0, r + delta);
      deadline.current = performance.now() + next * 1000;
      setTotal((t) => Math.max(t, next));
      return next;
    });
  };

  const value = useMemo(() => ({ start, active: open }), [start, open]);
  const pct = total > 0 ? remaining / total : 0;
  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <Ctx.Provider value={value}>
      {children}
      {open && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
          <div
            className={closing ? "animate-scrim-out absolute inset-0" : "animate-scrim absolute inset-0"}
            style={{
              backdropFilter: "blur(10px) saturate(130%)",
              background: "oklch(0.08 0.03 265 / 0.45)",
            }}
            onClick={close}
          />
          <div
            className={`${closing ? "animate-sheet-out" : "animate-sheet sheen-sweep"} glass glass-strong pointer-events-auto relative mx-3 mb-[calc(env(safe-area-inset-bottom,0px)+6.2rem)] w-full max-w-md rounded-[30px] p-5`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  Rest Timer
                </p>
                <p className="truncate text-sm font-semibold">{meta.exercise}</p>
                <p className="text-xs text-muted-foreground">{meta.setLabel}</p>
              </div>
              <button
                onClick={close}
                className="press glass-soft grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground"
                aria-label="Close timer"
              >
                <IconClose width={16} height={16} />
              </button>
            </div>

            <div className="relative my-4 grid place-items-center">
              <div className="relative grid place-items-center" style={{ width: 128, height: 128 }}>
              <svg width={128} height={128} className="-rotate-90 block">
                <circle cx="64" cy="64" r={R} stroke="oklch(1 0 0 / 0.08)" strokeWidth="9" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r={R}
                  stroke="url(#tg)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - pct)}
                  style={{ transition: "stroke-dashoffset 0.95s linear" }}
                />
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.75 0.17 258)" />
                    <stop offset="100%" stopColor="oklch(0.68 0.19 300)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <Digits seconds={remaining} running={running} />
              </div>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              <button onClick={() => adjust(-15)} className="press glass-soft num rounded-2xl py-3 text-sm font-bold">
                −15s
              </button>
              <button
                onClick={() => setRunning((r) => !r)}
                className="press grid place-items-center rounded-2xl py-3 font-bold"
                style={{
                  background: "var(--gradient-primary)",
                  color: "oklch(0.14 0.035 265)",
                  boxShadow: "0 10px 26px -12px oklch(0.7 0.18 275 / 0.9)",
                }}
              >
                {running ? <IconPause width={20} height={20} /> : <IconPlay width={20} height={20} />}
              </button>
              <button onClick={() => adjust(15)} className="press glass-soft num rounded-2xl py-3 text-sm font-bold">
                +15s
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setRemaining(total);
                  deadline.current = performance.now() + total * 1000;
                }}
                className="press glass-soft flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold tracking-[0.12em] uppercase"
              >
                <IconReset width={15} height={15} /> Reset
              </button>
              <button
                onClick={() => {
                  setRunning(false);
                  close();
                }}
                className="press glass-soft flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold tracking-[0.12em] uppercase"
              >
                <IconSkip width={15} height={15} /> Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
