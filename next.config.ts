import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Spoonacular APIの画像ホストを許可リストに追加
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
