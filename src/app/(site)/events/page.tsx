import PageBanner from "@/components/site/PageBanner";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";
import { formatDate, money } from "@/lib/utils";
import type { Metadata } from "next";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  const events = list("events").filter((e) => e.published);

  return (
    <>
      <PageBanner
        title="Upcoming Events"
        subtitle="Join Us"
        crumb="Events"
        image={IMG.events[0]}
      />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-8">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.05}>
              <article className="grid overflow-hidden rounded-3xl border border-ink/8 bg-white lg:grid-cols-[1fr_1.4fr]">
                <div className="relative min-h-55 overflow-hidden">
                  <SmartImage
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 400px"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-xl bg-ink/85 px-3 py-2 text-center text-white backdrop-blur-sm">
                    <span className="block text-lg font-extrabold leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7">
                  <h3 className="text-xl font-extrabold text-ink">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {event.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink/70">
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="size-4 text-brand" />{" "}
                      {formatDate(event.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock className="size-4 text-brand" /> {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiUsers className="size-4 text-brand" /> {event.seats}{" "}
                      seats
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-lg font-extrabold text-brand">
                      {money(event.price)}
                      <span className="text-xs font-medium text-muted">
                        {" "}
                        / person
                      </span>
                    </span>
                    <a href="/reservation" className="btn btn-primary ml-auto">
                      Reserve Seat
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
