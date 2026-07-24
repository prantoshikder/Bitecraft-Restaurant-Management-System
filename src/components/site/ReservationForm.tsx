"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser, FiPhone, FiMail, FiUsers, FiCalendar, FiClock, FiCheckCircle, FiSend,
} from "react-icons/fi";

const initial = { name: "", phone: "", email: "", guests: "2", date: "", time: "", message: "" };

export default function ReservationForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, guests: Number(form.guests), status: "pending" }),
    }).catch(() => null);
    setStatus("done");
    setForm(initial);
    setTimeout(() => setStatus("idle"), 5000);
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-brand/30 bg-brand/10 p-10 text-center"
      >
        <FiCheckCircle className="size-12 text-brand" />
        <h3 className="text-lg font-bold text-white">Reservation Received!</h3>
        <p className="max-w-xs text-sm text-white/60">
          Thank you. Our team will call you shortly to confirm your table.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-white/12 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand";

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field icon={FiUser}>
          <input required value={form.name} onChange={set("name")} placeholder="Your Name" className={inputCls} />
        </Field>
        <Field icon={FiPhone}>
          <input required value={form.phone} onChange={set("phone")} placeholder="Phone Number" className={inputCls} />
        </Field>
        <Field icon={FiMail}>
          <input required type="email" value={form.email} onChange={set("email")} placeholder="Email Address" className={inputCls} />
        </Field>
        <Field icon={FiUsers}>
          <input required type="number" min={1} max={30} value={form.guests} onChange={set("guests")} placeholder="Guests" className={inputCls} />
        </Field>
        <Field icon={FiCalendar}>
          <input required type="date" value={form.date} onChange={set("date")} className={`${inputCls} [color-scheme:dark]`} />
        </Field>
        <Field icon={FiClock}>
          <input required type="time" value={form.time} onChange={set("time")} className={`${inputCls} [color-scheme:dark]`} />
        </Field>
      </div>

      {!compact ? (
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={3}
          placeholder="Special requests (optional)"
          className="w-full rounded-lg border border-white/12 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
        />
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full">
        {status === "sending" ? "Booking..." : (<>Book Now <FiSend className="size-4" /></>)}
      </button>
    </form>
  );
}

function Field({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-light" />
      {children}
    </div>
  );
}
