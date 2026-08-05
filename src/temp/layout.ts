import type { IconType } from "react-icons";
import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

/**
 * Static content for the site chrome (Header + Footer) — shown on every public
 * page, so it lives here rather than under a single page's file.
 */

export type NavLink = { label: string; href: string };
export type InfoItem = { icon: IconType; label: string; value: string };
export type SocialLink = { icon: IconType; href: string; label: string };

/** Header — primary navigation. Ordered by commercial value, not by sitemap depth. */
export const NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Header — utility bar above the navigation (collapses on scroll). */
export const TOPBAR: InfoItem[] = [
  { icon: FiPhone, label: "Call for Delivery", value: "(+123) 456 7890" },
  { icon: FiClock, label: "Open Time", value: "Mon - Sun · 10AM - 11PM" },
  { icon: FiMapPin, label: "Location", value: "Melbourne, Australia" },
];

/** Footer — quick links, first column. */
export const QUICK_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

/**
 * Footer — second links column. These are the conversion pages: they get no
 * room in the header, so the footer is what makes them crawlable from every
 * page and gives them internal links to rank on.
 */
export const MORE_LINKS: NavLink[] = [
  { label: "Special Offers", href: "/offers" },
  { label: "Book a Table", href: "/reservation" },
  { label: "Catering & Events", href: "/catering" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

/** Footer — social icons. */
export const SOCIALS: SocialLink[] = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
];
