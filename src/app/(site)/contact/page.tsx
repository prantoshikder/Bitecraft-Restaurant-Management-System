import ContactForm from "@/components/site/ContactForm";
import PageBanner from "@/components/site/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";
import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const metadata: Metadata = { title: "Contact Us" };

const INFO = [
  {
    icon: FiPhone,
    label: "Phone",
    value: "(+123) 456 7890",
    sub: "Mon - Sun, 10am - 11pm",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "hello@bitecraft.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: FiMapPin,
    label: "Address",
    value: "123 Food Street, Melbourne",
    sub: "Victoria, Australia",
  },
  {
    icon: FiClock,
    label: "Open Hours",
    value: "10:00 AM - 11:00 PM",
    sub: "Weekends till 12:00 AM",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get In Touch"
        crumb="Contact"
        image={IMG.interiors[3]}
      />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-4">
          {INFO.map(({ icon: Icon, label, value, sub }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ink/8 bg-white p-6 text-center">
                <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="size-6" />
                </span>
                <p className="text-[11px] uppercase tracking-wider text-muted">
                  {label}
                </p>
                <p className="mt-1 text-sm font-bold text-ink">{value}</p>
                <p className="text-[12px] text-muted">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="container-x mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">Send A Message</span>
            <h2 className="section-title mt-3 text-ink">
              We&apos;d Love To Hear From You
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Have a question, a special request or a partnership idea? Fill in
              the form and our team will get back to you shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="h-full min-h-105 overflow-hidden rounded-3xl border border-ink/8">
              <iframe
                title="BiteCraft location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=144.9531%2C-37.8186%2C144.9831%2C-37.8036&layer=mapnik&marker=-37.8111%2C144.9681"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
