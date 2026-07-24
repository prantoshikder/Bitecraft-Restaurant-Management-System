"use client";

import type { ColumnsType } from "antd/es/table";
import { FiUsers } from "react-icons/fi";
import CrudManager, { type Field } from "../CrudManager";
import { StatusTag } from "../cells";
import type { Table as TableType } from "@/lib/types";

const ZONES = ["Indoor", "Outdoor", "Rooftop", "VIP"];
const STATUSES = ["available", "occupied", "reserved", "cleaning"];

const columns: ColumnsType<TableType> = [
  { title: "Table", dataIndex: "number", render: (v) => <span className="font-bold text-ink">{v}</span>, sorter: (a, b) => a.number.localeCompare(b.number) },
  { title: "Capacity", dataIndex: "capacity", align: "center", sorter: (a, b) => a.capacity - b.capacity,
    render: (v) => <span className="inline-flex items-center gap-1 font-semibold"><FiUsers className="size-3.5 text-brand" />{v}</span> },
  { title: "Zone", dataIndex: "zone" },
  { title: "Status", dataIndex: "status", render: (v) => <StatusTag value={v} /> },
];

const fields: Field[] = [
  { name: "number", label: "Table Number", type: "text", required: true, placeholder: "T-01" },
  { name: "capacity", label: "Capacity", type: "number", required: true, min: 1, max: 30, default: 4 },
  { name: "zone", label: "Zone", type: "select", required: true, options: ZONES.map((z) => ({ label: z, value: z })) },
  { name: "status", label: "Status", type: "select", required: true, options: STATUSES.map((s) => ({ label: s, value: s })), default: "available" },
];

export default function TablesManager({ initialData }: { initialData: TableType[] }) {
  return (
    <CrudManager<TableType>
      resource="tables"
      singular="Table"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["number", "zone"]}
      filters={{ key: "status", label: "Status", options: STATUSES }}
    />
  );
}
