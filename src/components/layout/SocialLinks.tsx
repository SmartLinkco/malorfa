import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const socialItems = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: LinkedInIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: site.social.instagram,
    icon: InstagramIcon,
  },
  {
    id: "goodreads",
    label: "Goodreads",
    href: site.social.goodreads,
    icon: GoodreadsIcon,
  },
] as const;

type Props = {
  className?: string;
  iconClassName?: string;
};

/** Social platform icons linking to Malorfa’s profiles. */
export function SocialLinks({ className, iconClassName }: Props) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialItems.map(({ id, label, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "inline-flex text-ivory/55 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50",
              iconClassName,
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function GoodreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M16.5 13.2c0 2.85-1.94 4.8-4.9 4.8-1.6 0-2.95-.62-3.85-1.72v4.52c0 .86-.14 1.42-.5 1.74-.38.34-.96.42-1.68.42-.7 0-1.26-.1-1.64-.42-.36-.3-.5-.86-.5-1.74V4.35c0-.9.22-1.5.66-1.9.48-.44 1.2-.64 2.1-.64h.18v8.05c.86-1.08 2.18-1.72 3.8-1.72 2.98 0 4.93 1.98 4.93 4.86zm-2.22.06c0-1.72-1.1-2.92-2.74-2.92-1.6 0-2.76 1.22-2.76 2.92 0 1.7 1.16 2.92 2.76 2.92 1.64 0 2.74-1.2 2.74-2.92z" />
    </svg>
  );
}
