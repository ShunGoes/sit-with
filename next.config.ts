import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
// hide console.log() in production
    compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://sit-with-pd-global-therapeutic-web-app.onrender.com/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
