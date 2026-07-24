import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admins can paste any image URL from the panel, so allow any remote host.
    // An unconfigured host would otherwise make next/image throw at render time
    // and 500 the whole page — SmartImage's onError can't catch that. With a
    // wildcard, a bad URL simply fails to load and falls back gracefully.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip"],

  // The JSON data store lives in ./data. Writing to it on every create/update/
  // delete would otherwise trip the dev file-watcher and reload (or destabilise)
  // the server on each mutation. Tell the watcher to ignore it and other
  // non-source paths so editing code stays smooth.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**", "**/data/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
