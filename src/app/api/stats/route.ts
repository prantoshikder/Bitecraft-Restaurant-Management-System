import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  const now = Date.now();
  const day = 86400000;

  const revenueOf = (orders: typeof db.orders) =>
    Math.round(orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0) * 100) / 100;

  const inWindow = (from: number, to: number) =>
    db.orders.filter((o) => {
      const t = new Date(o.createdAt).getTime();
      return t >= now - from * day && t < now - to * day;
    });

  const last7 = inWindow(7, 0);
  const prev7 = inWindow(14, 7);

  const pct = (curr: number, prev: number) =>
    prev === 0 ? 100 : Math.round(((curr - prev) / prev) * 1000) / 10;

  // 7-day revenue series for the dashboard chart
  const series = Array.from({ length: 7 }, (_, i) => {
    const offset = 6 - i;
    const dayOrders = db.orders.filter((o) => {
      const t = new Date(o.createdAt).getTime();
      return t >= now - (offset + 1) * day && t < now - offset * day;
    });
    return {
      label: new Date(now - offset * day).toLocaleDateString("en-US", { weekday: "short" }),
      revenue: revenueOf(dayOrders),
      orders: dayOrders.length,
    };
  });

  const byCategory = db.categories.map((c) => {
    const dishIds = new Set(db.dishes.filter((d) => d.categoryId === c.id).map((d) => d.id));
    const value = db.orders.reduce(
      (s, o) => s + o.items.filter((it) => dishIds.has(it.dishId)).reduce((x, it) => x + it.price * it.qty, 0),
      0,
    );
    return { label: c.name, value: Math.round(value * 100) / 100 };
  });

  const dishSales = new Map<string, { name: string; qty: number; revenue: number }>();
  for (const order of db.orders) {
    for (const item of order.items) {
      const row = dishSales.get(item.dishId) ?? { name: item.name, qty: 0, revenue: 0 };
      row.qty += item.qty;
      row.revenue += item.price * item.qty;
      dishSales.set(item.dishId, row);
    }
  }
  const topDishes = [...dishSales.entries()]
    .map(([id, v]) => ({ id, ...v, revenue: Math.round(v.revenue * 100) / 100 }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 6);

  return NextResponse.json({
    data: {
      revenue: { value: revenueOf(last7), change: pct(revenueOf(last7), revenueOf(prev7)) },
      orders: { value: last7.length, change: pct(last7.length, prev7.length) },
      customers: { value: db.customers.length, change: 12.4 },
      reservations: {
        value: db.reservations.filter((r) => r.status === "confirmed" || r.status === "pending").length,
        change: 8.1,
      },
      pendingOrders: db.orders.filter((o) => o.status === "pending").length,
      preparing: db.orders.filter((o) => o.status === "preparing").length,
      tablesOccupied: db.tables.filter((t) => t.status === "occupied").length,
      tablesTotal: db.tables.length,
      lowStock: db.inventory.filter((i) => i.quantity <= i.threshold).length,
      unreadMessages: db.messages.filter((m) => !m.read).length,
      series,
      byCategory,
      topDishes,
      recentOrders: [...db.orders].slice(0, 8),
      recentReservations: [...db.reservations].slice(0, 6),
    },
  });
}
