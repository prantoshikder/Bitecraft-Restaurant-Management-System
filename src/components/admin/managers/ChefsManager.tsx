"use client";

import type { ColumnsType } from "antd/es/table";
import { Rate, Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell } from "../cells";
import type { Chef } from "@/lib/types";

const columns: ColumnsType<Chef> = [
  { title: "", dataIndex: "image", width: 60, render: (v, r) => <ImageCell src={v} name={r.name} rounded /> },
  { title: "Chef", dataIndex: "name", render: (v, r) => (
    <div><p className="font-semibold text-ink">{v}</p><p className="text-[11px] text-brand">{r.title}</p></div>
  ), sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Speciality", dataIndex: "speciality", responsive: ["lg"], render: (v) => <span className="text-ink/70">{v}</span> },
  { title: "Experience", dataIndex: "experience", align: "center", render: (v) => `${v} yrs`, sorter: (a, b) => a.experience - b.experience },
  { title: "Rating", dataIndex: "rating", render: (v) => <Rate disabled allowHalf value={v} style={{ fontSize: 13 }} /> },
  { title: "Featured", dataIndex: "featured", align: "center", render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Yes" : "No"}</Tag> },
];

const fields: Field[] = [
  { name: "name", label: "Chef Name", type: "text", required: true },
  { name: "title", label: "Job Title", type: "text", required: true, placeholder: "Head Chef" },
  { name: "image", label: "Photo URL", type: "image", required: true, span: 2 },
  { name: "speciality", label: "Speciality", type: "text", required: true, span: 2 },
  { name: "experience", label: "Experience (years)", type: "number", min: 0, default: 5 },
  { name: "rating", label: "Rating", type: "rate", default: 4.5 },
  { name: "featured", label: "Show on Website", type: "switch", default: true },
];

export default function ChefsManager({ initialData }: { initialData: Chef[] }) {
  return (
    <CrudManager<Chef>
      resource="chefs"
      singular="Chef"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "title", "speciality"]}
      rowKeyLabel={(r) => r.name}
    />
  );
}
