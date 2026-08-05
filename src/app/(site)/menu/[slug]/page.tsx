import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { list } from "@/lib/db";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import DishDetail from "@/components/site/DishDetail";
import { breadcrumbSchema, dishSchema, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dish = list("dishes").find((d) => d.slug === slug);
  if (!dish) return { title: "Dish" };

  return pageMeta({
    title: dish.name,
    description: dish.description,
    path: `/menu/${dish.slug}`,
    image: dish.image,
  });
}

export default async function DishPage({ params }: Props) {
  const { slug } = await params;
  const dish = list("dishes").find((d) => d.slug === slug);
  if (!dish) notFound();

  const category = list("categories").find((c) => c.id === dish.categoryId);
  const related = list("dishes").filter((d) => d.categoryId === dish.categoryId && d.id !== dish.id).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          dishSchema(dish),
          breadcrumbSchema([
            { name: "Menu", path: "/menu" },
            { name: dish.name, path: `/menu/${dish.slug}` },
          ]),
        ]}
      />
      <PageBanner title={dish.name} subtitle={category?.name ?? "Menu"} crumb={dish.name} image={dish.image} />
      <DishDetail dish={dish} categoryName={category?.name ?? ""} related={related} />
    </>
  );
}
