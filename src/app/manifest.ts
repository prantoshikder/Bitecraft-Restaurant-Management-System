import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BiteCraft Restaurant",
    short_name: "BiteCraft",
    description: "Delicious food made with love & passion — book a table and explore our menu.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1210",
    theme_color: "#8cb33f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
