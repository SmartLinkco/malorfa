import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  className?: string;
  tone?: "forest" | "stone";
};

export function CtaBand({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  className,
  tone = "forest",
}: Props) {
  const isForest = tone === "forest";
  return (
    <section
      className={cn(
        "section-pad",
        isForest ? "bg-forest text-ivory" : "bg-stone text-ink",
        className,
      )}
    >
      <div className="container-page max-w-3xl">
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
              isForest ? "text-moss" : "text-sage",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl leading-tight md:text-4xl text-balance">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed md:text-lg",
              isForest ? "text-ivory/75" : "text-ink/70",
            )}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {primary ? (
            <Button
              href={primary.href}
              variant={isForest ? "inverse" : "primary"}
              size="lg"
            >
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button
              href={secondary.href}
              variant={isForest ? "secondary" : "secondary"}
              size="lg"
              className={
                isForest
                  ? "border-ivory/35 text-ivory hover:border-ivory hover:text-ivory"
                  : undefined
              }
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
