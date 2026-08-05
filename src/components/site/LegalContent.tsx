import Reveal from "@/components/ui/Reveal";
import type { LegalSection } from "@/temp/legal";
import { LAST_UPDATED } from "@/temp/legal";

/**
 * Shared body for the Privacy Policy and Terms pages: a sticky contents list
 * beside the prose. Both pages are mostly read by people looking for one
 * specific clause, so jumping straight to it matters more than the design.
 */
export default function LegalContent({
  intro,
  sections,
}: {
  intro: string;
  sections: LegalSection[];
}) {
  const anchor = (heading: string) =>
    heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-ink">On this page</p>
          <ul className="mt-4 space-y-2.5 border-l border-ink/10 pl-4">
            {sections.map((section) => (
              <li key={section.heading}>
                <a
                  href={`#${anchor(section.heading)}`}
                  className="text-[13px] text-muted transition-colors hover:text-brand"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="rounded-2xl border border-ink/8 bg-white p-6 text-sm leading-relaxed text-muted">
            {intro}
            <span className="mt-3 block text-[13px] text-ink/50">
              Last updated: {LAST_UPDATED}
            </span>
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <Reveal key={section.heading}>
                <article id={anchor(section.heading)} className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-ink">{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
