import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const socialItems = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: site.social.linkedin,
    src: "/media/social/linkedin.svg",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: site.social.instagram,
    src: "/media/social/instagram.svg",
  },
  {
    id: "goodreads",
    label: "Goodreads",
    href: site.social.goodreads,
    src: "/media/social/goodreads.svg",
  },
] as const;

type Props = {
  className?: string;
  iconClassName?: string;
};

/** Official social logos linking to Malorfa’s profiles. */
export function SocialLinks({ className, iconClassName }: Props) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialItems.map(({ id, label, href, src }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "inline-flex opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50",
              iconClassName,
            )}
          >
            <Image
              src={src}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 brightness-0 invert"
              unoptimized
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
