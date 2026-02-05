import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // client-side only, so images must be unoptimized if using next/image (but we aren't using it heavily yet, but good practice for export)
  images: { unoptimized: true },
};

export default nextConfig;
