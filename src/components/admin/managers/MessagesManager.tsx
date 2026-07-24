"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Input, Segmented, Button, App, Popconfirm, Drawer, Tag, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiSearch, FiTrash2, FiMail, FiRefreshCw } from "react-icons/fi";
import { api } from "@/lib/api";
import { formatDateTime, timeAgo } from "@/lib/utils";
import type { Message } from "@/lib/types";

export default function MessagesManager({ initialData }: { initialData: Message[] }) {
  const { message: toast } = App.useApp();
  const [data, setData] = useState<Message[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [active, setActive] = useState<Message | null>(null);

  async function refresh() {
    setLoading(true);
    try { setData((await api.list("messages")).data); } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    let rows = data;
    if (tab === "Unread") rows = rows.filter((m) => !m.read);
    if (tab === "Read") rows = rows.filter((m) => m.read);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((m) => m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    }
    return rows;
  }, [data, tab, query]);

  async function open(msg: Message) {
    setActive(msg);
    if (!msg.read) {
      const res = await api.update("messages", msg.id, { read: true });
      setData((prev) => prev.map((m) => (m.id === msg.id ? res.data : m)));
    }
  }

  async function remove(msg: Message) {
    await api.remove("messages", msg.id);
    setData((prev) => prev.filter((m) => m.id !== msg.id));
    toast.success("Message deleted");
  }

  const unread = data.filter((m) => !m.read).length;

  const columns: ColumnsType<Message> = [
    { title: "From", dataIndex: "name", render: (v, r) => (
      <div className="flex items-center gap-2">
        {!r.read ? <span className="size-2 rounded-full bg-brand" /> : <span className="size-2" />}
        <div><p className={`text-[13px] ${r.read ? "text-ink/70" : "font-bold text-ink"}`}>{v}</p><p className="text-[11px] text-muted">{r.email}</p></div>
      </div>
    ) },
    { title: "Subject", dataIndex: "subject", render: (v, r) => <span className={r.read ? "text-ink/70" : "font-semibold text-ink"}>{v}</span> },
    { title: "Received", dataIndex: "createdAt", responsive: ["lg"], render: (v) => <span className="text-xs text-muted">{timeAgo(v)}</span> },
    { title: "", key: "actions", fixed: "right", width: 60, render: (_, r) => (
      <Popconfirm title="Delete message?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={(e) => { e?.stopPropagation(); remove(r); }} onCancel={(e) => e?.stopPropagation()}>
        <Button type="text" size="small" danger icon={<FiTrash2 />} onClick={(e) => e.stopPropagation()} />
      </Popconfirm>
    ) },
  ];

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input allowClear prefix={<FiSearch className="text-muted" />} placeholder="Search messages..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 280 }} />
        <Button icon={<FiRefreshCw />} onClick={refresh}>Refresh</Button>
      </div>
      <Segmented className="mb-4" options={["All", { label: `Unread (${unread})`, value: "Unread" }, "Read"]} value={tab} onChange={(v) => setTab(v as string)} />
      <Table<Message> rowKey="id" loading={loading} columns={columns} dataSource={filtered} size="middle" scroll={{ x: "max-content" }}
        onRow={(r) => ({ onClick: () => open(r), style: { cursor: "pointer" } })}
        pagination={{ pageSize: 8, showTotal: (t) => `${t} messages` }} />

      <Drawer title={active?.subject} open={!!active} onClose={() => setActive(null)} width={460}>
        {active ? (
          <div className="space-y-5">
            <Descriptions column={1} size="small" bordered
              items={[
                { label: "Name", children: active.name },
                { label: "Email", children: active.email },
                ...(active.phone ? [{ label: "Phone", children: active.phone }] : []),
                { label: "Received", children: formatDateTime(active.createdAt) },
                { label: "Status", children: <Tag color={active.read ? "green" : "gold"}>{active.read ? "Read" : "Unread"}</Tag> },
              ]}
            />
            <div>
              <p className="mb-2 text-sm font-bold text-ink">Message</p>
              <p className="rounded-xl bg-cream-2 p-4 text-sm leading-relaxed text-ink/80">{active.message}</p>
            </div>
            <a href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject)}`} className="btn btn-primary w-full">
              <FiMail className="size-4" /> Reply by Email
            </a>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
