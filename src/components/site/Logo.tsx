import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({
  light = true,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand shadow-[0_8px_20px_-8px_rgba(140,179,63,0.9)] transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
          <path d="M9 13v8" />
          <path d="M7 3v5" />
          <path d="M11 3v5" />
          <path d="M17 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6Z" />
          <path d="M17 12v9" />
        </svg>
      </span>
      <span
        className={cn(
          "text-lg font-extrabold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        Plate<span className="text-brand">Craft</span>
      </span>
    </Link>
  );
}
