import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    qualities: [75, 85],
  },
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
