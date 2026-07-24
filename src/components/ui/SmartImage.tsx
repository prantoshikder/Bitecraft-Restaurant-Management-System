"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a graceful gradient fallback — remote photos occasionally
 * fail and a broken icon would ruin the premium look.
 */
export default function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-brand/25 via-brand/10 to-ink/20",
          className,
        )}
        aria-label={alt}
        role="img"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
          BiteCraft
        </span>
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
