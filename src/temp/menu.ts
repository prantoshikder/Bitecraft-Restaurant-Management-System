import type { IconType } from "react-icons";
import { TbSortAscending, TbSortDescending, TbStar, TbTrendingUp } from "react-icons/tb";

/** Static content for the Menu page. */

export type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

/**
 * Sort choices for the menu explorer. The icon is kept as a component rather
 * than a rendered element so this stays a plain data file.
 */
export const SORT_OPTIONS: Array<{ label: string; value: SortKey; icon: IconType }> = [
  { label: "Most Popular", value: "popular", icon: TbTrendingUp },
  { label: "Top Rated", value: "rating", icon: TbStar },
  { label: "Price: Low to High", value: "price-asc", icon: TbSortAscending },
  { label: "Price: High to Low", value: "price-desc", icon: TbSortDescending },
];

/** The always-present first tab in the category filter row. */
export const ALL_CATEGORY_TAB = { slug: "all", name: "All Menu" };
