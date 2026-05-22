import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md bg-paper-dark-deeper border border-hairline-dark px-3 py-2 text-sm text-ink-dark-soft placeholder:text-ink-dark-soft/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-dark",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
