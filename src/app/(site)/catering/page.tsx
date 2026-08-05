import JsonLd from "@/components/seo/JsonLd";
import EnquiryForm, { type EnquiryField } from "@/components/site/EnquiryForm";
import PageBanner from "@/components/site/PageBanner";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { CATERING_NOTES, EVENT_TYPES, PACKAGES, PROCESS, SPACES } from "@/temp/catering";
import { FiCheck, FiUsers } from "react-icons/fi";

export const metadata = pageMeta({
  title: "Catering & Private Events",
  description:
    "Private dining, corporate events, weddings and off-site catering in Melbourne. Spaces for 18 to 200 guests, menus from $55 per head — request a quote in two minutes.",
  path: "/catering",
  image: IMG.interiors[4],
});

/** Enquiry fields — the answers a coordinator needs before they can quote. */
const FIELDS: EnquiryField[] = [
  { name: "name", label: "Your name", required: true, placeholder: "Jane Doe" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@company.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "(+123) 456 7890" },
  {
    name: "eventType",
    label: "Event type",
    type: "select",
    required: true,
    options: ["Corporate", "Wedding or celebration", "Social or community", "Off-site catering"],
  },
  { name: "eventDate", label: "Preferred date", type: "date", required: true },
  { name: "guests", label: "Approximate guests", type: "number", required: true, placeholder: "40" },
  {
    name: "package",
    label: "Package of interest",
    type: "select",
    options: [...PACKAGES.map((p) => p.name), "Not sure yet — advise me"],
  },
  {
    name: "budget",
    label: "Budget per person",
    type: "select",
    options: ["Under $60", "$60 – $100", "$100 – $150", "$150+", "Flexible"],
  },
  {
    name: "message",
    label: "Tell us about the event",
    type: "textarea",
    placeholder: "Dietary requirements, timings, styling, anything else we should know…",
  },
];

export default function CateringPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Catering & Events", path: "/catering" }])} />

      <PageBanner
        title="Catering & Private Events"
        subtitle="Your Occasion"
        crumb="Catering"
        image={IMG.interiors[4]}
      />

      {/* ---------- What we do ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Whatever The Occasion</span>
            <h2 className="section-title mt-3 text-ink">Events We Cater</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              From a boardroom lunch for twelve to a rooftop wedding for two hundred — same kitchen,
              same produce, planned by a team that does this every week.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EVENT_TYPES.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="card-hover h-full rounded-2xl border border-ink/8 bg-white p-7">
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

      {/* ---------- Packages ---------- */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Menus</span>
            <h2 className="section-title mt-3">Packages & Pricing</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Prices are per person and exclude drinks. Every package can be adjusted around
              allergies, dietary requirements and your budget.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 ${
                    pkg.popular
                      ? "bg-brand text-white shadow-glow"
                      : "border border-white/10 bg-white/[0.04]"
                  }`}
                >
                  {pkg.popular ? (
                    <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                      Most booked
                    </span>
                  ) : null}

                  <h3 className="text-xl font-extrabold">{pkg.name}</h3>
                  <p className={`mt-2 text-sm ${pkg.popular ? "text-white/80" : "text-white/50"}`}>
                    {pkg.summary}
                  </p>

                  <p className="mt-6 flex items-end gap-1.5">
                    <span className="text-4xl font-extrabold leading-none">{pkg.price}</span>
                    <span className={pkg.popular ? "text-sm text-white/75" : "text-sm text-white/45"}>
                      {pkg.unit}
                    </span>
                  </p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {pkg.includes.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm">
                        <FiCheck
                          className={`mt-0.5 size-4 shrink-0 ${pkg.popular ? "text-white" : "text-brand"}`}
                        />
                        <span className={pkg.popular ? "text-white/90" : "text-white/65"}>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#enquiry"
                    className={`btn mt-8 w-full ${pkg.popular ? "bg-white text-brand hover:bg-cream" : "btn-ghost"}`}
                  >
                    Request a quote
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Spaces ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Rooms</span>
            <h2 className="section-title mt-3 text-ink">Spaces You Can Book</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {SPACES.map((space) => (
              <StaggerItem key={space.name}>
                <article className="card-hover h-full overflow-hidden rounded-3xl border border-ink/8 bg-white">
                  <div className="relative h-52">
                    <SmartImage
                      src={space.image}
                      alt={space.name}
                      fill
                      sizes="(max-width:1024px) 100vw, 380px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg font-bold text-ink">{space.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{space.description}</p>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/8 pt-5 text-[13px] text-ink/70">
                      <span className="inline-flex items-center gap-1.5">
                        <FiUsers className="size-4 text-brand" /> {space.seated} seated
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiUsers className="size-4 text-brand" /> {space.standing} standing
                      </span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="bg-cream-2 py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">No Surprises</span>
            <h2 className="section-title mt-3 text-ink">How It Works</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item) => (
              <StaggerItem key={item.step}>
                <div className="h-full rounded-2xl bg-white p-7">
                  <span className="font-script text-4xl text-brand">{item.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Enquiry ---------- */}
      <section id="enquiry" className="scroll-mt-28 bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right">
            <span className="eyebrow">Let&apos;s Talk</span>
            <h2 className="section-title mt-3 text-ink">Request A Proposal</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tell us the date and the headcount and you will have a menu, a room recommendation and
              an itemised quote within one business day.
            </p>

            <ul className="mt-8 space-y-3">
              {CATERING_NOTES.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm text-ink/70">
                  <FiCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" className="rounded-3xl border border-ink/8 bg-white p-8">
            <EnquiryForm
              fields={FIELDS}
              subject="Catering enquiry"
              cta="Request a quote"
              successTitle="Enquiry received!"
              successText="Our events team will come back to you with a menu and a quote within one business day."
              eventName="catering_enquiry"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
