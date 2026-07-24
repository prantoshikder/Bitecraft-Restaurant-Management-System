import type { Role } from "./auth";

/**
 * Single source of truth for admin navigation + role-based access control.
 * Pure data only (no React/icons) so it can be imported from middleware
 * (edge runtime) as well as client components.
 *
 * `roles` omitted  → every signed-in role may access it.
 * `roles` provided → only those roles see the menu and may open its pages.
 */
export type MenuMeta = {
  key: string;
  label: string;
  href: string;
  group: string;
  roles?: Role[];
};

const ALL: Role[] = ["admin", "manager", "staff"];
const MANAGER_UP: Role[] = ["admin", "manager"];
const ADMIN_ONLY: Role[] = ["admin"];

export const MENUS: MenuMeta[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin", group: "Overview", roles: ALL },

  { key: "orders", label: "Orders", href: "/admin/orders", group: "Operations", roles: ALL },
  { key: "reservations", label: "Reservations", href: "/admin/reservations", group: "Operations", roles: ALL },
  { key: "tables", label: "Tables", href: "/admin/tables", group: "Operations", roles: ALL },

  { key: "dishes", label: "Menu Items", href: "/admin/dishes", group: "Catalog", roles: ALL },
  { key: "categories", label: "Categories", href: "/admin/categories", group: "Catalog", roles: MANAGER_UP },
  { key: "offers", label: "Offers", href: "/admin/offers", group: "Catalog", roles: MANAGER_UP },

  { key: "customers", label: "Customers", href: "/admin/customers", group: "People", roles: MANAGER_UP },
  { key: "staff", label: "Staff", href: "/admin/staff", group: "People", roles: MANAGER_UP },
  { key: "chefs", label: "Chefs", href: "/admin/chefs", group: "People", roles: MANAGER_UP },

  { key: "inventory", label: "Inventory", href: "/admin/inventory", group: "Inventory", roles: ALL },
  { key: "suppliers", label: "Suppliers", href: "/admin/suppliers", group: "Inventory", roles: MANAGER_UP },

  { key: "posts", label: "Blog Posts", href: "/admin/posts", group: "Content", roles: MANAGER_UP },
  { key: "gallery", label: "Gallery", href: "/admin/gallery", group: "Content", roles: MANAGER_UP },
  { key: "events", label: "Events", href: "/admin/events", group: "Content", roles: MANAGER_UP },
  { key: "reviews", label: "Reviews", href: "/admin/reviews", group: "Content", roles: MANAGER_UP },

  { key: "messages", label: "Messages", href: "/admin/messages", group: "Communication", roles: ALL },
  { key: "subscribers", label: "Subscribers", href: "/admin/subscribers", group: "Communication", roles: MANAGER_UP },

  { key: "settings", label: "Settings", href: "/admin/settings", group: "System", roles: ADMIN_ONLY },
];

export function canAccessMenu(role: Role, menu: MenuMeta): boolean {
  return !menu.roles || menu.roles.includes(role);
}

export function menusForRole(role: Role): MenuMeta[] {
  return MENUS.filter((m) => canAccessMenu(role, m));
}

/** Is the given role allowed to open this admin pathname? Used by middleware. */
export function canAccessPath(role: Role, pathname: string): boolean {
  const match = MENUS.filter((m) =>
    m.href === "/admin" ? pathname === "/admin" : pathname === m.href || pathname.startsWith(`${m.href}/`),
  )
    .sort((a, b) => b.href.length - a.href.length)[0];

  // Unknown admin sub-path → allow (falls back to the layout's auth guard).
  if (!match) return true;
  return canAccessMenu(role, match);
}
