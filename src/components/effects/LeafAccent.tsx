"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md";
};

/** Botanical flourish — subtle rustle on hover (CSS). */
export function LeafAccent({ className, size = "sm" }: Props) {
  return (
    <span
      className={cn(
        "leaf-accent inline-flex text-sage",
        size === "sm" ? "h-5 w-5" : "h-7 w-7",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
        <path d="M12 21c0-6 4-10 9-12-1 7-5 12-9 12Z" opacity="0.9" />
        <path d="M12 21C12 15 8 11 3 9c1 7 5 12 9 12Z" opacity="0.65" />
        <path
          d="M12 21V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </span>
  );
}
