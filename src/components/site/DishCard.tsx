"use client";

import { useCart } from "@/components/site/CartProvider";
import SmartImage from "@/components/ui/SmartImage";
import type { Dish } from "@/lib/types";
import { money } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock, FiPlus, FiStar } from "react-icons/fi";

export default function DishCard({
  dish,
  index = 0,
}: {
  dish: Dish;
  index?: number;
}) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-card)"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <SmartImage
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width:768px) 90vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {dish.oldPrice ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {Math.round((1 - dish.price / dish.oldPrice) * 100)}% Off
          </span>
        ) : null}
        {!dish.available ? (
          <span className="absolute inset-0 grid place-items-center bg-ink/65 text-xs font-bold uppercase tracking-widest text-white">
            Sold out
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => add(dish)}
          disabled={!dish.available}
          aria-label={`Add ${dish.name} to cart`}
          className="absolute bottom-3 right-3 grid size-9 translate-y-3 place-items-center rounded-full bg-brand text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-brand-dark group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:bg-muted"
        >
          <FiPlus className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/menu/${dish.slug}`}
          className="text-sm font-bold text-ink transition-colors hover:text-brand"
        >
          {dish.name}
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-[12px] leading-relaxed text-muted">
          {dish.description}
        </p>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <FiClock className="size-3" /> {dish.prepTime} min
          </span>
          <span>{dish.calories} kcal</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-ink/6 pt-3">
          <p className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-brand">
              {money(dish.price)}
            </span>
            {dish.oldPrice ? (
              <span className="text-[11px] text-muted line-through">
                {money(dish.oldPrice)}
              </span>
            ) : null}
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink">
            <FiStar className="size-3.5 fill-amber-400 text-amber-400" />
            {dish.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
