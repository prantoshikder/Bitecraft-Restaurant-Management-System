"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiSend } from "react-icons/fi";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, read: false }),
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
        className="flex flex-col items-center gap-3 rounded-2xl bg-brand-soft p-10 text-center"
      >
        <FiCheckCircle className="size-12 text-brand" />
        <h3 className="text-lg font-bold text-ink">Message Sent!</h3>
        <p className="max-w-xs text-sm text-muted">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={form.name} onChange={set("name")} placeholder="Your Name" className={inputCls} />
        <input required type="email" value={form.email} onChange={set("email")} placeholder="Email Address" className={inputCls} />
        <input value={form.phone} onChange={set("phone")} placeholder="Phone Number" className={inputCls} />
        <input required value={form.subject} onChange={set("subject")} placeholder="Subject" className={inputCls} />
      </div>
      <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Your Message" className={inputCls} />
      <button type="submit" disabled={status === "sending"} className="btn btn-primary">
        {status === "sending" ? "Sending..." : (<>Send Message <FiSend className="size-4" /></>)}
      </button>
    </form>
  );
}
