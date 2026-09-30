import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /resources has no page of its own yet; send the nav's "Resources" link to Insights.
  async redirects() {
    return [{ source: "/resources", destination: "/resources/insights", permanent: false }];
  },
};

export default nextConfig;
