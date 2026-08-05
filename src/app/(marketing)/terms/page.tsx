import LegalContent from "@/components/marketing/LegalContent";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { TERMS_SECTIONS } from "@/temp/marketing/legal";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "The terms that apply when you book a table, order online, use a promo code or buy a gift card at PlateCraft.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />

      <PageBanner
        title="Terms & Conditions"
        subtitle="The Fine Print"
        crumb="Terms"
        image={IMG.interiors[5]}
      />

      <LegalContent
        intro="These terms cover reservations, online orders, promotional codes, gift cards and events. They sit alongside your rights under consumer law, which nothing here takes away."
        sections={TERMS_SECTIONS}
      />
    </>
  );
}
