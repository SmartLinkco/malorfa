import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-ivory">
      <div className="container-page section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-tight">{site.brand}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/65">
              {site.positioning}
            </p>
            <p className="mt-4 text-sm text-ivory/50">{site.name}</p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
              Newsletter
            </p>
            <p className="mt-3 mb-4 text-sm text-ivory/60">{site.newsletterNote}</p>
            <div className="rounded-md bg-ivory/5 p-4 [&_h3]:hidden [&_p]:hidden [&_input]:border-ivory/20 [&_input]:bg-ink [&_input]:text-ivory [&_input]:placeholder:text-ivory/40">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-sm text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.brand}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/contact" className="hover:text-ivory">
              Privacy stub
            </Link>
            <Link href="/contact" className="hover:text-ivory">
              Terms stub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
