"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImQuotesLeft } from "react-icons/im";
import SmartImage from "@/components/ui/SmartImage";
import type { Review } from "@/lib/types";

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const count = reviews.length;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;
  const review = reviews[index];

  return (
    <section className="bg-brand py-20 text-white lg:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
            Client&apos;s Love
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">What Our Customers Say</h2>

          <div className="relative mt-12 min-h-[220px]">
            <ImQuotesLeft className="mx-auto mb-6 size-10 text-white/25" />
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90">
                  &ldquo;{review.message}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`size-4 ${i < review.rating ? "fill-amber-300 text-amber-300" : "text-white/30"}`}
                    />
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="relative size-12 overflow-hidden rounded-full ring-2 ring-white/40">
                    <SmartImage src={review.avatar} alt={review.name} fill sizes="48px" className="object-cover" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-bold">{review.name}</p>
                    <p className="text-[12px] text-white/70">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label="Previous"
              className="grid size-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-brand"
            >
              <FiChevronLeft className="size-5" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label="Next"
              className="grid size-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-brand"
            >
              <FiChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
