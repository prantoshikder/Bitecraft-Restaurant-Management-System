"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Only strings that next/image can actually resolve — absolute http(s) URLs or
 *  root-relative paths. Anything else (empty, garbage, relative) would make
 *  next/image throw during render and 500 the page, so we fall back instead. */
function isRenderableSrc(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return true; // static import — trust it
  const value = src.trim();
  if (!value) return false;
  if (value.startsWith("/")) return true; // local asset
  if (value.startsWith("data:")) return true;
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !!url.hostname &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

/**
 * next/image with a graceful gradient fallback — remote photos occasionally
 * fail (bad host, dead link, invalid URL) and a broken/crashing image would
 * ruin the premium look. This keeps the page alive no matter what URL is stored.
 */
export default function SmartImage({
  className,
  alt,
  src,
  ...props
}: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !isRenderableSrc(src)) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-linear-to-br from-brand/25 via-brand/10 to-ink/20",
          className,
        )}
        aria-label={alt}
        role="img"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
          PlateCraft
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
