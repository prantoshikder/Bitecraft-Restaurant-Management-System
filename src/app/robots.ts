import { abs } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * Keeps the admin panel, the API and the transactional pages out of the index.
 * `/checkout` and `/login` are blocked because they carry no marketing value and
 * would otherwise dilute the crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/login", "/checkout"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
  };
}
