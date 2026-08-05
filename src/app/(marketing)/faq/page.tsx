import Accordion from "@/components/marketing/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";
import { ALL_FAQS, FAQ_GROUPS } from "@/temp/marketing/faq";
import Link from "next/link";
import { FiMail, FiMessageCircle, FiPhone } from "react-icons/fi";

export const metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Everything guests ask us — reservations, dietary requirements, delivery, private events, parking and accessibility at PlateCraft Melbourne.",
  path: "/faq",
  image: IMG.interiors[0],
});

export default function FaqPage() {
  return (
    <>
      {/* FAQPage markup lets Google show these answers directly in the results. */}
      <JsonLd
        data={[
          faqSchema(ALL_FAQS),
          breadcrumbSchema([{ name: "FAQ", path: "/faq" }]),
        ]}
      />

      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Good To Know"
        crumb="FAQ"
        image={IMG.interiors[0]}
      />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {FAQ_GROUPS.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.04}>
                <h2 className="mb-5 text-xl font-extrabold text-ink">
                  {group.title}
                </h2>
                <Accordion
                  items={group.items}
                  defaultOpen={gi === 0 ? 0 : -1}
                />
              </Reveal>
            ))}
          </div>

          {/* Sidebar: every unanswered question is a lost booking — give them an exit. */}
          <Reveal
            direction="left"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl bg-ink p-8 text-white">
              <FiMessageCircle className="size-9 text-brand-light" />
              <h2 className="mt-5 text-xl font-extrabold">Still wondering?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Our team answers the phone during opening hours and replies to
                email within a day.
              </p>

              <div className="mt-7 space-y-4">
                <a
                  href="tel:+11234567890"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand-light"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/8 text-brand-light">
                    <FiPhone className="size-4" />
                  </span>
                  (+123) 456 7890
                </a>
                <a
                  href="mailto:hello@platecraft.com"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand-light"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/8 text-brand-light">
                    <FiMail className="size-4" />
                  </span>
                  hello@platecraft.com
                </a>
              </div>

              <Link href="/contact" className="btn btn-primary mt-8 w-full">
                Send us a message
              </Link>
              <Link href="/reservation" className="btn btn-ghost mt-3 w-full">
                Book a table
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
