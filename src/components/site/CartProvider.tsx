"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Dish } from "@/lib/types";

export type CartLine = { dishId: string; name: string; price: number; image: string; qty: number };

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  tax: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (dish: Dish, qty?: number) => void;
  setQty: (dishId: string, qty: number) => void;
  removeLine: (dishId: string) => void;
  clear: () => void;
};

const TAX_RATE = 0.08;
const STORAGE_KEY = "platecraft.cart";

const Ctx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((dish: Dish, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.dishId === dish.id);
      if (found) {
        return prev.map((l) => (l.dishId === dish.id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { dishId: dish.id, name: dish.name, price: dish.price, image: dish.image, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((dishId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.dishId !== dishId)
        : prev.map((l) => (l.dishId === dishId ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((dishId: string) => {
    setLines((prev) => prev.filter((l) => l.dishId !== dishId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContext>(() => {
    const subtotal = Math.round(lines.reduce((s, l) => s + l.price * l.qty, 0) * 100) / 100;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      tax,
      total: Math.round((subtotal + tax) * 100) / 100,
      open,
      setOpen,
      add,
      setQty,
      removeLine,
      clear,
    };
  }, [lines, open, add, setQty, removeLine, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
