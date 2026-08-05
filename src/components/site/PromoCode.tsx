"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { trackEvent } from "@/components/seo/Analytics";

/**
 * Click-to-copy promo code. Copying is the actual conversion moment on the
 * offers page, so it fires an analytics event you can build an audience on.
 */
export default function PromoCode({ code, tone = "dark" }: { code: string; tone?: "dark" | "light" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return; // clipboard blocked (insecure origin or denied) — the code is still visible
    }
    setCopied(true);
    trackEvent("promo_code_copied", { code });
    setTimeout(() => setCopied(false), 2200);
  }

  const styles =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white hover:border-brand hover:bg-brand"
      : "border-brand/30 bg-brand-soft text-brand hover:border-brand hover:bg-brand hover:text-white";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy promo code ${code}`}
      className={`inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all ${styles}`}
    >
      {code}
      {copied ? <FiCheck className="size-3.5" /> : <FiCopy className="size-3.5" />}
      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
    </button>
  );
}
