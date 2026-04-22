import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const repo = "Continuum";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Required for GitHub Pages (static hosting)
  output: "export",

  // GitHub Pages serves the site from /<repo>
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,

  // GitHub Pages can't run Next.js image optimization server-side
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
