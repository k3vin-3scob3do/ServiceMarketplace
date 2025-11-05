import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "cdn-media-1.freecodecamp.org" },
      { protocol: "https", hostname: "placehold.co" },
    ],
    domains: [
      "cdn-icons-png.flaticon.com",
      "i.pinimg.com",
      "cdn-media-1.freecodecamp.org",
      "placehold.co",
    ],
  },
};

export default nextConfig;
