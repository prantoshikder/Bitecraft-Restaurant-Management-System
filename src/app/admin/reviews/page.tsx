import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import ReviewsManager from "@/components/admin/managers/ReviewsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Reviews" };

export default function ReviewsPage() {
  return (
    <>
      <PageHeader title="Reviews" subtitle="Moderate customer reviews before they appear on your site." crumbs={[{ label: "Reviews" }]} />
      <ReviewsManager initialData={list("reviews")} />
    </>
  );
}
