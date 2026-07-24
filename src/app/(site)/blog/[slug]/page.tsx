import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiUser, FiArrowLeft, FiTag } from "react-icons/fi";
import PageBanner from "@/components/site/PageBanner";
import SmartImage from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/utils";
import { list } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = list("posts").find((p) => p.slug === slug);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = list("posts").find((p) => p.slug === slug && p.published);
  if (!post) notFound();

  const related = list("posts").filter((p) => p.published && p.id !== post.id).slice(0, 3);

  return (
    <>
      <PageBanner title={post.title} subtitle={post.category} crumb="Blog" image={post.cover} />

      <article className="bg-cream py-16 lg:py-20">
        <div className="container-x max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <FiArrowLeft className="size-4" /> Back to Blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5"><FiCalendar className="size-4 text-brand" /> {formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><FiUser className="size-4 text-brand" /> {post.author}</span>
            <span className="inline-flex items-center gap-1.5"><FiTag className="size-4 text-brand" /> {post.category}</span>
          </div>

          <div className="relative my-8 aspect-16/9 overflow-hidden rounded-3xl">
            <SmartImage src={post.cover} alt={post.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-ink/75">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-cream-2 py-16">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-extrabold text-ink">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-ink/8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]">
                <div className="relative aspect-16/10 overflow-hidden">
                  <SmartImage src={r.cover} alt={r.title} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-brand">{r.category}</p>
                  <h3 className="mt-1 text-sm font-bold text-ink group-hover:text-brand">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
