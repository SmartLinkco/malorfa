import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted on this app when a parent folder also has lockfiles
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
