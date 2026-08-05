import JsonLd from "@/components/seo/JsonLd";
import EnquiryForm, { type EnquiryField } from "@/components/site/EnquiryForm";
import PageBanner from "@/components/site/PageBanner";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { AMOUNTS, GIFT_TERMS, HOW_IT_WORKS, PERKS } from "@/temp/giftcards";
import Link from "next/link";
import { FiGift } from "react-icons/fi";

export const metadata = pageMeta({
  title: "Gift Cards",
  description:
    "Give a PlateCraft gift card from $50 to $500. Delivered by email in minutes, valid for three years, and redeemable on food, drinks and events.",
  path: "/gift-cards",
  image: IMG.dishes[6],
});

const FIELDS: EnquiryField[] = [
  { name: "name", label: "Your name", required: true, placeholder: "Jane Doe" },
  { name: "email", label: "Your email", type: "email", required: true, placeholder: "jane@email.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "(+123) 456 7890" },
  {
    name: "amount",
    label: "Card amount",
    type: "select",
    required: true,
    options: [...AMOUNTS.map((a) => a.label), "Another amount"],
  },
  { name: "recipient", label: "Recipient's name", required: true, placeholder: "Alex" },
  {
    name: "recipientEmail",
    label: "Recipient's email",
    type: "email",
    required: true,
    placeholder: "alex@email.com",
  },
  { name: "deliverOn", label: "Deliver on", type: "date" },
  {
    name: "message",
    label: "Message on the card",
    type: "textarea",
    placeholder: "Happy birthday — dinner is on us!",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gift Cards", path: "/gift-cards" }])} />

      <PageBanner
        title="Gift Cards"
        subtitle="Give A Great Night"
        crumb="Gift Cards"
        image={IMG.dishes[6]}
      />

      {/* ---------- Hero card + amounts ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">The Easy Gift</span>
            <h2 className="section-title mt-3 text-ink">A Table, Not Another Object</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Nobody needs another candle. A PlateCraft card buys an evening out — the tasting menu,
              a long lunch, or just the burger they keep talking about.
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                Popular amounts
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {AMOUNTS.map((amount) => (
                  <span
                    key={amount.value}
                    className="rounded-2xl border border-ink/10 bg-white px-5 py-3 text-center"
                  >
                    <span className="block text-lg font-extrabold text-ink">{amount.label}</span>
                    {amount.note ? (
                      <span className="text-[11px] text-muted">{amount.note}</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

            <a href="#buy" className="btn btn-primary mt-8">
              Buy a gift card <FiGift className="size-4" />
            </a>
          </Reveal>

          {/* A physical-looking card, so the gift feels like an object worth giving. */}
          <Reveal direction="left">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-soft">
              <SmartImage
                src={IMG.dishes[6]}
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 560px"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-brand/40" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-script text-3xl text-brand-light">PlateCraft</span>
                  <FiGift className="size-7 text-brand-light" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Gift Card</p>
                  <p className="mt-2 text-3xl font-extrabold">$150.00</p>
                  <p className="mt-4 font-mono text-sm tracking-[0.3em] text-white/60">
                    PC •••• •••• 2026
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="bg-cream-2 py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">No Catches</span>
            <h2 className="section-title mt-3 text-ink">Why Our Cards Are Easy</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="card-hover h-full rounded-2xl bg-white p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Three Steps</span>
            <h2 className="section-title mt-3 text-ink">How It Works</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <StaggerItem key={step.step}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white p-7">
                  <span className="font-script text-4xl text-brand">{step.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Order form ---------- */}
      <section id="buy" className="scroll-mt-28 bg-cream-2 py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right">
            <span className="eyebrow">Order One</span>
            <h2 className="section-title mt-3 text-ink">Send A Gift Card</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Fill in the details and we will email you a secure payment link. As soon as it is paid,
              the card goes to your recipient — on the date you choose.
            </p>

            <div className="mt-8 rounded-2xl border border-ink/8 bg-white p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Good to know</h3>
              <ul className="mt-4 space-y-2.5">
                {GIFT_TERMS.map((term) => (
                  <li key={term} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {term}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] text-muted">
                See the full{" "}
                <Link href="/terms" className="font-semibold text-brand hover:underline">
                  terms &amp; conditions
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" className="rounded-3xl border border-ink/8 bg-white p-8">
            <EnquiryForm
              fields={FIELDS}
              subject="Gift card order"
              cta="Send my request"
              successTitle="Almost there!"
              successText="We have your gift card request — check your inbox for the payment link within the hour."
              eventName="gift_card_request"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
