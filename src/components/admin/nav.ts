import type { IconType } from "react-icons";
import {
  FiGrid, FiShoppingBag, FiCalendar, FiCoffee, FiLayers, FiGrid as FiTables,
  FiUsers, FiUserCheck, FiStar, FiBox, FiTruck, FiTag, FiFileText, FiImage,
  FiMessageSquare, FiMail, FiSettings, FiAward,
} from "react-icons/fi";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: IconType;
  group: string;
};

export const NAV: NavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin", icon: FiGrid, group: "Overview" },

  { key: "orders", label: "Orders", href: "/admin/orders", icon: FiShoppingBag, group: "Operations" },
  { key: "reservations", label: "Reservations", href: "/admin/reservations", icon: FiCalendar, group: "Operations" },
  { key: "tables", label: "Tables", href: "/admin/tables", icon: FiTables, group: "Operations" },

  { key: "dishes", label: "Menu Items", href: "/admin/dishes", icon: FiCoffee, group: "Catalog" },
  { key: "categories", label: "Categories", href: "/admin/categories", icon: FiLayers, group: "Catalog" },
  { key: "offers", label: "Offers", href: "/admin/offers", icon: FiTag, group: "Catalog" },

  { key: "customers", label: "Customers", href: "/admin/customers", icon: FiUsers, group: "People" },
  { key: "staff", label: "Staff", href: "/admin/staff", icon: FiUserCheck, group: "People" },
  { key: "chefs", label: "Chefs", href: "/admin/chefs", icon: FiAward, group: "People" },

  { key: "inventory", label: "Inventory", href: "/admin/inventory", icon: FiBox, group: "Inventory" },
  { key: "suppliers", label: "Suppliers", href: "/admin/suppliers", icon: FiTruck, group: "Inventory" },

  { key: "posts", label: "Blog Posts", href: "/admin/posts", icon: FiFileText, group: "Content" },
  { key: "gallery", label: "Gallery", href: "/admin/gallery", icon: FiImage, group: "Content" },
  { key: "events", label: "Events", href: "/admin/events", icon: FiCalendar, group: "Content" },
  { key: "reviews", label: "Reviews", href: "/admin/reviews", icon: FiStar, group: "Content" },

  { key: "messages", label: "Messages", href: "/admin/messages", icon: FiMessageSquare, group: "Communication" },
  { key: "subscribers", label: "Subscribers", href: "/admin/subscribers", icon: FiMail, group: "Communication" },

  { key: "settings", label: "Settings", href: "/admin/settings", icon: FiSettings, group: "System" },
];

export const NAV_GROUPS = Array.from(new Set(NAV.map((n) => n.group)));
