import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["jbvhrvmqvrgtlwxvabih.supabase.co"],
  },
};

export default withNextIntl(nextConfig);
