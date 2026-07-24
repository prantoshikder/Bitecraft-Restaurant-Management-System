"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import { money } from "@/lib/utils";
import { useCart } from "@/components/site/CartProvider";

const DELIVERY_FEE = 3.5;

export default function CheckoutPage() {
  const { lines, subtotal, tax, setQty, clear } = useCart();
  const [type, setType] = useState<"dine-in" | "takeaway" | "delivery">("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "", paymentMethod: "cash" });
  const [status, setStatus] = useState<"idle" | "placing" | "done">("idle");
  const [code, setCode] = useState("");

  const fee = type === "delivery" ? DELIVERY_FEE : 0;
  const total = Math.round((subtotal + tax + fee) * 100) / 100;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    setStatus("placing");
    const orderCode = `#BC${Math.floor(1000 + Math.random() * 9000)}`;
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: orderCode,
        customerName: form.name,
        phone: form.phone,
        address: type === "delivery" ? form.address : undefined,
        type,
        tableId: null,
        items: lines.map((l) => ({ dishId: l.dishId, name: l.name, price: l.price, qty: l.qty })),
        subtotal,
        tax,
        discount: 0,
        total,
        status: "pending",
        paymentMethod: form.paymentMethod,
        paid: false,
        note: form.note,
      }),
    }).catch(() => null);
    setCode(orderCode);
    setStatus("done");
    clear();
  }

  if (status === "done") {
    return (
      <div className="grid min-h-[70vh] place-items-center bg-cream px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md rounded-3xl border border-ink/8 bg-white p-10 text-center shadow-[var(--shadow-card)]"
        >
          <FiCheckCircle className="mx-auto size-16 text-brand" />
          <h1 className="mt-5 text-2xl font-extrabold text-ink">Order Placed!</h1>
          <p className="mt-2 text-sm text-muted">
            Your order <span className="font-bold text-brand">{code}</span> has been received. Our
            kitchen is on it — you&apos;ll get a call shortly.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/menu" className="btn btn-outline">Order More</Link>
            <Link href="/" className="btn btn-primary">Back Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-16 lg:pt-40">
      <div className="container-x">
        <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          <FiArrowLeft className="size-4" /> Continue Shopping
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold text-ink">Checkout</h1>

        {lines.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-ink/8 bg-white py-20 text-center">
            <FiShoppingBag className="size-14 text-brand" />
            <p className="text-lg font-bold text-ink">Your cart is empty</p>
            <Link href="/menu" className="btn btn-primary mt-2">Browse Menu</Link>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Details */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-ink/8 bg-white p-6">
                <h2 className="text-base font-bold text-ink">Order Type</h2>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {(["dine-in", "takeaway", "delivery"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition-colors ${
                        type === t ? "border-brand bg-brand-soft text-brand-dark" : "border-ink/10 text-ink/60 hover:border-brand"
                      }`}
                    >
                      {t.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-ink/8 bg-white p-6">
                <h2 className="text-base font-bold text-ink">Contact Details</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required value={form.name} onChange={set("name")} placeholder="Full Name" className="rounded-lg border border-ink/12 px-4 py-3 text-sm outline-none focus:border-brand" />
                  <input required value={form.phone} onChange={set("phone")} placeholder="Phone Number" className="rounded-lg border border-ink/12 px-4 py-3 text-sm outline-none focus:border-brand" />
                  {type === "delivery" ? (
                    <input required value={form.address} onChange={set("address")} placeholder="Delivery Address" className="rounded-lg border border-ink/12 px-4 py-3 text-sm outline-none focus:border-brand sm:col-span-2" />
                  ) : null}
                  <textarea value={form.note} onChange={set("note")} rows={2} placeholder="Order note (optional)" className="rounded-lg border border-ink/12 px-4 py-3 text-sm outline-none focus:border-brand sm:col-span-2" />
                </div>
              </div>

              <div className="rounded-3xl border border-ink/8 bg-white p-6">
                <h2 className="text-base font-bold text-ink">Payment Method</h2>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {(["cash", "card", "online"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, paymentMethod: m }))}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition-colors ${
                        form.paymentMethod === m ? "border-brand bg-brand-soft text-brand-dark" : "border-ink/10 text-ink/60 hover:border-brand"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="h-fit rounded-3xl border border-ink/8 bg-white p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold text-ink">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {lines.map((line) => (
                  <div key={line.dishId} className="flex items-center gap-3">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <SmartImage src={line.image} alt={line.name} fill sizes="48px" className="object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{line.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <button type="button" onClick={() => setQty(line.dishId, line.qty - 1)} className="rounded border border-ink/10 px-1.5">−</button>
                        <span>{line.qty}</span>
                        <button type="button" onClick={() => setQty(line.dishId, line.qty + 1)} className="rounded border border-ink/10 px-1.5">+</button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-ink">{money(line.price * line.qty)}</span>
                  </div>
                ))}
              </div>

              <dl className="mt-5 space-y-2 border-t border-ink/8 pt-4 text-sm">
                <div className="flex justify-between text-muted"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div className="flex justify-between text-muted"><dt>Tax (8%)</dt><dd>{money(tax)}</dd></div>
                <div className="flex justify-between text-muted"><dt>Delivery</dt><dd>{fee === 0 ? "Free" : money(fee)}</dd></div>
                <div className="flex justify-between border-t border-ink/8 pt-2 text-base font-extrabold text-ink">
                  <dt>Total</dt><dd className="text-brand">{money(total)}</dd>
                </div>
              </dl>

              <button type="submit" disabled={status === "placing"} className="btn btn-primary mt-5 w-full">
                {status === "placing" ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
