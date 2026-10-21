import type { Metadata } from "next";
import { site } from "@/content/site";

const DEFAULT_SITE_URL = "https://malorfa.com";

function resolveSiteUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return DEFAULT_SITE_URL;
    return url.href.replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Production origin for canonicals, Open Graph, JSON-LD, sitemap, and robots.
 * Override with NEXT_PUBLIC_SITE_URL (no trailing slash required).
 */
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Home title. The root layout template does not apply to this same segment. */
export const defaultTitle = `${site.name} · Risk, plants, travel & books`;

/** Applied to child routes: "About" → "About · Malorfa". */
export const titleTemplate = `%s · ${site.brand}`;

export const ogImage = {
  url: site.ogImage,
  width: 1200,
  height: 675,
  alt: "Portrait of Malorfa Aryee with the word Malorfa",
} as const;

type SocialImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageMetadataInput = {
  /** Short title. Child routes receive `titleTemplate`. */
  title: string;
  description: string;
  /** Path resolved against `metadataBase`, e.g. `/travel`. */
  path: string;
  /** Full document title that ignores the template. Used on the home page. */
  absoluteTitle?: string;
  image?: SocialImage;
  ogType?: "website" | "article";
  index?: boolean;
  /** Set false for routes that should not declare a canonical URL. */
  canonical?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image,
  ogType = "website",
  index = true,
  canonical = true,
}: PageMetadataInput): Metadata {
  const img = image ?? ogImage;
  const socialTitle = absoluteTitle ?? `${title} · ${site.brand}`;
  const ogImages = [
    {
      url: img.url,
      alt: img.alt,
      ...(img.width ? { width: img.width } : {}),
      ...(img.height ? { height: img.height } : {}),
    },
  ];

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(canonical ? { alternates: { canonical: path } } : {}),
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.brand,
      locale: "en_US",
      type: ogType,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [img.url],
    },
  };
}
