"use client";

import { api, type DashboardStats } from "@/lib/api";
import { money, timeAgo } from "@/lib/utils";
import { App, Card, Empty, Segmented, Skeleton, Table, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiGrid,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { AreaChart, BarList, Donut } from "./Charts";
import PageHeader from "./PageHeader";
import StatCard from "./StatCard";
import { MoneyCell, StatusTag } from "./cells";

const DONUT_COLORS = [
  "#8cb33f",
  "#6d8f2e",
  "#a9cb62",
  "#c7dd8f",
  "#4c6a1f",
  "#dfeabf",
];

export default function DashboardClient() {
  const { message } = App.useApp();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");

  useEffect(() => {
    api
      .stats()
      .then((r) => setStats(r.data))
      .catch(() => null);
  }, []);

  // Show a notice when the user was redirected here for lacking access.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("denied") === "1") {
      message.warning("You don't have permission to access that page.");
      window.history.replaceState({}, "", "/admin");
    }
  }, [message]);

  if (!stats) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          subtitle="Welcome back, here's what's happening today."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, here's what's happening at PlateCraft today."
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          icon={FiDollarSign}
          tint="brand"
          label="Revenue (7 days)"
          value={money(stats.revenue.value)}
          change={stats.revenue.change}
        />
        <StatCard
          index={1}
          icon={FiShoppingBag}
          tint="blue"
          label="Orders (7 days)"
          value={stats.orders.value}
          change={stats.orders.change}
        />
        <StatCard
          index={2}
          icon={FiUsers}
          tint="violet"
          label="Total Customers"
          value={stats.customers.value}
          change={stats.customers.change}
        />
        <StatCard
          index={3}
          icon={FiCalendar}
          tint="amber"
          label="Active Reservations"
          value={stats.reservations.value}
          change={stats.reservations.change}
        />
      </div>

      {/* Alerts row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat
          icon={FiClock}
          label="Pending Orders"
          value={stats.pendingOrders}
          href="/admin/orders"
          tone="amber"
        />
        <MiniStat
          icon={FiShoppingBag}
          label="In Kitchen"
          value={stats.preparing}
          href="/admin/orders"
          tone="blue"
        />
        <MiniStat
          icon={FiGrid}
          label="Tables Occupied"
          value={`${stats.tablesOccupied}/${stats.tablesTotal}`}
          href="/admin/tables"
          tone="brand"
        />
        <MiniStat
          icon={FiAlertTriangle}
          label="Low Stock Items"
          value={stats.lowStock}
          href="/admin/inventory"
          tone="rose"
        />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title={<span className="font-bold">Sales Overview</span>}
          extra={
            <Segmented
              size="small"
              options={[
                { label: "Revenue", value: "revenue" },
                { label: "Orders", value: "orders" },
              ]}
              value={metric}
              onChange={(v) => setMetric(v as "revenue" | "orders")}
            />
          }
        >
          <AreaChart
            data={stats.series}
            valueKey={metric}
            prefix={metric === "revenue" ? "$" : ""}
          />
        </Card>

        <Card title={<span className="font-bold">Sales by Category</span>}>
          <Donut
            data={stats.byCategory
              .filter((c) => c.value > 0)
              .map((c, i) => ({
                label: c.label,
                value: c.value,
                color: DONUT_COLORS[i % DONUT_COLORS.length],
              }))}
          />
        </Card>
      </div>

      {/* Bottom row */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title={<span className="font-bold">Recent Orders</span>}
          extra={
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              View all <FiArrowRight className="size-3.5" />
            </Link>
          }
          styles={{ body: { padding: 0 } }}
        >
          <Table
            rowKey="id"
            size="middle"
            pagination={false}
            dataSource={stats.recentOrders}
            columns={[
              {
                title: "Order",
                dataIndex: "code",
                render: (v) => (
                  <span className="font-semibold text-ink">{v}</span>
                ),
              },
              {
                title: "Customer",
                dataIndex: "customerName",
                render: (v) => <span className="text-ink/70">{v}</span>,
              },
              {
                title: "Type",
                dataIndex: "type",
                render: (v) => (
                  <Tag className="m-0! capitalize">
                    {String(v).replace("-", " ")}
                  </Tag>
                ),
              },
              {
                title: "Total",
                dataIndex: "total",
                align: "right",
                render: (v) => <MoneyCell value={v} />,
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (v) => <StatusTag value={v} />,
              },
              {
                title: "Placed",
                dataIndex: "createdAt",
                responsive: ["lg"],
                render: (v) => (
                  <span className="text-xs text-muted">{timeAgo(v)}</span>
                ),
              },
            ]}
          />
        </Card>

        <Card title={<span className="font-bold">Top Selling Dishes</span>}>
          {stats.topDishes.length ? (
            <div className="space-y-4">
              <BarList
                data={stats.topDishes
                  .slice(0, 5)
                  .map((d) => ({ label: d.name, value: d.qty }))}
                prefix=""
              />
              <div className="border-t border-ink/8 pt-3 text-[13px] text-muted">
                Top dish generated{" "}
                <span className="font-bold text-ink">
                  {money(stats.topDishes[0]?.revenue ?? 0)}
                </span>{" "}
                in sales.
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </Card>
      </div>

      {/* Reservations */}
      <Card
        className="mt-4"
        title={<span className="font-bold">Upcoming Reservations</span>}
        extra={
          <Link
            href="/admin/reservations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
          >
            View all <FiArrowRight className="size-3.5" />
          </Link>
        }
        styles={{ body: { padding: 0 } }}
      >
        <Table
          rowKey="id"
          size="middle"
          pagination={false}
          dataSource={stats.recentReservations}
          columns={[
            {
              title: "Guest",
              dataIndex: "name",
              render: (v) => (
                <span className="font-semibold text-ink">{v}</span>
              ),
            },
            { title: "Date", dataIndex: "date" },
            { title: "Time", dataIndex: "time" },
            { title: "Guests", dataIndex: "guests", align: "center" },
            {
              title: "Status",
              dataIndex: "status",
              render: (v) => <StatusTag value={v} />,
            },
          ]}
        />
      </Card>
    </>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  href,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  href: string;
  tone: "brand" | "blue" | "amber" | "rose";
}) {
  const tones = {
    brand: "text-brand-dark bg-brand-soft",
    blue: "text-blue-600 bg-blue-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
  };
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-4 transition-colors hover:border-brand"
    >
      <span
        className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-lg font-extrabold text-ink">{value}</p>
        <p className="text-[12px] text-muted">{label}</p>
      </div>
    </Link>
  );
}
