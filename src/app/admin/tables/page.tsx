import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import TablesManager from "@/components/admin/managers/TablesManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Tables" };

export default function TablesPage() {
  return (
    <>
      <PageHeader title="Tables" subtitle="Manage seating, zones and table availability." crumbs={[{ label: "Tables" }]} />
      <TablesManager initialData={list("tables")} />
    </>
  );
}
