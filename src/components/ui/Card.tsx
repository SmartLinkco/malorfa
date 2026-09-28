import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  interactive?: boolean;
};

export function Card({
  children,
  className,
  as: Comp = "div",
  interactive = false,
}: Props) {
  return (
    <Comp
      className={cn(
        "rounded-md border border-ink/8 bg-ivory/80 p-6 shadow-[0_1px_0_rgba(26,31,28,0.04)]",
        interactive &&
          "transition-transform duration-300 hover:-translate-y-0.5 hover:border-sage/40",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
