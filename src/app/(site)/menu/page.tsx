import { Suspense } from "react";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import MenuExplorer from "@/components/site/MenuExplorer";
import Offers from "@/components/site/sections/Offers";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, menuSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Menu",
  description:
    "Browse the full PlateCraft menu — seasonal starters, mains, desserts and drinks, with prices, prep times and vegetarian options marked.",
  path: "/menu",
  image: IMG.steak,
});

export default function MenuPage() {
  const dishes = list("dishes");
  const categories = list("categories").filter((c) => c.active);

  // Menu markup can surface as a "Menu" tab on the restaurant's Google listing.
  const sections = categories.map((category) => ({
    name: category.name,
    dishes: dishes.filter((d) => d.categoryId === category.id && d.available),
  }));

  return (
    <>
      <JsonLd data={[menuSchema(sections), breadcrumbSchema([{ name: "Menu", path: "/menu" }])]} />
      <PageBanner title="Our Menu" subtitle="Delicious Choices" crumb="Menu" image={IMG.steak} />
      <Suspense fallback={<div className="py-20 text-center text-muted">Loading menu…</div>}>
        <MenuExplorer dishes={dishes} categories={categories} />
      </Suspense>
      <Offers />
    </>
  );
}
