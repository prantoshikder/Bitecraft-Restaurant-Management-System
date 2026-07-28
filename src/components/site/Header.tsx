"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { NAV, TOPBAR } from "@/temp/layout";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-400",
        scrolled
          ? "border-b border-white/10 bg-ink/92 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* Utility bar — collapses on scroll */}
      <div
        className={cn(
          "hidden overflow-hidden border-b border-white/10 transition-all duration-400 lg:block",
          scrolled ? "h-0 border-transparent opacity-0" : "h-11 opacity-100",
        )}
      >
        <div className="container-x flex h-11 items-center justify-end gap-8">
          {TOPBAR.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="grid size-6 place-items-center rounded-full bg-brand/20 text-brand-light">
                <Icon className="size-3" />
              </span>
              <span className="text-[11px] leading-tight text-white/45">
                {label}
                <span className="ml-1.5 font-semibold text-white/85">
                  {value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x flex h-17 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "text-brand-light"
                    : "text-white/70 hover:text-white",
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/reservation"
            className="btn btn-primary hidden sm:inline-flex"
          >
            Book A Table
            <FiChevronRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
          >
            {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/5 py-3 text-sm font-medium text-white/80"
                >
                  {item.label}
                  <FiChevronRight className="size-4 text-brand" />
                </Link>
              ))}
              <Link href="/reservation" className="btn btn-primary mt-4">
                Book A Table
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
