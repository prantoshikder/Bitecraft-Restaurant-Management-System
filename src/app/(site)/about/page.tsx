import type { Metadata } from "next";
import PageBanner from "@/components/site/PageBanner";
import OurStory from "@/components/site/sections/OurStory";
import WhatWeDo from "@/components/site/sections/WhatWeDo";
import WhyChooseUs from "@/components/site/sections/WhyChooseUs";
import Chefs from "@/components/site/sections/Chefs";
import Testimonials from "@/components/site/sections/Testimonials";
import { TbToolsKitchen2, TbUsers, TbAward, TbMoodSmile } from "react-icons/tb";
import Reveal from "@/components/ui/Reveal";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "About Us" };

const STATS = [
  { icon: TbToolsKitchen2, value: "45+", label: "Signature Dishes" },
  { icon: TbUsers, value: "12.4K", label: "Happy Customers" },
  { icon: TbAward, value: "18", label: "Awards Won" },
  { icon: TbMoodSmile, value: "98%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
  const reviews = list("reviews").filter((r) => r.approved);

  return (
    <>
      <PageBanner title="About Us" subtitle="Our Journey" crumb="About" image={IMG.interiors[1]} />

      <section className="bg-cream py-16">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-6">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="size-7" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-ink">{value}</p>
                  <p className="text-[12px] text-muted">{label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <OurStory />
      <WhatWeDo />
      <WhyChooseUs />
      <Chefs />
      <Testimonials reviews={reviews} />
    </>
  );
}
