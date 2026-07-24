import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

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
    <section className="relative isolate flex min-h-[360px] items-center overflow-hidden bg-ink pt-32 pb-16 lg:min-h-[420px] lg:pt-40">
      <div className="absolute inset-0 -z-10">
        <SmartImage src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        <div className="noise absolute inset-0 opacity-40" />
      </div>

      <div className="container-x text-center">
        <Reveal>
          {subtitle ? <p className="font-script text-3xl text-brand-light">{subtitle}</p> : null}
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
          <nav className="mt-5 flex items-center justify-center gap-2 text-sm text-white/50">
            <Link href="/" className="transition-colors hover:text-brand-light">Home</Link>
            <FiChevronRight className="size-4" />
            <span className="text-brand-light">{crumb ?? title}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
