"use client";

import Link from "next/link";
import { Breadcrumb } from "antd";

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
  actions,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Breadcrumb
          items={[
            { title: <Link href="/admin">Dashboard</Link> },
            ...crumbs.map((c) => ({ title: c.href ? <Link href={c.href}>{c.label}</Link> : c.label })),
          ]}
        />
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
