import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import DishesManager from "@/components/admin/managers/DishesManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Menu Items" };

export default function DishesPage() {
  const categories = list("categories").map((c) => ({ id: c.id, name: c.name }));
  return (
    <>
      <PageHeader title="Menu Items" subtitle="Add, edit and manage every dish on your menu." crumbs={[{ label: "Menu Items" }]} />
      <DishesManager initialData={list("dishes")} categories={categories} />
    </>
  );
}
