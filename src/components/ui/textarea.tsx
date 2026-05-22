import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[80px] w-full rounded-md bg-paper-dark-deeper border border-hairline-dark px-3 py-2 text-sm text-ink-dark-soft placeholder:text-ink-dark-soft/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-dark",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
