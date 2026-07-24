import type { IconType } from "react-icons";
import {
  FiGrid, FiShoppingBag, FiCalendar, FiCoffee, FiLayers, FiGrid as FiTables,
  FiUsers, FiUserCheck, FiStar, FiBox, FiTruck, FiTag, FiFileText, FiImage,
  FiMessageSquare, FiMail, FiSettings, FiAward,
} from "react-icons/fi";
import type { Role } from "@/lib/auth";
import { MENUS, menusForRole, type MenuMeta } from "@/lib/rbac";

export type NavItem = MenuMeta & { icon: IconType };

const ICONS: Record<string, IconType> = {
  dashboard: FiGrid,
  orders: FiShoppingBag,
  reservations: FiCalendar,
  tables: FiTables,
  dishes: FiCoffee,
  categories: FiLayers,
  offers: FiTag,
  customers: FiUsers,
  staff: FiUserCheck,
  chefs: FiAward,
  inventory: FiBox,
  suppliers: FiTruck,
  posts: FiFileText,
  gallery: FiImage,
  events: FiCalendar,
  reviews: FiStar,
  messages: FiMessageSquare,
  subscribers: FiMail,
  settings: FiSettings,
};

const withIcon = (m: MenuMeta): NavItem => ({ ...m, icon: ICONS[m.key] ?? FiGrid });

export const NAV: NavItem[] = MENUS.map(withIcon);

/** Menu items a given role is allowed to see, with their icons attached. */
export function navForRole(role: Role): NavItem[] {
  return menusForRole(role).map(withIcon);
}

export const NAV_GROUPS = Array.from(new Set(NAV.map((n) => n.group)));
