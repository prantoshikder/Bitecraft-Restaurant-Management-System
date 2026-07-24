"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiShoppingBag, FiX, FiPlus, FiMinus, FiTrash2, FiArrowRight } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import { money } from "@/lib/utils";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open cart"
      className="fixed bottom-6 left-6 z-40 grid size-13 place-items-center rounded-full bg-ink text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.8)] transition-transform hover:scale-105"
    >
      <FiShoppingBag className="size-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, setQty, removeLine, subtotal, tax, total, clear } = useCart();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <FiShoppingBag className="size-5 text-brand" />
                <h3 className="text-base font-bold text-ink">Your Order</h3>
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-dark">
                  {lines.length} items
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid size-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
              >
                <FiX className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
                  <FiShoppingBag className="size-7" />
                </span>
                <p className="text-sm font-semibold text-ink">Your cart is empty</p>
                <p className="max-w-[220px] text-xs text-muted">
                  Add something delicious from our menu to get started.
                </p>
                <Link href="/menu" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  {lines.map((line) => (
                    <div key={line.dishId} className="flex gap-3 rounded-2xl border border-ink/8 bg-white p-3">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <SmartImage src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-ink">{line.name}</p>
                          <button
                            type="button"
                            onClick={() => removeLine(line.dishId)}
                            aria-label="Remove"
                            className="text-ink/30 transition-colors hover:text-red-500"
                          >
                            <FiTrash2 className="size-4" />
                          </button>
                        </div>
                        <p className="text-xs text-brand">{money(line.price)}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQty(line.dishId, line.qty - 1)}
                              aria-label="Decrease"
                              className="grid size-6 place-items-center rounded-md border border-ink/10 text-ink/70 hover:bg-ink/5"
                            >
                              <FiMinus className="size-3" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.dishId, line.qty + 1)}
                              aria-label="Increase"
                              className="grid size-6 place-items-center rounded-md border border-ink/10 text-ink/70 hover:bg-ink/5"
                            >
                              <FiPlus className="size-3" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-ink">{money(line.price * line.qty)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-medium text-muted underline-offset-2 hover:text-red-500 hover:underline"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="border-t border-ink/8 bg-white px-6 py-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted">
                      <dt>Subtotal</dt>
                      <dd>{money(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-muted">
                      <dt>Tax (8%)</dt>
                      <dd>{money(tax)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-ink/8 pt-2 text-base font-extrabold text-ink">
                      <dt>Total</dt>
                      <dd className="text-brand">{money(total)}</dd>
                    </div>
                  </dl>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
                    Checkout <FiArrowRight className="size-4" />
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
