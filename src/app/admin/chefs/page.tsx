import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import ChefsManager from "@/components/admin/managers/ChefsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Chefs" };

export default function ChefsPage() {
  return (
    <>
      <PageHeader title="Chefs" subtitle="The masters behind every dish, shown on your website." crumbs={[{ label: "Chefs" }]} />
      <ChefsManager initialData={list("chefs")} />
    </>
  );
}
