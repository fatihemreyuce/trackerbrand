import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  tone?: "warm" | "clay" | "ochre" | "ink-warm";
  size?: "sm" | "md" | "lg" | "xl";
  drift?: boolean;
};

const sizes = {
  sm: "w-[280px] h-[280px]",
  md: "w-[420px] h-[420px]",
  lg: "w-[640px] h-[640px]",
  xl: "w-[820px] h-[820px]",
};

const tones = {
  warm: "bg-[radial-gradient(circle_at_center,var(--color-ochre)_0%,var(--color-clay)_55%,transparent_72%)]",
  clay: "bg-[radial-gradient(circle_at_center,var(--color-clay)_0%,transparent_70%)]",
  ochre: "bg-[radial-gradient(circle_at_center,var(--color-ochre)_0%,transparent_70%)]",
  "ink-warm": "bg-[radial-gradient(circle_at_center,var(--color-ochre-dark)_0%,var(--color-clay)_50%,transparent_72%)]",
};

export function GradientOrb({ className, tone = "warm", size = "lg", drift = true }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        sizes[size],
        tones[tone],
        drift && "animate-[orb-drift_18s_ease-in-out_infinite]",
        className
      )}
    />
  );
}
