import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/maps/api/place/photo/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'www.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'ngrok-skip-browser-warning',
            value: 'true',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // NOTE: Cloudflare in front of this app injects its own
            // Permissions-Policy with `geolocation=()` which can take
            // precedence and silently block geolocation. The real fix is
            // to remove that downstream header in Cloudflare (Rules →
            // Transform Rules → check Managed Transforms / Modify
            // Response Header rules). Our header below sets the most
            // permissive policy so that wherever browsers apply
            // "first-declaration-wins" we still allow geolocation.
            key: 'Permissions-Policy',
            value: 'microphone=*, camera=*, geolocation=*',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://maps.googleapis.com https://translate.google.com https://*.googleapis.com; connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.axsmap.com https://test-api.edvizi.net https://maps.googleapis.com https://*.googleapis.com; frame-src https://translate.google.com https://www.google.com https://maps.google.com https://www.youtube.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com; font-src 'self' data: https://fonts.gstatic.com https://www.gstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
