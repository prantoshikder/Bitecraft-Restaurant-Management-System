"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import type { GalleryImage } from "@/lib/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category)))],
    [images],
  );
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                active === c ? "bg-brand text-white" : "border border-ink/10 bg-white text-ink/70 hover:border-brand hover:text-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              onClick={() => setLightbox(img)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={img.url}
                alt={img.title}
                width={400}
                height={i % 3 === 0 ? 520 : 340}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="text-left">
                  <p className="text-[11px] text-brand-light">{img.category}</p>
                  <p className="text-sm font-semibold text-white">{img.title}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/85 p-6 backdrop-blur-sm"
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
              <SmartImage src={lightbox.url} alt={lightbox.title} width={1000} height={700} className="max-h-[80vh] w-full object-contain" />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 text-sm font-semibold text-white">
                {lightbox.title}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
