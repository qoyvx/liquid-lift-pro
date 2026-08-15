import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { active?: boolean };

const base = ({ active, ...p }: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: active ? 2.1 : 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: 22,
  height: 22,
  ...p,
});

export const IconHome = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.6 10.4 12 3.8l8.4 6.6" />
    <path d="M5.6 9.8V19a1.4 1.4 0 0 0 1.4 1.4h10a1.4 1.4 0 0 0 1.4-1.4V9.8" />
    <path d="M9.8 20.4v-5.2h4.4v5.2" opacity={active ? 1 : 0.55} />
  </svg>
);

export const IconWorkouts = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9v6M20 9v6" />
    <path d="M7 6.5v11M17 6.5v11" />
    <path d="M7 12h10" />
  </svg>
);

export const IconProgress = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 19.2h16" />
    <path d="M7.2 19V13" />
    <path d="M12 19V8.4" />
    <path d="M16.8 19v-8.2" opacity={active ? 1 : 0.6} />
  </svg>
);

export const IconCoach = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.6 3.8 7.6 12 11.6l8.2-4z" />
    <path d="M7 9.6v4.6c0 1.7 2.4 3 5 3s5-1.3 5-3V9.6" />
    <path d="M20.2 7.8v5" opacity={active ? 1 : 0.6} />
  </svg>
);

export const IconSettings = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M19.2 14.2a1.4 1.4 0 0 0 .3 1.55l.05.05a1.7 1.7 0 1 1-2.4 2.4l-.05-.05a1.4 1.4 0 0 0-2.37 1v.14a1.7 1.7 0 1 1-3.4 0v-.07a1.4 1.4 0 0 0-2.44-.94l-.05.05a1.7 1.7 0 1 1-2.4-2.4l.05-.05A1.4 1.4 0 0 0 4.7 13.4h-.14a1.7 1.7 0 0 1 0-3.4h.07a1.4 1.4 0 0 0 .94-2.44l-.05-.05a1.7 1.7 0 1 1 2.4-2.4l.05.05a1.4 1.4 0 0 0 2.37-1V4.1a1.7 1.7 0 1 1 3.4 0v.07a1.4 1.4 0 0 0 2.37 1l.05-.05a1.7 1.7 0 1 1 2.4 2.4l-.05.05a1.4 1.4 0 0 0 1 2.37h.14a1.7 1.7 0 0 1 0 3.4h-.07a1.4 1.4 0 0 0-1.29.86z" />
  </svg>
);

export const IconPlay = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 5.6 18.4 12 8 18.4z" fill="currentColor" stroke="none" />
  </svg>
);
export const IconPause = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="7.4" y="5.6" width="3.4" height="12.8" rx="1.2" fill="currentColor" stroke="none" />
    <rect x="13.2" y="5.6" width="3.4" height="12.8" rx="1.2" fill="currentColor" stroke="none" />
  </svg>
);
export const IconSkip = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 6 14 12l-7.5 6z" fill="currentColor" stroke="none" />
    <path d="M17.5 6v12" />
  </svg>
);
export const IconReset = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4.5V10h-5.4" />
  </svg>
);
export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.2 12.6 9.6 17l9.2-10" />
  </svg>
);
export const IconChevron = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5.6 15.4 12 9 18.4" />
  </svg>
);
export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6" />
  </svg>
);
export const IconFlame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5s5.2 3.8 5.2 8.6A5.2 5.2 0 0 1 12 17.3a5.2 5.2 0 0 1-5.2-5.2C6.8 9 9 7.3 9 7.3s.4 2 1.6 2.6c0-2.9 1.4-6.4 1.4-6.4z" />
    <path d="M12 20.5v-3" opacity="0.5" />
  </svg>
);
export const IconMoon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
  </svg>
);
export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13.2 3.2 5.8 13.4h5l-.8 7.4 7.4-10.2h-5z" />
  </svg>
);
export const IconTimer = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13.4" r="7.4" />
    <path d="M12 9.8v3.8l2.4 1.6" />
    <path d="M9.6 2.8h4.8" />
  </svg>
);
export const IconPlate = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
