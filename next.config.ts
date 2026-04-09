import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sit-with-pd-global-therapeutic-web-app.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
