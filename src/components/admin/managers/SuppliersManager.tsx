"use client";

import type { ColumnsType } from "antd/es/table";
import CrudManager, { type Field } from "../CrudManager";
import { StatusTag } from "../cells";
import type { Supplier } from "@/lib/types";

const columns: ColumnsType<Supplier> = [
  { title: "Supplier", dataIndex: "name", render: (v, r) => (
    <div><p className="font-semibold text-ink">{v}</p><p className="text-[11px] text-muted">{r.contact}</p></div>
  ), sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Supplies", dataIndex: "items", render: (v) => <span className="text-ink/70">{v}</span> },
  { title: "Phone", dataIndex: "phone", responsive: ["lg"] },
  { title: "Email", dataIndex: "email", responsive: ["xl"], render: (v) => <span className="text-muted">{v}</span> },
  { title: "Status", dataIndex: "status", render: (v) => <StatusTag value={v} /> },
];

const fields: Field[] = [
  { name: "name", label: "Supplier Name", type: "text", required: true },
  { name: "contact", label: "Contact Person", type: "text", required: true },
  { name: "items", label: "Supplies", type: "text", required: true, span: 2, placeholder: "Vegetables, Herbs" },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "status", label: "Status", type: "select", options: ["active", "inactive"].map((s) => ({ label: s, value: s })), default: "active" },
];

export default function SuppliersManager({ initialData }: { initialData: Supplier[] }) {
  return (
    <CrudManager<Supplier>
      resource="suppliers"
      singular="Supplier"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "contact", "items"]}
      filters={{ key: "status", label: "Status", options: ["active", "inactive"] }}
      rowKeyLabel={(r) => r.name}
    />
  );
}
