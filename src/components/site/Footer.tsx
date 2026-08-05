import Link from "next/link";
import { MORE_LINKS, QUICK_LINKS, SOCIALS } from "@/temp/layout";
import NewsletterForm from "./NewsletterForm";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            Every dish tells a story. Come and taste the difference that fresh ingredients and real
            craft make.
          </p>
          <div className="flex gap-2.5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-9 place-items-center rounded-full bg-white/8 text-white/70 transition-all hover:-translate-y-1 hover:bg-brand hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 transition-colors hover:text-brand-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {MORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 transition-colors hover:text-brand-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-sm font-bold uppercase tracking-wider">Opening Hours</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-white/85">Monday - Friday</p>
              <p className="text-white/45">10:00 AM - 11:00 PM</p>
            </div>
            <div>
              <p className="text-white/85">Saturday - Sunday</p>
              <p className="text-white/45">09:00 AM - 12:00 AM</p>
            </div>
            <div>
              <p className="text-white/85">Kitchen closes</p>
              <p className="text-white/45">30 minutes before close</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-sm font-bold uppercase tracking-wider">Newsletter</h4>
          <p className="mb-4 text-sm leading-relaxed text-white/50">
            Subscribe to get special offers, seasonal menus and event invitations.
          </p>
          <NewsletterForm tone="dark" source="footer" />
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} PlateCraft Restaurant. All rights reserved. Designed &amp;
            built by{" "}
            <a
              href="https://github.com/prantoshikder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/60 transition-colors hover:text-brand-light"
            >
              Pranto Shikder
            </a>
            .
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-brand-light">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-brand-light">Terms &amp; Conditions</Link>
            <Link href="/admin" className="transition-colors hover:text-brand-light">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
