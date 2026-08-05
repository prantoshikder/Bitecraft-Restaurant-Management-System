"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export type AccordionItem = { q: string; a: string };

/**
 * Answers are always in the DOM (only their height animates), so crawlers and
 * screen readers see the full text even while a panel is visually collapsed.
 */
export default function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="divide-y divide-ink/8 overflow-hidden rounded-2xl border border-ink/8 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-cream"
              >
                <span className="flex-1 text-[15px] font-bold text-ink">{item.q}</span>
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-brand text-white" : "bg-brand-soft text-brand"
                  }`}
                >
                  <FiPlus className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
