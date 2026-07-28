import type { IconType } from "react-icons";
import { TbAward, TbMoodSmile, TbToolsKitchen2, TbUsers } from "react-icons/tb";

/** Static content for the About page. */

export type StatItem = { icon: IconType; value: string; label: string };

/** The four counters shown directly under the page banner. */
export const STATS: StatItem[] = [
  { icon: TbToolsKitchen2, value: "45+", label: "Signature Dishes" },
  { icon: TbUsers, value: "12.4K", label: "Happy Customers" },
  { icon: TbAward, value: "18", label: "Awards Won" },
  { icon: TbMoodSmile, value: "98%", label: "Satisfaction Rate" },
];
