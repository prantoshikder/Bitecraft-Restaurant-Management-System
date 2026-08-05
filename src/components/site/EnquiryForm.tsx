"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { trackEvent } from "@/components/seo/Analytics";

export type EnquiryField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  /** Span both columns on desktop. */
  full?: boolean;
};

/**
 * Lead-capture form for the marketing pages (catering, gift cards, …).
 *
 * Every submission lands in the same admin Messages inbox as the contact form —
 * the campaign-specific answers are folded into the message body rather than
 * added to the `Message` type, so no new resource or admin screen is needed and
 * staff keep one place to work from.
 */
export default function EnquiryForm({
  fields,
  subject,
  cta = "Send Enquiry",
  successTitle = "Enquiry received!",
  successText = "Thanks — one of our team will be in touch within one business day.",
  eventName = "generate_lead",
}: {
  fields: EnquiryField[];
  /** Prefix written into the Message subject, e.g. "Catering enquiry". */
  subject: string;
  cta?: string;
  successTitle?: string;
  successText?: string;
  eventName?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Anything that isn't a core Message column becomes a labelled line in the body.
    const details = fields
      .filter((f) => !["name", "email", "phone", "message"].includes(f.name))
      .map((f) => `${f.label}: ${values[f.name] || "—"}`)
      .join("\n");

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name ?? "",
        email: values.email ?? "",
        phone: values.phone ?? "",
        subject: `${subject} — ${values.name || "Website enquiry"}`,
        message: [details, values.message].filter(Boolean).join("\n\n"),
        read: false,
      }),
    }).catch(() => null);

    trackEvent(eventName, { form: subject });
    setStatus("done");
    setValues({});
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-brand-soft p-10 text-center"
      >
        <FiCheckCircle className="size-12 text-brand" />
        <h3 className="text-lg font-bold text-ink">{successTitle}</h3>
        <p className="max-w-sm text-sm text-muted">{successText}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-2">
          Send another
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => {
        const type = field.type ?? "text";
        const shared = {
          id: field.name,
          name: field.name,
          required: field.required ?? false,
          value: values[field.name] ?? "",
          onChange: set(field.name),
          className: inputCls,
        };

        return (
          <div key={field.name} className={field.full || type === "textarea" ? "sm:col-span-2" : undefined}>
            <label htmlFor={field.name} className="mb-1.5 block text-xs font-semibold text-ink/70">
              {field.label}
              {field.required ? <span className="text-brand"> *</span> : null}
            </label>

            {type === "textarea" ? (
              <textarea {...shared} rows={4} placeholder={field.placeholder} />
            ) : type === "select" ? (
              <select {...shared}>
                <option value="">{field.placeholder ?? "Please choose…"}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input {...shared} type={type} placeholder={field.placeholder} />
            )}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : (<>{cta} <FiSend className="size-4" /></>)}
        </button>
        <p className="mt-3 text-xs text-muted">
          By sending this form you agree to our{" "}
          <a href="/privacy" className="font-semibold text-brand hover:underline">
            privacy policy
          </a>
          . We never share your details.
        </p>
      </div>
    </form>
  );
}
