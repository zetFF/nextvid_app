import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Disables type checking during the build process.
    // Use with caution and ensure type checks are performed elsewhere (e.g., CI/CD).
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
