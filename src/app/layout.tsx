import Analytics from "@/components/seo/Analytics";
import { SITE } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Dancing_Script, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const script = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative `alternates.canonical` and OG image on child pages
  // resolve to an absolute URL. Set NEXT_PUBLIC_SITE_URL before deploying.
  metadataBase: new URL(SITE.url),
  title: {
    default: "PlateCraft — Delicious Food Made With Love & Passion",
    template: "%s | PlateCraft",
  },
  description:
    "PlateCraft is a premium restaurant experience in Melbourne. Book a table, explore our seasonal menu and taste food crafted with love and passion.",
  applicationName: SITE.name,
  category: "restaurant",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "restaurant",
    "fine dining",
    "melbourne",
    "book a table",
    "food delivery",
    "private dining",
    "catering melbourne",
    "restaurant gift cards",
  ],
  authors: [{ name: "Pranto Shikder", url: "https://github.com/prantoshikder" }],
  creator: "Pranto Shikder",
  publisher: "Pranto Shikder",
  openGraph: {
    title: "PlateCraft — Delicious Food Made With Love & Passion",
    description:
      "Fresh ingredients, expert chefs and a cosy atmosphere come together to create unforgettable moments.",
    type: "website",
    siteName: "PlateCraft",
    url: SITE.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlateCraft — Delicious Food Made With Love & Passion",
    description:
      "Fresh ingredients, expert chefs and a cosy atmosphere come together to create unforgettable moments.",
  },
};

export const viewport: Viewport = {
  themeColor: "#8cb33f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${script.variable}`}>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
