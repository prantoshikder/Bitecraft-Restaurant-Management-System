"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

export default function StatCard({
  icon: Icon,
  label,
  value,
  change,
  tint = "brand",
  index = 0,
  suffix,
}: {
  icon: IconType;
  label: string;
  value: string | number;
  change?: number;
  tint?: "brand" | "blue" | "amber" | "violet" | "rose";
  index?: number;
  suffix?: string;
}) {
  const tints: Record<string, string> = {
    brand: "bg-brand-soft text-brand-dark",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
  };

  const up = (change ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-2xl border border-ink/8 bg-white p-5"
    >
      <div className="flex items-start justify-between">
        <span className={`grid size-11 place-items-center rounded-xl ${tints[tint]}`}>
          <Icon className="size-5" />
        </span>
        {typeof change === "number" ? (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${up ? "bg-brand-soft text-brand-dark" : "bg-rose-50 text-rose-600"}`}>
            {up ? <FiArrowUpRight className="size-3" /> : <FiArrowDownRight className="size-3" />}
            {Math.abs(change)}%
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-ink">
        {value}
        {suffix ? <span className="text-base font-semibold text-muted">{suffix}</span> : null}
      </p>
      <p className="mt-0.5 text-[13px] text-muted">{label}</p>
    </motion.div>
  );
}
