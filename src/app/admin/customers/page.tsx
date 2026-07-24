import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import CustomersManager from "@/components/admin/managers/CustomersManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" subtitle="Your customer base and their loyalty tiers." crumbs={[{ label: "Customers" }]} />
      <CustomersManager initialData={list("customers")} />
    </>
  );
}
