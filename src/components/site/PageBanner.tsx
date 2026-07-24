import SmartImage from "@/components/ui/SmartImage";
import { IMG } from "@/lib/images";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function PageBanner({
  title,
  subtitle,
  crumb,
  image = IMG.steakDark,
}: {
  title: string;
  subtitle?: string;
  crumb?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate flex min-h-90 items-center overflow-hidden bg-ink pt-32 pb-16 lg:min-h-105 lg:pt-40">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/85 to-ink/60" />
        <div className="noise absolute inset-0 opacity-40" />
      </div>

      {/* CSS-animated (no JS dependency) so this above-the-fold banner is never blank on load */}
      <div className="container-x text-center">
        {subtitle ? (
          <p
            className="animate-fade-up font-script text-3xl text-brand-light"
            style={{ animationDelay: "0.05s" }}
          >
            {subtitle}
          </p>
        ) : null}
        <h1
          className="animate-fade-up mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        <nav
          className="animate-fade-up mt-5 flex items-center justify-center gap-2 text-sm text-white/50"
          style={{ animationDelay: "0.25s" }}
        >
          <Link href="/" className="transition-colors hover:text-brand-light">
            Home
          </Link>
          <FiChevronRight className="size-4" />
          <span className="text-brand-light">{crumb ?? title}</span>
        </nav>
      </div>
    </section>
  );
}
