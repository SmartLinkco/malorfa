"use client";

import { useRef } from "react";
import Script from "next/script";

type Props = {
  url: string;
  className?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

/**
 * Calendly inline scheduler. Its script only scans the page when it first loads, so the
 * widget is started from `onReady`, which also runs when returning via a site link.
 */
export function CalendlyEmbed({ url, className }: Props) {
  const container = useRef<HTMLDivElement>(null);

  function start() {
    const parentElement = container.current;
    if (!parentElement || !window.Calendly || parentElement.childElementCount > 0) return;
    window.Calendly.initInlineWidget({ url, parentElement });
  }

  return (
    <div className={className}>
      <div
        ref={container}
        className="w-full overflow-hidden rounded-md"
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={start}
      />
    </div>
  );
}
