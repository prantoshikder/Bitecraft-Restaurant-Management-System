import { FiStar, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { list } from "@/lib/db";

export default function Chefs() {
  const chefs = list("chefs").filter((c) => c.featured);

  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Meet Our Chefs"
          title={
            <>
              The Masters Behind
              <br className="hidden sm:block" /> Every Dish
            </>
          }
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chefs.slice(0, 4).map((chef) => (
            <StaggerItem key={chef.id}>
              <div className="group overflow-hidden rounded-2xl border border-ink/8 bg-white text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]">
                <div className="relative aspect-4/5 overflow-hidden">
                  <SmartImage
                    src={chef.image}
                    alt={chef.name}
                    fill
                    sizes="(max-width:768px) 90vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-gradient-to-t from-ink/85 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                    {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        aria-label="social"
                        className="grid size-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-brand"
                      >
                        <Icon className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-ink">{chef.name}</h3>
                  <p className="text-[12px] text-brand">{chef.title}</p>
                  <div className="mt-2 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`size-3.5 ${
                          i < Math.round(chef.rating) ? "fill-amber-400 text-amber-400" : "text-ink/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
