import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";
import { OUR_STORY_POINTS as POINTS } from "@/temp/home";

export default function OurStory() {
  return (
    <section className="bg-cream pb-20 lg:pb-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title mt-3 max-w-md text-ink">
            Crafting Moments, Creating Memories
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            At BiteCraft we believe that food is more than just a meal — it is an experience. Our
            passion for quality and hospitality drives everything we do, from the first knife cut in
            the kitchen to the last plate cleared from your table.
          </p>

          <ul className="mt-7 space-y-3.5">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <FiCheck className="size-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-8">
            <Link href="/about" className="btn btn-primary">
              More About Us <FiArrowRight className="size-4" />
            </Link>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-extrabold text-ink">18+</p>
                <p className="text-[11px] uppercase tracking-wider text-muted">Years of craft</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-ink">45</p>
                <p className="text-[11px] uppercase tracking-wider text-muted">Signature dishes</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Collage */}
        <Reveal direction="left" delay={0.12}>
          <div className="grid grid-cols-2 grid-rows-[200px_150px] gap-4 sm:grid-rows-[240px_180px]">
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl">
              <SmartImage src={IMG.interiors[0]} alt="Guests dining at BiteCraft" fill sizes="(max-width:1024px) 45vw, 300px" className="object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl">
              <SmartImage src={IMG.interiors[1]} alt="BiteCraft chef at work" fill sizes="(max-width:1024px) 45vw, 300px" className="object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl">
              <SmartImage src={IMG.interiors[2]} alt="BiteCraft dining room" fill sizes="(max-width:1024px) 45vw, 300px" className="object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
