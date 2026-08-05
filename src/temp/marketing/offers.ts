import type { IconType } from "react-icons";
import { FiGift, FiPercent, FiSmartphone, FiUsers } from "react-icons/fi";

/**
 * Static content for the Offers page. The deals themselves are live data —
 * managed in the admin panel under Offers — this file only holds the
 * surrounding copy.
 */

export type Perk = { icon: IconType; title: string; text: string };
export type Step = { title: string; text: string };

/** Reasons to join the mailing list, shown beside the newsletter block. */
export const PERKS: Perk[] = [
  {
    icon: FiPercent,
    title: "Members-only discounts",
    text: "Subscriber-only codes that never appear on the public menu, dropped roughly twice a month.",
  },
  {
    icon: FiGift,
    title: "A treat on your birthday",
    text: "A complimentary dessert and a glass of something sparkling during your birthday week.",
  },
  {
    icon: FiUsers,
    title: "First access to events",
    text: "Tasting nights and chef's table dinners open to the mailing list 48 hours before anyone else.",
  },
  {
    icon: FiSmartphone,
    title: "No spam, ever",
    text: "One email a fortnight at most, and one click to unsubscribe. We never sell your details.",
  },
];

/** How to redeem a promo code — removes the friction that kills conversions. */
export const HOW_TO_REDEEM: Step[] = [
  {
    title: "Copy the code",
    text: "Tap any deal below to copy its code straight to your clipboard.",
  },
  {
    title: "Add your dishes",
    text: "Build your order from the menu, or mention the code when you book a table.",
  },
  {
    title: "Paste it at checkout",
    text: "Enter the code in the promo field before you pay and the discount applies instantly.",
  },
];

/** Small print — every campaign inherits these unless the deal says otherwise. */
export const OFFER_TERMS: string[] = [
  "One promo code per order or per table. Codes cannot be combined with each other.",
  "Discounts apply to food and non-alcoholic drinks unless the deal states otherwise.",
  "Offers are valid only between the dates shown on the deal and while stocks last.",
  "Codes have no cash value and cannot be exchanged for a gift card or refund.",
  "We may withdraw or change an offer at any time; orders already placed are unaffected.",
];
