import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
       {
        protocol: 'https',
        hostname: '**.splinetool.com',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy route aliases → canonical routes
      { source: '/audit', destination: '/start-audit', permanent: true },
      { source: '/how-it-works', destination: '/services', permanent: true },
      { source: '/trust', destination: '/proof', permanent: true },
      { source: '/resources', destination: '/learn', permanent: true },
      { source: '/work', destination: '/proof', permanent: true },
      { source: '/work/:slug', destination: '/proof/case-studies/:slug', permanent: true },
      { source: '/platform', destination: '/services', permanent: true },
      { source: '/process', destination: '/services', permanent: true },
      { source: '/academy', destination: '/learn', permanent: true },
      { source: '/faq', destination: '/pricing', permanent: true },
      // Legal shorthand
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
      { source: '/cookies', destination: '/legal/cookies', permanent: true },
      // Insights → learn
      { source: '/insights', destination: '/learn', permanent: true },
      { source: '/insights/:slug', destination: '/learn/design/:slug', permanent: false },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withSentryConfig(withMDX(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "artisan-clarinets",

  project: "vantus-app",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
