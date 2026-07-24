import { Suspense } from "react";
import type { Metadata } from "next";
import PageBanner from "@/components/site/PageBanner";
import MenuExplorer from "@/components/site/MenuExplorer";
import Offers from "@/components/site/sections/Offers";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Our Menu" };

export default function MenuPage() {
  const dishes = list("dishes");
  const categories = list("categories").filter((c) => c.active);

  return (
    <>
      <PageBanner title="Our Menu" subtitle="Delicious Choices" crumb="Menu" image={IMG.steak} />
      <Suspense fallback={<div className="py-20 text-center text-muted">Loading menu…</div>}>
        <MenuExplorer dishes={dishes} categories={categories} />
      </Suspense>
      <Offers />
    </>
  );
}
