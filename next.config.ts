import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["jbvhrvmqvrgtlwxvabih.supabase.co"],
  },
  webpack(config) {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname, "src"),
      },
    };
    return config;
  },
};

export default nextConfig;
