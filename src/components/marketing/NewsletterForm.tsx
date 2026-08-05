"use client";

import { useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";
import { trackEvent } from "@/components/seo/Analytics";

/**
 * Newsletter signup — the cheapest owned marketing channel this site has.
 * Used in the Footer (dark) and on the Offers page (light).
 */
export default function NewsletterForm({
  tone = "dark",
  layout = "stacked",
  cta = "Subscribe",
  source = "footer",
}: {
  tone?: "dark" | "light";
  layout?: "stacked" | "inline";
  cta?: string;
  /** Recorded with the analytics event so you can tell which placement converts. */
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);

    trackEvent("newsletter_signup", { source });
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3500);
  }

  const inputCls =
    tone === "dark"
      ? "w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
      : "w-full rounded-lg border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

  return (
    <form
      onSubmit={subscribe}
      className={layout === "inline" ? "flex flex-col gap-3 sm:flex-row" : "space-y-3"}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        aria-label="Email address"
        className={inputCls}
      />
      <button type="submit" className={`btn btn-primary ${layout === "inline" ? "shrink-0" : "w-full"}`}>
        {done ? (
          <>
            <FiCheck className="size-4" /> Subscribed
          </>
        ) : (
          <>
            {cta} <FiSend className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
