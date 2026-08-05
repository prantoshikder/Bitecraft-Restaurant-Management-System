import { list } from "@/lib/db";
import { abs } from "@/lib/seo";
import type { MetadataRoute } from "next";

/** Regenerated hourly so dishes and posts added from the admin panel show up. */
export const revalidate = 3600;

/**
 * Priority is relative *within* this site: 1.0 for the homepage, then the pages
 * that earn bookings (menu, reservation, offers), then supporting content, then
 * legal boilerplate. `changeFrequency` is only a hint to crawlers.
 */
const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/menu", priority: 0.9, changeFrequency: "daily" },
  { path: "/reservation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/offers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/catering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gift-cards", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const dishes = list("dishes")
    .filter((d) => d.available)
    .map((dish) => ({
      url: abs(`/menu/${dish.slug}`),
      lastModified: new Date(dish.createdAt),
      changeFrequency: "weekly" as const,
      priority: dish.featured ? 0.8 : 0.6,
    }));

  const posts = list("posts")
    .filter((p) => p.published)
    .map((post) => ({
      url: abs(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: abs(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...dishes,
    ...posts,
  ];
}
