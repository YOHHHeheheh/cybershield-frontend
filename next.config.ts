import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Security Headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Stop MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer info
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable browser features not needed
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // HSTS (only meaningful over HTTPS in production)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
          // Content Security Policy
          // Adjust src values to match your actual CDN / API domains in production
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Allow the background video from CloudFront
              "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
              // Allow Google Fonts stylesheets
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow Google Fonts font files
              "font-src 'self' https://fonts.gstatic.com",
              // Allow Next.js inline scripts + your backend
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
              // Allow connecting to backend API
              `connect-src 'self' ${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000"}`,
              "img-src 'self' data: blob:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ── Image domains (if you add <Image> from backend CDN later) ────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
    ],
  },

  // ── Proxy API Requests to Backend ───────────────────────────────────────
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8001';
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
