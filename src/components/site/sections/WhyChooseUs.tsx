import { TbAward, TbSoup, TbHeart, TbUsers } from "react-icons/tb";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

const FEATURES = [
  { icon: TbAward, title: "Quality Food", text: "We serve only the best quality food, every plate, every time." },
  { icon: TbSoup, title: "Hygienic Kitchen", text: "Cleanliness and safety are our top priority in the kitchen." },
  { icon: TbHeart, title: "Cozy Ambience", text: "Enjoy your meal in a warm, welcoming environment." },
  { icon: TbUsers, title: "Happy Customers", text: "Thousands of happy customers served daily and counting." },
];

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-ink">
      <div className="container-x grid items-stretch gap-0 lg:grid-cols-2">
        <Reveal direction="right" className="relative min-h-[340px] lg:min-h-[520px]">
          <div className="relative h-full w-full overflow-hidden lg:rounded-r-3xl">
            <SmartImage src={IMG.steakDark} alt="Signature steak" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center py-16 lg:pl-14 lg:pr-4">
          <Reveal direction="left">
            <span className="eyebrow text-brand-light">Why Choose Us</span>
            <h2 className="section-title mt-3 max-w-sm text-white">More Than Just A Restaurant</h2>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} direction="left" delay={0.08 * i}>
                <div className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/50">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
