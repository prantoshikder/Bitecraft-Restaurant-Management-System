import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import PageBanner from "@/components/site/PageBanner";
import SmartImage from "@/components/ui/SmartImage";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = list("posts").filter((p) => p.published);

  return (
    <>
      <PageBanner title="News & Blog" subtitle="Latest Stories" crumb="Blog" image={IMG.blog[0]} />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <SmartImage src={post.cover} alt={post.title} fill sizes="(max-width:768px) 90vw, 360px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-4 text-[11px] text-muted">
                      <span className="inline-flex items-center gap-1"><FiCalendar className="size-3" /> {formatDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1"><FiUser className="size-3" /> {post.author}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-ink transition-colors group-hover:text-brand">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Read More <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
