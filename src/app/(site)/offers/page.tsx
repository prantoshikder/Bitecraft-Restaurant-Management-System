import JsonLd from "@/components/seo/JsonLd";
import NewsletterForm from "@/components/site/NewsletterForm";
import PageBanner from "@/components/site/PageBanner";
import PromoCode from "@/components/site/PromoCode";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, offerSchema, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { HOW_TO_REDEEM, OFFER_TERMS, PERKS } from "@/temp/offers";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";

export const metadata = pageMeta({
  title: "Special Offers & Promo Codes",
  description:
    "Live deals at PlateCraft — lunch specials, family combos and weekend discounts. Copy a promo code and use it on your next order or booking.",
  path: "/offers",
  image: IMG.offers[0],
});

export default function OffersPage() {
  const today = new Date().toISOString().slice(0, 10);
  const all = list("offers").filter((o) => o.active);

  const live = all.filter((o) => o.validTo >= today);
  const upcoming = all.filter((o) => o.validFrom > today);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Offers", path: "/offers" }]),
          ...live.map((offer) => offerSchema(offer)),
        ]}
      />

      <PageBanner
        title="Special Offers"
        subtitle="Save More"
        crumb="Offers"
        image={IMG.offers[0]}
      />

      {/* ---------- Live deals ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Running Right Now</span>
            <h2 className="section-title mt-3 text-ink">Deals On The Table</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tap any code to copy it, then paste it at checkout or mention it when you book. New
              deals land every fortnight — subscribers see them first.
            </p>
          </Reveal>

          {live.length === 0 ? (
            <p className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center text-sm text-muted">
              No deals are running at the moment. Join the mailing list below and you will hear about
              the next one before it goes public.
            </p>
          ) : (
            <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {live.map((offer) => (
                <StaggerItem key={offer.id}>
                  <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-white">
                    <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-45">
                      <SmartImage
                        src={offer.image}
                        alt={offer.title}
                        fill
                        sizes="(max-width:768px) 100vw, 380px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" />
                    </div>

                    <div className="relative flex flex-1 flex-col p-7">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                        <FiTag className="size-3" /> {offer.discount}% off
                      </span>

                      <h3 className="mt-5 text-2xl font-extrabold leading-tight">{offer.title}</h3>
                      <p className="mt-1 text-sm text-brand-light">{offer.subtitle}</p>

                      <p className="mt-4 flex items-center gap-2 text-[13px] text-white/55">
                        <FiCalendar className="size-4 shrink-0 text-brand-light" />
                        Valid until {formatDate(offer.validTo)}
                      </p>

                      <div className="mt-auto pt-7">
                        <PromoCode code={offer.code} />
                        <Link
                          href="/menu"
                          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-light"
                        >
                          Order with this code <FiArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {upcoming.length > 0 ? (
            <Reveal className="mt-10 rounded-2xl border border-brand/25 bg-brand-soft px-6 py-5 text-center text-sm text-ink/75">
              <strong className="font-bold">Coming soon:</strong>{" "}
              {upcoming.map((o) => o.title).join(", ")} — starting{" "}
              {formatDate(upcoming[0].validFrom)}.
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ---------- How to redeem ---------- */}
      <section className="bg-cream-2 py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="eyebrow">Three Steps</span>
            <h2 className="section-title mt-3 text-ink">How To Use A Code</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {HOW_TO_REDEEM.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Newsletter capture ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">Get Them First</span>
            <h2 className="section-title mt-3 text-ink">Deals Before Everyone Else</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Subscribers get codes that never make it onto this page, plus first access to tasting
              nights and a treat on their birthday.
            </p>
            <div className="mt-7 max-w-md">
              <NewsletterForm tone="light" layout="inline" cta="Join the list" source="offers-page" />
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Small print ---------- */}
      <section className="bg-cream-2 pb-16 pt-4 lg:pb-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-ink/8 bg-white p-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Offer Terms</h2>
            <ul className="mt-4 space-y-2.5">
              {OFFER_TERMS.map((term) => (
                <li key={term} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {term}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] text-muted">
              Full details in our{" "}
              <Link href="/terms" className="font-semibold text-brand hover:underline">
                terms &amp; conditions
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
