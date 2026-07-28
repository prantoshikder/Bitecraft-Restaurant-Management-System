import PageBanner from "@/components/site/PageBanner";
import ReservationForm from "@/components/site/ReservationForm";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { IMG } from "@/lib/images";
import { PERKS } from "@/temp/reservation";
import type { Metadata } from "next";
import { FiCheck } from "react-icons/fi";

export const metadata: Metadata = { title: "Book A Table" };

export default function ReservationPage() {
  return (
    <>
      <PageBanner
        title="Book A Table"
        subtitle="Reserve Your Spot"
        crumb="Reservation"
        image={IMG.steakDark}
      />

      <section className="bg-ink py-16 lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow text-brand-light">Reservation</span>
            <h2 className="section-title mt-3 text-white">
              Reserve Your Table For A Great Experience
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/50">
              Secure your table in a few seconds. Tell us when you&apos;re
              coming and how many, and we&apos;ll have everything ready.
            </p>

            <ul className="mt-8 space-y-5">
              {PERKS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-[13px] text-white/50">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative mt-10 hidden overflow-hidden rounded-3xl lg:block">
              <SmartImage
                src={IMG.interiors[4]}
                alt="Dining room"
                width={560}
                height={280}
                className="w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal
            direction="left"
            delay={0.1}
            className="rounded-3xl border border-white/8 bg-white/3 p-8 sm:p-10"
          >
            <h3 className="text-lg font-bold text-white">
              Reservation Details
            </h3>
            <p className="mt-1 flex items-center gap-2 text-[13px] text-brand-light">
              <FiCheck className="size-4" /> No booking fee — free cancellation
              anytime.
            </p>
            <div className="mt-8">
              <ReservationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
