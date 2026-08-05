import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import ReviewForm from "@/components/site/ReviewForm";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { list } from "@/lib/db";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { ImQuotesLeft } from "react-icons/im";

export const metadata = pageMeta({
  title: "Guest Reviews",
  description:
    "Read what guests say about PlateCraft — real reviews of the food, the service and the room, and leave your own after your visit.",
  path: "/reviews",
  image: IMG.interiors[2],
});

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className={`size-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-ink/20"}`}
        />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  // Only moderated reviews are published — the same flag the admin panel toggles.
  const reviews = list("reviews").filter((r) => r.approved);

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Reviews", path: "/reviews" }])} />

      <PageBanner
        title="Guest Reviews"
        subtitle="Honest Words"
        crumb="Reviews"
        image={IMG.interiors[2]}
      />

      {/* ---------- Rating summary ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="grid items-center gap-10 rounded-3xl border border-ink/8 bg-white p-8 sm:p-10 lg:grid-cols-[240px_1fr]">
            <div className="text-center lg:border-r lg:border-ink/8">
              <p className="text-6xl font-extrabold leading-none text-ink">
                {average.toFixed(1)}
              </p>
              <Stars rating={average} className="mt-3 justify-center" />
              <p className="mt-2 text-sm text-muted">
                {total} verified {total === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="space-y-2.5">
              {breakdown.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs font-semibold text-ink/70">{star} star</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-cream-2">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-xs text-muted">{count}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The wall ---------- */}
      <section className="bg-cream-2 py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">In Their Words</span>
            <h2 className="section-title mt-3 text-ink">What Our Guests Say</h2>
          </Reveal>

          {total === 0 ? (
            <p className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center text-sm text-muted">
              No reviews published yet — yours could be the first.
            </p>
          ) : (
            <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <StaggerItem key={review.id}>
                  <article className="card-hover flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-7">
                    <ImQuotesLeft className="size-7 text-brand/25" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
                      &ldquo;{review.message}&rdquo;
                    </p>
                    <Stars rating={review.rating} className="mt-5" />
                    <div className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-5">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                        <SmartImage
                          src={review.avatar}
                          alt={review.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink">{review.name}</p>
                        <p className="text-[12px] text-muted">
                          {review.role} · {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* ---------- Leave a review ---------- */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">Your Turn</span>
            <h2 className="section-title mt-3 text-ink">Been In Recently?</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Reviews are the most useful thing a guest can leave behind — they tell the kitchen what
              landed, and they help the next person decide where to eat. It takes a minute.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Something went wrong instead?{" "}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Tell us directly
              </Link>{" "}
              and we will put it right.
            </p>
          </Reveal>

          <Reveal direction="left" className="rounded-3xl border border-ink/8 bg-white p-8">
            <ReviewForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
