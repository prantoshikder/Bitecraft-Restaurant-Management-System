"use client";

import { useId } from "react";

const BRAND = "#8cb33f";

/** Smooth area + line chart built from an SVG path — no external chart lib. */
export function AreaChart({
  data,
  height = 240,
  valueKey = "revenue",
  prefix = "$",
}: {
  data: Array<{ label: string; revenue: number; orders: number }>;
  height?: number;
  valueKey?: "revenue" | "orders";
  prefix?: string;
}) {
  const gradId = useId();
  const W = 640;
  const H = height;
  const pad = { top: 20, right: 16, bottom: 28, left: 44 };
  const iw = W - pad.left - pad.right;
  const ih = H - pad.top - pad.bottom;

  const values = data.map((d) => d[valueKey]);
  const max = Math.max(...values, 1) * 1.15;
  const stepX = data.length > 1 ? iw / (data.length - 1) : iw;

  const points = data.map((d, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + ih - (d[valueKey] / max) * ih,
  }));

  const line = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} ${pad.top + ih} L ${points[0].x} ${pad.top + ih} Z`;
  const gridLines = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Revenue chart">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRAND} stopOpacity="0.35" />
          <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const y = pad.top + (ih / gridLines) * i;
        const val = Math.round((max * (gridLines - i)) / gridLines);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="#eceee7" strokeWidth="1" />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9aa295">
              {prefix}{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
            </text>
          </g>
        );
      })}

      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={BRAND} strokeWidth="2.5" />
          <text x={p.x} y={H - 8} textAnchor="middle" fontSize="10" fill="#9aa295">
            {data[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Horizontal bars for category revenue. */
export function BarList({ data, prefix = "$" }: { data: Array<{ label: string; value: number }>; prefix?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-[13px]">
            <span className="font-medium text-ink">{d.label}</span>
            <span className="font-semibold text-muted">{prefix}{d.value.toLocaleString()}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cream-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-light to-brand transition-[width] duration-700"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Donut chart with center label. */
export function Donut({
  data,
  size = 180,
}: {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f1ec" strokeWidth="16" />
        {data.map((d) => {
          const len = (d.value / total) * c;
          const el = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-[13px]">
            <span className="size-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-ink">{d.label}</span>
            <span className="ml-auto font-semibold text-muted">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
