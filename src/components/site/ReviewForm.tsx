"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiSend, FiStar } from "react-icons/fi";
import { trackEvent } from "@/components/seo/Analytics";
import { avatar } from "@/lib/images";

const initial = { name: "", role: "", message: "" };

/**
 * Guest review submission.
 *
 * Reviews are created with `approved: false` and stay invisible on the site
 * until someone approves them in the admin panel — the same flag the homepage
 * testimonial slider and the reviews wall filter on. That moderation step is
 * what keeps the aggregate rating in our structured data honest.
 */
export default function ReviewForm() {
  const [form, setForm] = useState(initial);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        role: form.role || "Guest",
        message: form.message,
        rating,
        // Placeholder portrait so the moderated review looks right on the wall.
        avatar: avatar(Math.floor(Math.random() * 70) + 1),
        approved: false,
      }),
    }).catch(() => null);

    trackEvent("review_submitted", { rating });
    setStatus("done");
    setForm(initial);
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-brand-soft p-10 text-center"
      >
        <FiCheckCircle className="size-12 text-brand" />
        <h3 className="text-lg font-bold text-ink">Thank you!</h3>
        <p className="max-w-sm text-sm text-muted">
          Your review has been sent to our team. Once it is approved it will appear on this page.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <span className="mb-1.5 block text-xs font-semibold text-ink/70">Your rating</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${i + 1} out of 5`}
              className="p-0.5"
            >
              <FiStar
                className={`size-6 transition-colors ${
                  i < (hover || rating) ? "fill-amber-400 text-amber-400" : "text-ink/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={form.name} onChange={set("name")} placeholder="Your Name" className={inputCls} />
        <input
          value={form.role}
          onChange={set("role")}
          placeholder="Where you're from (optional)"
          className={inputCls}
        />
      </div>
      <textarea
        required
        rows={4}
        value={form.message}
        onChange={set("message")}
        placeholder="Tell us about your visit — the dishes, the service, the room…"
        className={inputCls}
      />
      <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
        {status === "sending" ? "Sending…" : (<>Submit Review <FiSend className="size-4" /></>)}
      </button>
      <p className="text-xs text-muted">
        Reviews are moderated before they go live, usually within a day.
      </p>
    </form>
  );
}
