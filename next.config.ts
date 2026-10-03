import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy without nonces (see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
// Nonces would force every page to render per request; this site is static, so it keeps CDN caching.
// Everything (fonts, images, logos) is served from our own origin. HTTPS is enforced by HSTS (Vercel), so
// upgrade-insecure-requests is not needed (it also breaks prefetching on a local http server).
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // /resources and /company have no page of their own; send the nav's top-level links to the first child.
  async redirects() {
    return [
      { source: "/resources", destination: "/resources/insights", permanent: false },
      { source: "/company", destination: "/company/about", permanent: false },
    ];
  },
};

export default nextConfig;
