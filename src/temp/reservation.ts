import type { IconType } from "react-icons";
import { FiClock, FiPhone, FiUsers } from "react-icons/fi";

/** Static content for the Book A Table page. */

export type PerkItem = { icon: IconType; title: string; text: string };

/** Reasons to book, listed beside the reservation form. */
export const PERKS: PerkItem[] = [
  { icon: FiClock, title: "Flexible Timing", text: "Lunch and dinner slots available every day of the week." },
  { icon: FiUsers, title: "Any Group Size", text: "From an intimate dinner for two to a party of thirty." },
  { icon: FiPhone, title: "Instant Confirmation", text: "Our team calls you back to confirm within minutes." },
];
