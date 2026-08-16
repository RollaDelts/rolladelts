import path from "path";
import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;
const supabaseOrigin = supabaseHostname ? `https://${supabaseHostname}` : "";

// script-src/style-src need 'unsafe-inline' because Next's App Router streams
// RSC hydration data via inline <script> tags and several components use
// inline style={} attributes — a nonce-based CSP would remove this but needs
// wiring through src/proxy.ts (this project's renamed middleware) and hasn't
// been set up yet. connect-src/img-src include the Supabase project origin
// because /login and /register call supabase-js directly from the browser,
// and photos are served from Supabase Storage. frame-src allows the Google
// Maps embed on the Contact page.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${supabaseOrigin}`,
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin}`,
  "frame-src https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
]
  .join("; ")
  .replace(/\s+/g, " ")
  .trim();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      // Matches the 8MB limit enforced in src/app/admin/actions/upload.ts —
      // Next's own default (1MB) was silently rejecting larger photo uploads.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
