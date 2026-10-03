import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~20% smaller than WebP; encoded once, then served from the image cache
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
