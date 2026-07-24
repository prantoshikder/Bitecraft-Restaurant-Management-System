"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell, MoneyCell, DateCell } from "../cells";
import type { RestaurantEvent } from "@/lib/types";

const columns: ColumnsType<RestaurantEvent> = [
  { title: "", dataIndex: "image", width: 60, render: (v, r) => <ImageCell src={v} name={r.title} /> },
  { title: "Event", dataIndex: "title", render: (v, r) => (
    <div><p className="font-semibold text-ink">{v}</p><p className="max-w-[260px] truncate text-[11px] text-muted">{r.description}</p></div>
  ), sorter: (a, b) => a.title.localeCompare(b.title) },
  { title: "Date", dataIndex: "date", render: (v) => <DateCell value={v} /> },
  { title: "Time", dataIndex: "time" },
  { title: "Seats", dataIndex: "seats", align: "center" },
  { title: "Price", dataIndex: "price", align: "right", render: (v) => <MoneyCell value={v} /> },
  { title: "Status", dataIndex: "published", render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Published" : "Draft"}</Tag> },
];

const fields: Field[] = [
  { name: "title", label: "Event Title", type: "text", required: true, span: 2 },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image URL", type: "image", required: true, span: 2 },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "time", label: "Time", type: "text", required: true, placeholder: "19:00" },
  { name: "seats", label: "Available Seats", type: "number", required: true, min: 1, default: 40 },
  { name: "price", label: "Price / Person", type: "money", required: true, default: 50 },
  { name: "published", label: "Published", type: "switch", default: true },
];

export default function EventsManager({ initialData }: { initialData: RestaurantEvent[] }) {
  return (
    <CrudManager<RestaurantEvent>
      resource="events"
      singular="Event"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["title", "description"]}
      filters={{ key: "published", label: "Status", options: ["true", "false"] }}
      rowKeyLabel={(r) => r.title}
    />
  );
}
