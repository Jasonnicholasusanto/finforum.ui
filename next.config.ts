import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logokit.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
