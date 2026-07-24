import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import { list } from "@/lib/db";

export default function LatestNews() {
  const posts = list("posts").filter((p) => p.published).slice(0, 4);
  const [feature, ...rest] = posts;
  if (!feature) return null;

  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <Reveal direction="right">
          <span className="eyebrow">News &amp; Blog</span>
          <h2 className="section-title mt-3 max-w-sm text-ink">Latest News &amp; Updates</h2>

          <ul className="mt-8 space-y-4">
            {rest.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-4 rounded-2xl border border-ink/8 bg-white p-3 transition-all hover:shadow-[var(--shadow-card)]">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <SmartImage src={post.cover} alt={post.title} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-brand">{post.category}</p>
                    <p className="truncate text-sm font-bold text-ink">{post.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                      <FiCalendar className="size-3" /> {formatDate(post.date)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <Link href={`/blog/${feature.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/8 bg-white">
            <div className="relative aspect-16/10 overflow-hidden">
              <SmartImage src={feature.cover} alt={feature.title} fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
                {feature.category}
              </span>
            </div>
            <div className="p-6">
              <p className="flex items-center gap-1.5 text-[12px] text-muted">
                <FiCalendar className="size-3.5" /> {formatDate(feature.date)} · By {feature.author}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-ink transition-colors group-hover:text-brand">
                {feature.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{feature.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Read More <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
