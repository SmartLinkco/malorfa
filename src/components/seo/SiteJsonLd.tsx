import { site } from "@/content/site";
import { ogImage, siteUrl } from "@/lib/seo";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const sameAs = [
  site.social.linkedin,
  site.social.instagram,
  site.social.goodreads,
].filter((url) => url.startsWith("http"));

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: site.brand,
      alternateName: site.name,
      description: site.tagline,
      inLanguage: "en",
      author: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      alternateName: site.brand,
      url: siteUrl,
      image: `${siteUrl}${ogImage.url}`,
      description: site.positioning,
      jobTitle: "Underwriting Expert",
      email: site.email,
      telephone: site.phone,
      homeLocation: {
        "@type": "Place",
        name: site.location,
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "IPR Ghana Accredited",
        recognizedBy: {
          "@type": "Organization",
          name: "Institute of Public Relations, Ghana",
        },
      },
      knowsAbout: [
        "Underwriting",
        "Corporate risk and insurance",
        "Plants",
        "Travel",
        "Books",
      ],
      sameAs,
      mainEntityOfPage: { "@id": websiteId },
    },
  ],
};

/** Person + WebSite. Copy is limited to statements already on the site. */
export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
