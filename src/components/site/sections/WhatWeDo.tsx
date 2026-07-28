import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { WHAT_WE_DO_ITEMS as ITEMS } from "@/temp/home";

export default function WhatWeDo() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Great Food, Great Mood
              <br className="hidden sm:block" /> Every Single Time
            </>
          }
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="group card-hover h-full rounded-2xl border border-ink/8 bg-white p-7 text-center">
                <span className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-8" />
                </span>
                <h3 className="mb-2.5 text-base font-bold text-ink">{title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
