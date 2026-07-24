"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell, DateCell } from "../cells";
import type { Offer } from "@/lib/types";

const columns: ColumnsType<Offer> = [
  { title: "", dataIndex: "image", width: 60, render: (v, r) => <ImageCell src={v} name={r.title} /> },
  { title: "Offer", dataIndex: "title", render: (v, r) => (
    <div><p className="font-semibold text-ink">{v}</p><p className="text-[11px] text-muted">{r.subtitle}</p></div>
  ) },
  { title: "Code", dataIndex: "code", render: (v) => <Tag color="lime" className="!m-0 font-mono">{v}</Tag> },
  { title: "Discount", dataIndex: "discount", align: "center", render: (v) => <span className="font-bold text-brand">{v}%</span>, sorter: (a, b) => a.discount - b.discount },
  { title: "Valid From", dataIndex: "validFrom", render: (v) => <DateCell value={v} /> },
  { title: "Valid To", dataIndex: "validTo", render: (v) => <DateCell value={v} /> },
  { title: "Status", dataIndex: "active", render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Active" : "Ended"}</Tag> },
];

const fields: Field[] = [
  { name: "title", label: "Offer Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text", required: true },
  { name: "code", label: "Promo Code", type: "text", required: true, placeholder: "SUMMER25" },
  { name: "discount", label: "Discount (%)", type: "number", required: true, min: 1, max: 100, default: 20 },
  { name: "image", label: "Image URL", type: "image", required: true, span: 2 },
  { name: "validFrom", label: "Valid From", type: "date", required: true },
  { name: "validTo", label: "Valid To", type: "date", required: true },
  { name: "active", label: "Active", type: "switch", default: true },
];

export default function OffersManager({ initialData }: { initialData: Offer[] }) {
  return (
    <CrudManager<Offer>
      resource="offers"
      singular="Offer"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["title", "code", "subtitle"]}
      filters={{ key: "active", label: "Status", options: ["true", "false"] }}
    />
  );
}
