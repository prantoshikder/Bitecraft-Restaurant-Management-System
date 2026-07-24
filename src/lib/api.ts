import type { DB, Resource } from "./types";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  list: <K extends Resource>(resource: K, params?: Record<string, string | number>) => {
    const qs = params
      ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
      : "";
    return fetch(`/api/${resource}${qs}`, { cache: "no-store" }).then((r) => json<{ data: DB[K]; total: number }>(r));
  },

  create: <K extends Resource>(resource: K, payload: Record<string, unknown>) =>
    fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => json<{ data: DB[K][number] }>(r)),

  update: <K extends Resource>(resource: K, id: string, payload: Record<string, unknown>) =>
    fetch(`/api/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => json<{ data: DB[K][number] }>(r)),

  remove: (resource: Resource, id: string) =>
    fetch(`/api/${resource}/${id}`, { method: "DELETE" }).then((r) => json<{ ok: boolean }>(r)),

  stats: () => fetch(`/api/stats`, { cache: "no-store" }).then((r) => json<{ data: DashboardStats }>(r)),
};

export type DashboardStats = {
  revenue: { value: number; change: number };
  orders: { value: number; change: number };
  customers: { value: number; change: number };
  reservations: { value: number; change: number };
  pendingOrders: number;
  preparing: number;
  tablesOccupied: number;
  tablesTotal: number;
  lowStock: number;
  unreadMessages: number;
  series: Array<{ label: string; revenue: number; orders: number }>;
  byCategory: Array<{ label: string; value: number }>;
  topDishes: Array<{ id: string; name: string; qty: number; revenue: number }>;
  recentOrders: DB["orders"];
  recentReservations: DB["reservations"];
};
