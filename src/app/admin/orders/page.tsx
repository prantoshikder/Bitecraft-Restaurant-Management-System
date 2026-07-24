import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import OrdersManager from "@/components/admin/managers/OrdersManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" subtitle="Track and manage every order from placement to completion." crumbs={[{ label: "Orders" }]} />
      <OrdersManager initialData={list("orders")} />
    </>
  );
}
