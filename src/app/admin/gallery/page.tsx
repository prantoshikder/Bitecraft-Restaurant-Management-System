import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import GalleryManager from "@/components/admin/managers/GalleryManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryAdminPage() {
  return (
    <>
      <PageHeader title="Gallery" subtitle="Curate the photos shown on your website gallery." crumbs={[{ label: "Gallery" }]} />
      <GalleryManager initialData={list("gallery")} />
    </>
  );
}
