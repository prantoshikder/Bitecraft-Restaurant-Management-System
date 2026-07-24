"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table, Input, Segmented, Select, Tag, Button, App, Popconfirm, Drawer, Descriptions, Steps, Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiSearch, FiEye, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { StatusTag, MoneyCell } from "../cells";
import { api } from "@/lib/api";
import { money, formatDateTime, timeAgo } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const FLOW: OrderStatus[] = ["pending", "preparing", "ready", "served", "completed"];
const STATUS_OPTIONS: OrderStatus[] = ["pending", "preparing", "ready", "served", "completed", "cancelled"];

export default function OrdersManager({ initialData }: { initialData: Order[] }) {
  const { message } = App.useApp();
  const [data, setData] = useState<Order[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [active, setActive] = useState<Order | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const res = await api.list("orders");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    let rows = data;
    if (status !== "All") rows = rows.filter((o) => o.status === status);
    if (type !== "All") rows = rows.filter((o) => o.type === type);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((o) => o.code.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.phone.includes(q));
    }
    return rows;
  }, [data, status, type, query]);

  async function setOrderStatus(order: Order, next: OrderStatus) {
    const paid = next === "completed" || next === "served" ? true : order.paid;
    const res = await api.update("orders", order.id, { status: next, paid });
    setData((prev) => prev.map((o) => (o.id === order.id ? res.data : o)));
    if (active?.id === order.id) setActive(res.data);
    message.success(`Order ${order.code} → ${next}`);
  }

  async function togglePaid(order: Order, paid: boolean) {
    const res = await api.update("orders", order.id, { paid });
    setData((prev) => prev.map((o) => (o.id === order.id ? res.data : o)));
    if (active?.id === order.id) setActive(res.data);
  }

  async function remove(order: Order) {
    await api.remove("orders", order.id);
    setData((prev) => prev.filter((o) => o.id !== order.id));
    message.success("Order deleted");
  }

  const columns: ColumnsType<Order> = [
    { title: "Order", dataIndex: "code", render: (v) => <span className="font-bold text-ink">{v}</span> },
    { title: "Customer", dataIndex: "customerName", render: (v, r) => (
      <div><p className="font-semibold text-ink">{v}</p><p className="text-[11px] text-muted">{r.phone}</p></div>
    ) },
    { title: "Type", dataIndex: "type", render: (v) => <Tag className="!m-0 capitalize">{String(v).replace("-", " ")}</Tag> },
    { title: "Items", dataIndex: "items", align: "center", render: (v: Order["items"]) => v.reduce((s, i) => s + i.qty, 0) },
    { title: "Total", dataIndex: "total", align: "right", sorter: (a, b) => a.total - b.total, render: (v) => <MoneyCell value={v} /> },
    { title: "Payment", dataIndex: "paid", render: (v, r) => (
      <div className="flex items-center gap-1.5"><Tag className="!m-0 capitalize" color="default">{r.paymentMethod}</Tag><Tag className="!m-0" color={v ? "green" : "red"}>{v ? "Paid" : "Unpaid"}</Tag></div>
    ) },
    { title: "Status", dataIndex: "status", render: (v, r) => (
      <Select
        size="small"
        value={v}
        style={{ width: 130 }}
        onClick={(e) => e.stopPropagation()}
        onChange={(next) => setOrderStatus(r, next)}
        options={STATUS_OPTIONS.map((s) => ({ value: s, label: <StatusTag value={s} /> }))}
      />
    ) },
    { title: "Placed", dataIndex: "createdAt", responsive: ["xl"], render: (v) => <span className="text-xs text-muted">{timeAgo(v)}</span> },
    { title: "Actions", key: "actions", fixed: "right", width: 100, render: (_, r) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button type="text" size="small" icon={<FiEye />} onClick={() => setActive(r)} />
        <Popconfirm title="Delete this order?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => remove(r)}>
          <Button type="text" size="small" danger icon={<FiTrash2 />} />
        </Popconfirm>
      </div>
    ) },
  ];

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Input allowClear prefix={<FiSearch className="text-muted" />} placeholder="Search order, name, phone..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 260 }} />
          <Select value={type} onChange={setType} style={{ width: 130 }} options={["All", "dine-in", "takeaway", "delivery"].map((t) => ({ value: t, label: t === "All" ? "All Types" : t.replace("-", " ") }))} />
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<FiRefreshCw />} onClick={refresh}>Refresh</Button>
        </div>
      </div>

      <Segmented
        className="mb-4"
        options={["All", ...STATUS_OPTIONS]}
        value={status}
        onChange={(v) => setStatus(v as string)}
      />

      <Table<Order>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filtered}
        size="middle"
        scroll={{ x: "max-content" }}
        onRow={(r) => ({ onClick: () => setActive(r), style: { cursor: "pointer" } })}
        pagination={{ pageSize: 8, showTotal: (t) => `${t} orders` }}
      />

      <Drawer
        title={active ? `Order ${active.code}` : "Order"}
        open={!!active}
        onClose={() => setActive(null)}
        width={460}
      >
        {active ? (
          <div className="space-y-6">
            <Steps
              direction="vertical"
              size="small"
              current={active.status === "cancelled" ? 0 : FLOW.indexOf(active.status)}
              status={active.status === "cancelled" ? "error" : "process"}
              items={(active.status === "cancelled" ? ["Cancelled"] : FLOW).map((s) => ({ title: <span className="capitalize">{s}</span> }))}
            />

            <Descriptions column={1} size="small" bordered
              items={[
                { label: "Customer", children: active.customerName },
                { label: "Phone", children: active.phone },
                { label: "Type", children: <span className="capitalize">{active.type.replace("-", " ")}</span> },
                ...(active.address ? [{ label: "Address", children: active.address }] : []),
                { label: "Placed", children: formatDateTime(active.createdAt) },
                ...(active.note ? [{ label: "Note", children: active.note }] : []),
              ]}
            />

            <div>
              <p className="mb-2 text-sm font-bold text-ink">Items</p>
              <div className="divide-y divide-ink/8 rounded-xl border border-ink/8">
                {active.items.map((it) => (
                  <div key={it.dishId} className="flex items-center justify-between px-3 py-2.5 text-sm">
                    <span className="text-ink">{it.qty}× {it.name}</span>
                    <span className="font-semibold text-ink">{money(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              <dl className="mt-3 space-y-1.5 text-sm">
                <Row label="Subtotal" value={money(active.subtotal)} />
                <Row label="Tax" value={money(active.tax)} />
                {active.discount ? <Row label="Discount" value={`- ${money(active.discount)}`} /> : null}
                <div className="flex justify-between border-t border-ink/8 pt-2 text-base font-extrabold text-ink">
                  <span>Total</span><span className="text-brand">{money(active.total)}</span>
                </div>
              </dl>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-cream-2 px-4 py-3">
              <span className="text-sm font-semibold text-ink">Payment received</span>
              <Switch checked={active.paid} onChange={(v) => togglePaid(active, v)} />
            </div>

            {active.status !== "cancelled" && active.status !== "completed" ? (
              <div className="flex gap-2">
                {FLOW.indexOf(active.status) < FLOW.length - 1 ? (
                  <Button type="primary" block onClick={() => setOrderStatus(active, FLOW[FLOW.indexOf(active.status) + 1])}>
                    Advance to {FLOW[FLOW.indexOf(active.status) + 1]}
                  </Button>
                ) : null}
                <Button danger onClick={() => setOrderStatus(active, "cancelled")}>Cancel</Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
