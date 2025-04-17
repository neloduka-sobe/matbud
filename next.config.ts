import type { NextConfig } from "next";

// Get the repository name from environment or default to 'matbud'
const repoName = process.env.REPOSITORY_NAME || 'matbud';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neloduka-sobe.github.io',
        pathname: '/**',
      },
    ],
  },
  // Add this to ensure proper handling of public assets
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
