import { cn } from "@/lib/utils";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto h-px max-w-12xl bg-gradient-to-r from-transparent via-hairline to-transparent",
        className
      )}
    />
  );
}
