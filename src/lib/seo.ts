import type { Metadata } from "next";
import type { Dish, Post, Review } from "./types";

/**
 * Single source of truth for everything a search engine, a social crawler or an
 * ad platform reads about the restaurant.
 *
 * Keep the business facts here in sync with `src/temp/contact.ts` and the
 * `settings` row in `src/lib/seed.ts` — those drive the visible UI, this drives
 * the machine-readable copy (canonical URLs, Open Graph, schema.org JSON-LD).
 *
 * The canonical origin comes from `NEXT_PUBLIC_SITE_URL`, falling back to the
 * deployed Vercel URL. Override the env var if the site ever moves to a custom
 * domain — canonical tags, Open Graph URLs, sitemap.xml and robots.txt all
 * follow it.
 */
export const SITE = {
  name: "PlateCraft",
  legalName: "PlateCraft Restaurant Pty Ltd",
  tagline: "Delicious Food Made With Love & Passion",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://platecraft-ps.vercel.app").replace(/\/+$/, ""),
  description:
    "PlateCraft is a premium restaurant in Melbourne serving seasonal, locally sourced food. Book a table, order online, or plan your next private event with us.",
  email: "hello@platecraft.com",
  phone: "+1 (123) 456 7890",
  address: {
    street: "123 Food Street",
    city: "Melbourne",
    region: "VIC",
    postalCode: "3000",
    country: "AU",
  },
  geo: { latitude: -37.8111, longitude: 144.9681 },
  priceRange: "$$",
  currency: "USD",
  cuisines: ["Modern Australian", "European", "Seafood", "Vegetarian"],
  /** Machine-readable opening hours — mirrors the Footer's "Opening Hours" column. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "23:00" },
    { days: ["Saturday", "Sunday"], opens: "09:00", closes: "23:59" },
  ],
  /** Public profiles — feeds schema.org `sameAs`, which links the brand across the web. */
  socials: [
    "https://www.facebook.com/platecraft",
    "https://www.instagram.com/platecraft",
    "https://twitter.com/platecraft",
    "https://www.youtube.com/@platecraft",
  ],
} as const;

/** Turn an app path into an absolute URL. */
export const abs = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Builds a page's `metadata` export: title, description, canonical URL and the
 * Open Graph / Twitter cards that decide how a shared link looks on social.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: abs(path),
      siteName: SITE.name,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/* ------------------------------------------------------------------ *
   schema.org JSON-LD builders
   Rendered through <JsonLd /> — these are what produce rich results
   (star ratings, opening hours, FAQ dropdowns) on a search page.
 * ------------------------------------------------------------------ */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/** The primary business entity — attach once, on the public site layout. */
export function restaurantSchema(reviews: Review[] = []) {
  const approved = reviews.filter((r) => r.approved);
  const rating =
    approved.length > 0
      ? approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": abs("/#restaurant"),
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    servesCuisine: [...SITE.cuisines],
    currenciesAccepted: SITE.currency,
    paymentAccepted: "Cash, Credit Card, Online",
    acceptsReservations: abs("/reservation"),
    hasMenu: abs("/menu"),
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [...SITE.socials],
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(rating.toFixed(1)),
            reviewCount: approved.length,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/** Enables the sitelinks search box and names the site for crawlers. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": abs("/#restaurant") },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${abs("/menu")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Breadcrumb trail shown under the result title in Google. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Collapsible Q&A directly in the search results — the cheapest rich result to win. */
export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Blog post — feeds Google Discover and the "Top stories" carousel. */
export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": abs("/#restaurant") },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    articleSection: post.category,
  };
}

/** A single dish, so it can surface as a product-style result. */
export function dishSchema(dish: Dish) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: dish.image,
    url: abs(`/menu/${dish.slug}`),
    offers: {
      "@type": "Offer",
      price: dish.price.toFixed(2),
      priceCurrency: SITE.currency,
      availability: dish.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    nutrition: { "@type": "NutritionInformation", calories: `${dish.calories} cal` },
    suitableForDiet: dish.veg ? "https://schema.org/VegetarianDiet" : undefined,
    ...(dish.reviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: dish.rating,
            reviewCount: dish.reviews,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/** The full menu, grouped by category — powers the "Menu" tab on a Google listing. */
export function menuSchema(sections: Array<{ name: string; dishes: Dish[] }>) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SITE.name} Menu`,
    url: abs("/menu"),
    inLanguage: "en",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      hasMenuItem: section.dishes.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.description,
        offers: {
          "@type": "Offer",
          price: dish.price.toFixed(2),
          priceCurrency: SITE.currency,
        },
      })),
    })),
  };
}

/** A campaign / promo code, so deals can appear as a merchant offer. */
export function offerSchema(offer: {
  title: string;
  subtitle: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.title,
    description: `${offer.subtitle} — use code ${offer.code}.`,
    url: abs("/offers"),
    priceCurrency: SITE.currency,
    validFrom: offer.validFrom,
    validThrough: offer.validTo,
    offeredBy: { "@id": abs("/#restaurant") },
    discount: offer.discount,
  };
}

/** A bookable event (dinner series, tasting night, live music). */
export function eventSchema(event: {
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  price: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEvent",
    name: event.title,
    description: event.description,
    image: event.image,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: SITE.name,
      address: postalAddress,
    },
    organizer: { "@id": abs("/#restaurant") },
    offers: {
      "@type": "Offer",
      price: event.price.toFixed(2),
      priceCurrency: SITE.currency,
      url: abs("/reservation"),
      availability: "https://schema.org/InStock",
    },
  };
}
