import ReservationForm from "@/components/site/ReservationForm";
import Reveal from "@/components/ui/Reveal";
import { BOOKING_CONTACT as CONTACT } from "@/temp/home";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

export default function BookingBanner() {
  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-ink py-20 lg:py-24"
    >
      <div className="absolute -left-32 top-10 z-0 size-96 rounded-full bg-brand/10 blur-[130px]" />
      <div className="container-x relative grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal
          direction="right"
          className="rounded-3xl border border-white/8 bg-white/3 p-8 sm:p-10"
        >
          <span className="font-script text-3xl text-brand-light">
            Book A Table
          </span>
          <h2 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
            Reserve Your Table
            <br /> For A Great Experience
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/50">
            Planning a special evening? Reserve your table in seconds and let us
            take care of the rest.
          </p>
          <div className="mt-8">
            <ReservationForm />
          </div>
        </Reveal>

        <Reveal
          direction="left"
          delay={0.1}
          className="flex flex-col justify-between rounded-3xl bg-brand p-8 sm:p-10"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <p className="mt-2 text-sm text-white/70">
              We are here to help. Reach out through any of the channels below.
            </p>

            <ul className="mt-8 space-y-5">
              {CONTACT.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/60">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-[11px] uppercase tracking-wider text-white/60">
              Follow Us
            </p>
            <div className="flex gap-2.5">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="grid size-9 place-items-center rounded-full bg-white/15 text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-brand"
                  >
                    <Icon className="size-4" />
                  </a>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
