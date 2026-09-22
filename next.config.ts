import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicons/released.ico" }];
  },
};

export default nextConfig;
