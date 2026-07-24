import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import SubscribersManager from "@/components/admin/managers/SubscribersManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Subscribers" };

export default function SubscribersPage() {
  return (
    <>
      <PageHeader title="Newsletter Subscribers" subtitle="People who signed up for offers and updates." crumbs={[{ label: "Subscribers" }]} />
      <SubscribersManager initialData={list("subscribers")} />
    </>
  );
}
