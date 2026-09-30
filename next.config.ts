import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /resources and /company have no page of their own; send the nav's top-level links to the first child.
  async redirects() {
    return [
      { source: "/resources", destination: "/resources/insights", permanent: false },
      { source: "/company", destination: "/company/about", permanent: false },
    ];
  },
};

export default nextConfig;
