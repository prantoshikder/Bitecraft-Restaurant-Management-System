"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Input, Segmented, Select, Button, App, Popconfirm, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiSearch, FiTrash2, FiRefreshCw, FiUsers } from "react-icons/fi";
import { StatusTag } from "../cells";
import { api } from "@/lib/api";
import { timeAgo } from "@/lib/utils";
import type { Reservation, ReservationStatus } from "@/lib/types";

const STATUSES: ReservationStatus[] = ["pending", "confirmed", "seated", "completed", "cancelled"];

export default function ReservationsManager({
  initialData,
  tables,
}: {
  initialData: Reservation[];
  tables: Array<{ id: string; number: string; capacity: number }>;
}) {
  const { message } = App.useApp();
  const [data, setData] = useState<Reservation[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const tableMap = new Map(tables.map((t) => [t.id, t.number]));

  async function refresh() {
    setLoading(true);
    try { setData((await api.list("reservations")).data); } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    let rows = data;
    if (status !== "All") rows = rows.filter((r) => r.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.email.toLowerCase().includes(q));
    }
    return rows;
  }, [data, status, query]);

  async function patch(row: Reservation, payload: Partial<Reservation>) {
    const res = await api.update("reservations", row.id, payload);
    setData((prev) => prev.map((r) => (r.id === row.id ? res.data : r)));
    message.success("Reservation updated");
  }

  async function remove(row: Reservation) {
    await api.remove("reservations", row.id);
    setData((prev) => prev.filter((r) => r.id !== row.id));
    message.success("Reservation deleted");
  }

  const columns: ColumnsType<Reservation> = [
    { title: "Guest", dataIndex: "name", render: (v, r) => (
      <div><p className="font-semibold text-ink">{v}</p><p className="text-[11px] text-muted">{r.phone}</p></div>
    ) },
    { title: "Date", dataIndex: "date", sorter: (a, b) => a.date.localeCompare(b.date) },
    { title: "Time", dataIndex: "time" },
    { title: "Guests", dataIndex: "guests", align: "center", render: (v) => (
      <span className="inline-flex items-center gap-1 font-semibold"><FiUsers className="size-3.5 text-brand" />{v}</span>
    ) },
    { title: "Table", dataIndex: "tableId", render: (v, r) => (
      <Select
        size="small" value={v ?? undefined} placeholder="Assign" allowClear style={{ width: 110 }}
        onChange={(val) => patch(r, { tableId: val ?? null })}
        options={tables.map((t) => ({ value: t.id, label: `${t.number} (${t.capacity})` }))}
      />
    ) },
    { title: "Status", dataIndex: "status", render: (v, r) => (
      <Select size="small" value={v} style={{ width: 130 }}
        onChange={(next) => patch(r, { status: next })}
        options={STATUSES.map((s) => ({ value: s, label: <StatusTag value={s} /> }))}
      />
    ) },
    { title: "Booked", dataIndex: "createdAt", responsive: ["xl"], render: (v) => <span className="text-xs text-muted">{timeAgo(v)}</span> },
    { title: "", key: "actions", fixed: "right", width: 60, render: (_, r) => (
      <Popconfirm title="Delete reservation?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => remove(r)}>
        <Button type="text" size="small" danger icon={<FiTrash2 />} />
      </Popconfirm>
    ) },
  ];

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input allowClear prefix={<FiSearch className="text-muted" />} placeholder="Search guest, phone, email..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 280 }} />
        <Button icon={<FiRefreshCw />} onClick={refresh}>Refresh</Button>
      </div>
      <Segmented className="mb-4" options={["All", ...STATUSES]} value={status} onChange={(v) => setStatus(v as string)} />
      <Table<Reservation> rowKey="id" loading={loading} columns={columns} dataSource={filtered} size="middle" scroll={{ x: "max-content" }} pagination={{ pageSize: 8, showTotal: (t) => `${t} reservations` }} />
    </div>
  );
}
