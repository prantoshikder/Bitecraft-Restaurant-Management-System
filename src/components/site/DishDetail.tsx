"use client";

import { useState } from "react";
import { FiStar, FiMinus, FiPlus, FiClock, FiZap, FiShoppingBag } from "react-icons/fi";
import { TbFlame, TbLeaf } from "react-icons/tb";
import SmartImage from "@/components/ui/SmartImage";
import DishCard from "@/components/site/DishCard";
import { money } from "@/lib/utils";
import type { Dish } from "@/lib/types";
import { useCart } from "@/components/site/CartProvider";

export default function DishDetail({
  dish,
  categoryName,
  related,
}: {
  dish: Dish;
  categoryName: string;
  related: Dish[];
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <>
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <SmartImage src={dish.image} alt={dish.name} fill priority sizes="(max-width:1024px) 100vw, 560px" className="object-cover" />
            {dish.oldPrice ? (
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                {Math.round((1 - dish.price / dish.oldPrice) * 100)}% Off
              </span>
            ) : null}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold text-brand-dark">{categoryName}</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                <FiStar className="size-4 fill-amber-400 text-amber-400" /> {dish.rating.toFixed(1)}
                <span className="text-muted">({dish.reviews} reviews)</span>
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{dish.name}</h1>
            <p className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand">{money(dish.price)}</span>
              {dish.oldPrice ? <span className="text-lg text-muted line-through">{money(dish.oldPrice)}</span> : null}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted">{dish.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Meta icon={FiClock} label="Prep Time" value={`${dish.prepTime} min`} />
              <Meta icon={FiZap} label="Calories" value={`${dish.calories} kcal`} />
              <Meta icon={TbFlame} label="Spice" value={["Mild", "Medium", "Hot", "Extra"][dish.spicy]} />
              <Meta icon={TbLeaf} label="Type" value={dish.veg ? "Veg" : "Non-Veg"} />
            </div>

            {dish.tags.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {dish.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ink/10 px-3 py-1 text-[11px] font-medium text-ink/70">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-ink/12 bg-white px-2 py-2">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-8 place-items-center rounded-full hover:bg-ink/5">
                  <FiMinus className="size-4" />
                </button>
                <span className="w-6 text-center text-sm font-bold">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-8 place-items-center rounded-full hover:bg-ink/5">
                  <FiPlus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={!dish.available}
                onClick={() => add(dish, qty)}
                className="btn btn-primary flex-1 sm:flex-none disabled:cursor-not-allowed disabled:bg-muted"
              >
                <FiShoppingBag className="size-4" /> {dish.available ? "Add to Cart" : "Sold Out"} · {money(dish.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-cream-2 py-16">
          <div className="container-x">
            <h2 className="mb-8 text-2xl font-extrabold text-ink">You May Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d, i) => (
                <DishCard key={d.id} dish={d} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Meta({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink/8 bg-white p-3 text-center">
      <Icon className="mx-auto size-5 text-brand" />
      <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
