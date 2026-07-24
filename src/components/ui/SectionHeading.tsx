import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn("eyebrow", light && "text-brand-light")}>{eyebrow}</span>
      ) : null}
      <h2 className={cn("section-title max-w-2xl", light ? "text-white" : "text-ink")}>{title}</h2>
      {description ? (
        <p className={cn("max-w-xl text-sm leading-relaxed", light ? "text-white/60" : "text-muted")}>
          {description}
        </p>
      ) : null}
      <span className="mt-1 h-[3px] w-14 rounded-full bg-brand" />
    </Reveal>
  );
}
