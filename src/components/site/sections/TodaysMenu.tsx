import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { money } from "@/lib/utils";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";

export default function TodaysMenu() {
  const items = list("dishes").filter((d) => d.todaysMenu).slice(0, 5);
  const categories = ["Breakfast", "Appetizers", "Special", "Dessert", "Beverages"];

  return (
    <section className="bg-cream pb-20 lg:pb-24">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-3xl bg-brand lg:grid-cols-2">
          {/* Left — menu list */}
          <div className="p-8 sm:p-12">
            <Reveal>
              <span className="font-script text-3xl text-white/90">Today&apos;s Special</span>
              <h2 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">Today&apos;s Menu</h2>

              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((c, i) => (
                  <span
                    key={c}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
                      i === 0 ? "bg-white text-brand-dark" : "bg-white/15 text-white/85"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <ul className="mt-8 space-y-1">
                {items.map((dish) => (
                  <li
                    key={dish.id}
                    className="flex items-center gap-4 border-b border-white/15 py-3.5 last:border-0"
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/20">
                      <SmartImage src={dish.image} alt={dish.name} fill sizes="48px" className="object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">{dish.name}</p>
                      <p className="truncate text-[12px] text-white/60">{dish.description}</p>
                    </div>
                    <span className="text-base font-extrabold text-white">{money(dish.price)}</span>
                  </li>
                ))}
              </ul>

              <Link href="/menu" className="btn mt-8 bg-white text-brand-dark hover:bg-white/90">
                View Full Menu
              </Link>
            </Reveal>
          </div>

          {/* Right — plate */}
          <div className="relative min-h-[320px] overflow-hidden">
            <SmartImage src={IMG.steak} alt="Today's special plate" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute right-6 top-6 grid size-24 place-items-center rounded-full bg-ink text-center text-white shadow-xl">
              <div>
                <p className="text-2xl font-extrabold leading-none text-brand-light">20%</p>
                <p className="text-[10px] uppercase tracking-widest">Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
