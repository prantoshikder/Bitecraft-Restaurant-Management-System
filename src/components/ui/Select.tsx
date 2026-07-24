"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
  icon?: React.ReactNode;
  hint?: string;
};

type SelectProps<T extends string> = {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
  align?: "left" | "right";
};

/**
 * Premium, fully-custom select — animated, keyboard accessible and theme aware.
 * A drop-in replacement for a native <select> on the customer-facing site.
 */
export default function Select<T extends string>({
  value,
  options,
  onChange,
  placeholder = "Select...",
  label,
  size = "md",
  className,
  align = "left",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Sync highlighted option with current value when opening
  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value);
      setActiveIndex(i < 0 ? 0 : i);
    }
  }, [open, options, value]);

  function pick(v: T) {
    onChange(v);
    setOpen(false);
  }

  function onTriggerKey(e: React.KeyboardEvent) {
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(options[activeIndex].value);
    }
  }

  const trigger = size === "sm" ? "py-2 pl-3.5 pr-10 text-[13px]" : "py-3 pl-4 pr-11 text-sm";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label ? (
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "group relative flex w-full items-center gap-2 rounded-full border bg-white font-medium text-ink outline-none transition-all",
          trigger,
          open
            ? "border-brand shadow-[0_0_0_4px_rgba(140,179,63,0.14)]"
            : "border-ink/12 hover:border-brand/60",
        )}
      >
        {selected?.icon ? <span className="shrink-0 text-brand">{selected.icon}</span> : null}
        <span className={cn("truncate", !selected && "text-muted")}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted transition-colors group-hover:text-brand",
            size === "sm" ? "right-3" : "right-4",
          )}
        >
          <FiChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-50 mt-2 max-h-72 w-full min-w-[180px] overflow-auto rounded-2xl border border-ink/8 bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(16,24,16,0.35)]",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            {options.map((opt, i) => {
              const active = opt.value === value;
              const highlighted = i === activeIndex;
              return (
                <li key={opt.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => pick(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors",
                      active
                        ? "bg-brand text-white"
                        : highlighted
                          ? "bg-brand-soft text-ink"
                          : "text-ink/75",
                    )}
                  >
                    {opt.icon ? (
                      <span className={cn("shrink-0", active ? "text-white" : "text-brand")}>{opt.icon}</span>
                    ) : null}
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-medium">{opt.label}</span>
                      {opt.hint ? (
                        <span className={cn("ml-1.5 text-[11px]", active ? "text-white/70" : "text-muted")}>
                          {opt.hint}
                        </span>
                      ) : null}
                    </span>
                    {active ? <FiCheck className="size-4 shrink-0" strokeWidth={2.5} /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
