import Link from "next/link";
import { FiArrowRight, FiTag } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { list } from "@/lib/db";

export default function Offers() {
  const offers = list("offers").filter((o) => o.active).slice(0, 3);

  return (
    <section className="bg-cream-2 py-20 lg:py-24">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_2fr]">
          <Reveal direction="right">
            <span className="eyebrow">Our Special Offers</span>
            <h2 className="section-title mt-3 max-w-[220px] text-ink">Best Deals For You</h2>
            <Link href="/menu" className="btn btn-primary mt-6">
              View All Offers <FiArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-3">
            {offers.map((offer) => (
              <StaggerItem key={offer.id}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 text-white">
                  <div className="absolute inset-0 -z-0 opacity-30 transition-opacity group-hover:opacity-45">
                    <SmartImage src={offer.image} alt={offer.title} fill sizes="240px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
                  </div>
                  <div className="relative">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                      <FiTag className="size-3" /> {offer.code}
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold leading-tight">{offer.title}</h3>
                    <p className="text-sm text-brand-light">{offer.subtitle}</p>
                  </div>
                  <p className="relative mt-8 text-[11px] text-white/50">
                    Up to {offer.discount}% off — limited time only.
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
