/**
 * Renders schema.org structured data. Pass one object or an array of them —
 * builders live in `src/lib/seo.ts`.
 *
 * Server component on purpose: the script must be in the initial HTML, because
 * crawlers that don't execute JavaScript still need to read it.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is escaped for `<` so a stray "</script>" in
          // admin-entered copy can't break out of the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
