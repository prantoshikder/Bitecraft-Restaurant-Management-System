import type { Metadata } from "next";
import PageBanner from "@/components/site/PageBanner";
import GalleryGrid from "@/components/site/GalleryGrid";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const images = list("gallery");
  return (
    <>
      <PageBanner title="Our Gallery" subtitle="A Feast For Your Eyes" crumb="Gallery" image={IMG.interiors[2]} />
      <GalleryGrid images={images} />
    </>
  );
}
