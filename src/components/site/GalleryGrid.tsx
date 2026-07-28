"use client";

import SmartImage from "@/components/ui/SmartImage";
import type { GalleryImage } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";

const ALL = "All";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  /** Tabs are derived from the data, so a new category shows up on its own. */
  const tabs = useMemo(
    () => [ALL, ...Array.from(new Set(images.map((i) => i.category)))],
    [images],
  );

  const [active, setActive] = useState(ALL);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered =
    active === ALL ? images : images.filter((i) => i.category === active);

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs — left */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter photos by category"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                aria-pressed={active === tab}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active === tab
                    ? "bg-brand text-white shadow-[0_10px_25px_-12px_rgba(140,179,63,0.9)]"
                    : "border border-ink/10 bg-white text-ink/70 hover:border-brand hover:text-brand"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Count — right. Reflects whatever the active tab is showing. */}
          <p className="shrink-0 text-sm text-muted lg:text-right">
            Showing <span className="font-bold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "photo" : "photos"}
          </p>
        </div>

        {/* A real grid rather than CSS `columns` — column balancing was leaving
            the last column empty whenever the tile heights didn't divide evenly. */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              onClick={() => setLightbox(img)}
              className="group relative block aspect-4/3 w-full overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-ink/80 via-ink/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="text-left">
                  <p className="text-[11px] text-brand-light">{img.category}</p>
                  <p className="text-sm font-semibold text-white">
                    {img.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted">
            No photos in this category yet.
          </p>
        ) : null}
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-80 grid place-items-center bg-ink/85 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiX className="size-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={lightbox.url}
                alt={lightbox.title}
                width={1000}
                height={700}
                className="max-h-[80vh] w-full object-contain"
              />
              <p className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 to-transparent p-5 text-sm font-semibold text-white">
                {lightbox.title}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
