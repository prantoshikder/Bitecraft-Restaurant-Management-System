import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import CategoriesManager from "@/components/admin/managers/CategoriesManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <PageHeader title="Categories" subtitle="Organise your menu into categories." crumbs={[{ label: "Categories" }]} />
      <CategoriesManager initialData={list("categories")} />
    </>
  );
}
