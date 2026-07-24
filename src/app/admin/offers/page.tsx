import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import OffersManager from "@/components/admin/managers/OffersManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Offers" };

export default function OffersPage() {
  return (
    <>
      <PageHeader title="Offers & Deals" subtitle="Create promotional offers and discount codes." crumbs={[{ label: "Offers" }]} />
      <OffersManager initialData={list("offers")} />
    </>
  );
}
