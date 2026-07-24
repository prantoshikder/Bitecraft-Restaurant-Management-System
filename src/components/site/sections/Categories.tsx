import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { list } from "@/lib/db";

export default function Categories() {
  const categories = list("categories").filter((c) => c.active);

  return (
    <section className="bg-cream-2 py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Popular Categories" title="What Would You Like To Eat?" />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/menu?category=${cat.slug}`}
                className="card-hover group flex h-full flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-white px-4 py-6 text-center"
              >
                <span className="relative size-16 overflow-hidden rounded-full ring-2 ring-brand-soft transition-all group-hover:ring-brand">
                  <SmartImage src={cat.image} alt={cat.name} fill sizes="64px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{cat.name}</p>
                  <p className="text-[11px] text-muted">{cat.itemCount} Items</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
