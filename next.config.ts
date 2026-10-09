import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted on this app when a parent folder also has lockfiles
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Hero portrait requests 90; everything else stays on the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
