"use client";

import Script from "next/script";

type Props = {
  url: string;
  className?: string;
};

/** Calendly inline scheduler — loads their widget script once per page. */
export function CalendlyEmbed({ url, className }: Props) {
  return (
    <div className={className}>
      <div
        className="calendly-inline-widget w-full overflow-hidden rounded-md"
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
