import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      // kept during cutover; safe to drop once all URLs are migrated
      { protocol: "https", hostname: "jbvhrvmqvrgtlwxvabih.supabase.co" },
    ],
  },
};

export default withNextIntl(nextConfig);
