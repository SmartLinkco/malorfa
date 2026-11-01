"use client";

import { useCallback, useEffect, useRef } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const tokenWaitMs = 12_000;

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptLoading: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoading = null;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

/**
 * Cloudflare's script loads only once someone starts a form, so most page views never
 * contact it. The challenge stays invisible unless Cloudflare needs an interaction.
 */
export function useTurnstile() {
  const slotRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const waiters = useRef<Array<(value: string | null) => void>>([]);

  const settle = useCallback((value: string | null) => {
    token.current = value;
    for (const resolve of waiters.current.splice(0)) resolve(value);
  }, []);

  const prepare = useCallback(async () => {
    if (!siteKey || widgetId.current) return;
    try {
      await loadScript();
    } catch {
      settle(null);
      return;
    }
    if (!slotRef.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(slotRef.current, {
      sitekey: siteKey,
      appearance: "interaction-only",
      size: "flexible",
      callback: (value: string) => settle(value),
      "expired-callback": () => {
        token.current = null;
      },
      "error-callback": () => {
        settle(null);
        return true;
      },
    });
  }, [settle]);

  /** Tokens are single use, so drop the widget after each attempt. */
  const discard = useCallback(() => {
    token.current = null;
    if (widgetId.current) window.turnstile?.remove(widgetId.current);
    widgetId.current = null;
  }, []);

  /** Returns undefined when Turnstile is off, and null if no token could be obtained. */
  const getToken = useCallback(async (): Promise<string | null | undefined> => {
    if (!siteKey) return undefined;
    if (token.current) return token.current;
    return new Promise<string | null>((resolve) => {
      const timer = setTimeout(() => settle(null), tokenWaitMs);
      waiters.current.push((value) => {
        clearTimeout(timer);
        resolve(value);
      });
      void prepare();
    });
  }, [prepare, settle]);

  useEffect(() => discard, [discard]);

  return { slotRef, prepare, getToken, discard };
}
