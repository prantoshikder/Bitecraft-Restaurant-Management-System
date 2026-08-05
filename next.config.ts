import type { NextConfig } from "next";

/**
 * `npm run dev` runs Turbopack. Webpack's dev server corrupts its server-side
 * module registry after a handful of hot reloads in this app and then throws
 * "__webpack_modules__[moduleId] is not a function" on every request until you
 * restart it — Turbopack has no such problem and uses far less memory.
 *
 * The webpack tweaks below still matter for `next build` and for the
 * `dev:webpack` escape hatch, so they're attached only when Turbopack is off.
 * Declaring both at once makes Next warn on every dev boot.
 */
const usingTurbopack = process.env.TURBOPACK === "1";

const nextConfig: NextConfig = {
  /**
   * `next build` and `next dev` both write to `.next` by default, so running a
   * build while the dev server is up wipes the chunks the dev server is still
   * serving. It then throws ENOENT on `_buildManifest.js.tmp…` for every edit
   * until you restart it and delete `.next`.
   *
   * Set NEXT_DIST_DIR to give a build its own directory and the two can run
   * side by side:  NEXT_DIST_DIR=.next-build npm run build
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

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

  ...(usingTurbopack
    ? {}
    : {
        // The JSON data store lives in ./data. Writing to it on every create/
        // update/delete would otherwise trip the dev file-watcher and reload
        // (or destabilise) the server on each mutation. Tell the watcher to
        // ignore it and other non-source paths so editing code stays smooth.
        // Turbopack needs none of this — data/db.json is read with fs at
        // request time, so it was never part of the module graph.
        webpack: (config: { watchOptions?: object }, { dev }: { dev: boolean }) => {
          if (dev) {
            config.watchOptions = {
              ...(config.watchOptions ?? {}),
              ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**", "**/data/**"],
            };
          }
          return config;
        },
      }),
};

export default nextConfig;
