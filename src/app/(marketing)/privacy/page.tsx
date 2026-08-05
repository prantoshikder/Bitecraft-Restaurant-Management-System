import LegalContent from "@/components/marketing/LegalContent";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/site/PageBanner";
import { IMG } from "@/lib/images";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { PRIVACY_SECTIONS } from "@/temp/marketing/legal";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How PlateCraft collects, uses and protects your personal information when you book a table, order online or subscribe to our newsletter.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])}
      />

      <PageBanner
        title="Privacy Policy"
        subtitle="Your Data"
        crumb="Privacy"
        image={IMG.interiors[3]}
      />

      <LegalContent
        intro="This policy explains what we collect when you use this website, why we collect it, who we share it with and what you can ask us to do with it. We keep it in plain English on purpose."
        sections={PRIVACY_SECTIONS}
      />
    </>
  );
}
