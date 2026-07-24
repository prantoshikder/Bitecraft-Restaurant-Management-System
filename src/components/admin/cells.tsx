"use client";

import { Avatar, Tag } from "antd";
import { money as fmtMoney, formatDate } from "@/lib/utils";

export const STATUS_COLORS: Record<string, string> = {
  // orders
  pending: "gold",
  preparing: "blue",
  ready: "cyan",
  served: "geekblue",
  completed: "green",
  cancelled: "red",
  // reservations
  confirmed: "green",
  seated: "geekblue",
  // tables
  available: "green",
  occupied: "red",
  reserved: "gold",
  cleaning: "blue",
  // generic
  active: "green",
  inactive: "default",
  "on-leave": "gold",
  paid: "green",
  unpaid: "red",
};

export const TIER_COLORS: Record<string, string> = {
  Bronze: "orange",
  Silver: "default",
  Gold: "gold",
  Platinum: "geekblue",
};

export function StatusTag({ value }: { value: string }) {
  return (
    <Tag color={STATUS_COLORS[value] ?? "default"} className="!m-0 capitalize">
      {String(value).replace("-", " ")}
    </Tag>
  );
}

export function MoneyCell({ value, bold = true }: { value: number; bold?: boolean }) {
  return <span className={bold ? "font-bold text-ink" : "text-ink"}>{fmtMoney(value)}</span>;
}

export function DateCell({ value }: { value: string }) {
  if (!value) return <span className="text-muted">—</span>;
  return <span className="text-ink/70">{formatDate(value)}</span>;
}

export function ImageCell({ src, name, rounded = false }: { src: string; name: string; rounded?: boolean }) {
  return (
    <Avatar src={src} shape={rounded ? "circle" : "square"} size={44}>
      {name?.[0]}
    </Avatar>
  );
}

export function UserCell({ src, name, sub }: { src?: string; name: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src={src} size={38}>{name?.[0]}</Avatar>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{name}</p>
        {sub ? <p className="text-[11px] text-muted">{sub}</p> : null}
      </div>
    </div>
  );
}

export function Tags({ items }: { items: string[] }) {
  if (!items?.length) return <span className="text-muted">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.slice(0, 3).map((t) => (
        <Tag key={t} className="!m-0" color="lime">{t}</Tag>
      ))}
      {items.length > 3 ? <Tag className="!m-0">+{items.length - 3}</Tag> : null}
    </div>
  );
}
