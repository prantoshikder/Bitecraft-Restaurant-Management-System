import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import SuppliersManager from "@/components/admin/managers/SuppliersManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Suppliers" };

export default function SuppliersPage() {
  return (
    <>
      <PageHeader title="Suppliers" subtitle="Manage the vendors that keep your kitchen stocked." crumbs={[{ label: "Suppliers" }]} />
      <SuppliersManager initialData={list("suppliers")} />
    </>
  );
}
