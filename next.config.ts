import type { NextConfig } from "next";
import { isSiteReleased } from "./lib/site-release";

const favicon = isSiteReleased()
  ? "/favicons/released.ico"
  : "/favicons/soon.ico";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/favicon.ico", destination: favicon }];
  },
};

export default nextConfig;
