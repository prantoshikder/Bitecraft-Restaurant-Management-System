import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import InventoryManager from "@/components/admin/managers/InventoryManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  const suppliers = list("suppliers").map((s) => ({ id: s.id, name: s.name }));
  return (
    <>
      <PageHeader title="Inventory" subtitle="Track stock levels and get low-stock alerts." crumbs={[{ label: "Inventory" }]} />
      <InventoryManager initialData={list("inventory")} suppliers={suppliers} />
    </>
  );
}
