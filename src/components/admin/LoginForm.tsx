"use client";

import Logo from "@/components/site/Logo";
import { IMG } from "@/lib/images";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiAlertCircle, FiArrowRight, FiLock, FiMail } from "react-icons/fi";

const DEMO = [
  { role: "Admin", email: "admin@bitecraft.com", password: "admin123" },
  { role: "Manager", email: "manager@bitecraft.com", password: "manager123" },
  { role: "Staff", email: "staff@bitecraft.com", password: "staff123" },
];

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [email, setEmail] = useState("admin@bitecraft.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0">
          <img
            src={IMG.steakDark}
            alt=""
            className="size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/85 to-ink/50" />
          <div className="absolute -left-24 top-20 size-96 rounded-full bg-brand/15 blur-[130px]" />
        </div>
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo />
          <div>
            <span className="font-script text-3xl text-brand-light">
              Welcome back
            </span>
            <h1 className="mt-2 max-w-sm text-4xl font-extrabold leading-tight text-white">
              Manage your restaurant with ease.
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/50">
              Orders, reservations, menu, staff and analytics — everything you
              need to run BiteCraft, in one beautiful dashboard.
            </p>
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} BiteCraft Restaurant. Built by{" "}
            <a
              href="https://github.com/prantoshikder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors hover:text-brand-light"
            >
              Pranto Shikder
            </a>
            .
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-cream px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <Logo light={false} />
          </div>
          <h2 className="mt-8 text-2xl font-extrabold text-ink lg:mt-0">
            Sign in to Dashboard
          </h2>
          <p className="mt-1 text-sm text-muted">
            Enter your credentials to access the admin panel.
          </p>

          {error ? (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <FiAlertCircle className="size-4 shrink-0" /> {error}
            </div>
          ) : null}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-ink/12 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Password
              </label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-ink/12 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <FiArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-ink/8 bg-white p-5">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">
              Demo Accounts
            </p>
            <div className="mt-3 space-y-2">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => {
                    setEmail(d.email);
                    setPassword(d.password);
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-ink/8 px-3 py-2 text-left text-[13px] transition-colors hover:border-brand hover:bg-brand-soft"
                >
                  <span className="font-semibold text-ink">{d.role}</span>
                  <span className="text-muted">{d.email}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
