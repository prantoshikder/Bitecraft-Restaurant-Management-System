import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { list } from "@/lib/db";

export default function GalleryStrip() {
  const images = list("gallery").slice(0, 5);

  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[0.8fr_2fr]">
        <Reveal direction="right">
          <span className="eyebrow">Gallery</span>
          <h2 className="section-title mt-3 max-w-[240px] text-ink">A Feast For Your Eyes</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A glimpse into the dishes, the room and the little moments that make BiteCraft special.
          </p>
          <Link href="/gallery" className="btn btn-primary mt-6">
            View Full Gallery <FiArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
            {images.map((img, i) => (
              <Link
                key={img.id}
                href="/gallery"
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
                }`}
              >
                <SmartImage src={img.url} alt={img.title} fill sizes="(max-width:640px) 45vw, 220px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/30" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
