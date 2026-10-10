"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
function loadTurnstileScript(): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget — the active anti-bot layer for lead forms and
 * registration. BotTrap (honeypot) and JsConfirm (proof the page's JS ran)
 * are defeated by a real headless-browser bot, confirmed in production:
 * spam now also reaches /register, which had no anti-bot check of any kind.
 *
 * Renders nothing if NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, so every page
 * using this keeps working exactly as before until Turnstile is configured.
 *
 * For a plain `<form action={serverAction}>` (every lead form), no
 * `onVerify` is needed — Cloudflare injects a hidden `cf-turnstile-response`
 * input into the rendered widget that's picked up by native FormData on
 * submit. The register page's controlled form needs the token in React
 * state instead, so it passes `onVerify`.
 *
 * `appearance: "interaction-only"` keeps the widget fully invisible for the
 * common case — most real visitors solve Turnstile's background challenge
 * without ever seeing a widget — and only renders its box (at `size`) if an
 * actual interactive challenge is required. Without this, even the
 * smallest available size (compact, 150×140px per Cloudflare's spec) is
 * still far taller than a single text input and dominates compact forms.
 */
export default function Turnstile({
  onVerify,
  size = "flexible",
}: {
  onVerify?: (token: string) => void;
  size?: "normal" | "compact" | "flexible";
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadTurnstileScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        size,
        appearance: "interaction-only",
        callback: (token) => onVerifyRef.current?.(token),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [siteKey, size]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="my-1" />;
}
