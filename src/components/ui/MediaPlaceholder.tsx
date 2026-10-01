import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  label?: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  tone?: "sage" | "sand" | "forest" | "stone";
  priority?: boolean;
  objectPosition?: string;
  showLabel?: boolean;
};

const aspects = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

const tones = {
  sage: "from-sage/30 via-moss/20 to-sand/40",
  sand: "from-sand/80 via-stone to-sage/15",
  forest: "from-forest/80 via-sage/40 to-ink/30",
  stone: "from-stone via-sand/50 to-ivory",
};

/**
 * Photo when `src` is set; gradient placeholder otherwise.
 * Uses next/image for lazy-loading below the fold.
 */
export function MediaPlaceholder({
  src,
  alt = "",
  label,
  aspect = "landscape",
  className,
  tone = "sage",
  priority = false,
  objectPosition = "center",
  showLabel = false,
}: Props) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md bg-stone",
          aspects[aspect],
          className,
        )}
      >
        <Image
          src={src}
          alt={alt || label || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
          className="object-cover"
          style={{ objectPosition }}
          priority={priority}
        />
        {showLabel && label ? (
          <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
            <span className="rounded-sm bg-ivory/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink/70 backdrop-blur-sm">
              {label}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-br",
        aspects[aspect],
        tones[tone],
        className,
      )}
      role="img"
      aria-label={label || alt || "Photo placeholder"}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-multiply [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(44,74,62,0.25),transparent_50%)]" />
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <span className="rounded-sm bg-ivory/85 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink/70 backdrop-blur-sm">
          {label || "[PLACEHOLDER: Photo]"}
        </span>
      </div>
    </div>
  );
}
