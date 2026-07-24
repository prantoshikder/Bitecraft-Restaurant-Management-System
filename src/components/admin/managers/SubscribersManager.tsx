"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Input, Button, App, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiSearch, FiTrash2, FiDownload, FiRefreshCw, FiMail } from "react-icons/fi";
import { DateCell } from "../cells";
import { api } from "@/lib/api";
import type { Subscriber } from "@/lib/types";

export default function SubscribersManager({ initialData }: { initialData: Subscriber[] }) {
  const { message } = App.useApp();
  const [data, setData] = useState<Subscriber[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function refresh() {
    setLoading(true);
    try { setData((await api.list("subscribers")).data); } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(
    () => (query.trim() ? data.filter((s) => s.email.toLowerCase().includes(query.toLowerCase())) : data),
    [data, query],
  );

  async function remove(row: Subscriber) {
    await api.remove("subscribers", row.id);
    setData((prev) => prev.filter((s) => s.id !== row.id));
    message.success("Subscriber removed");
  }

  function exportCsv() {
    const csv = ["email,subscribed_at", ...data.map((s) => `${s.email},${s.createdAt}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const columns: ColumnsType<Subscriber> = [
    { title: "Email", dataIndex: "email", render: (v) => (
      <span className="inline-flex items-center gap-2 font-medium text-ink"><FiMail className="size-4 text-brand" />{v}</span>
    ), sorter: (a, b) => a.email.localeCompare(b.email) },
    { title: "Subscribed", dataIndex: "createdAt", render: (v) => <DateCell value={v} />, sorter: (a, b) => a.createdAt.localeCompare(b.createdAt) },
    { title: "", key: "actions", fixed: "right", width: 60, render: (_, r) => (
      <Popconfirm title="Remove subscriber?" okText="Remove" okButtonProps={{ danger: true }} onConfirm={() => remove(r)}>
        <Button type="text" size="small" danger icon={<FiTrash2 />} />
      </Popconfirm>
    ) },
  ];

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input allowClear prefix={<FiSearch className="text-muted" />} placeholder="Search email..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 280 }} />
        <div className="flex gap-2">
          <Button icon={<FiRefreshCw />} onClick={refresh}>Refresh</Button>
          <Button type="primary" icon={<FiDownload />} onClick={exportCsv}>Export CSV</Button>
        </div>
      </div>
      <Table<Subscriber> rowKey="id" loading={loading} columns={columns} dataSource={filtered} size="middle" pagination={{ pageSize: 10, showTotal: (t) => `${t} subscribers` }} />
    </div>
  );
}
