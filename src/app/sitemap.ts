import type { MetadataRoute } from "next";
import { books } from "@/content/books";
import { travelStories } from "@/content/travel";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/plants",
    "/travel",
    "/books",
    "/contact",
  ] as const;

  return [
    ...staticPaths.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...books.map((book) => ({
      url: `${siteUrl}/books/${book.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...travelStories.map((story) => ({
      url: `${siteUrl}/travel/${story.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
