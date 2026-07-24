"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell, DateCell } from "../cells";
import type { GalleryImage } from "@/lib/types";

const CATEGORIES = ["Ambience", "Food", "Events", "Team"];

const columns: ColumnsType<GalleryImage> = [
  { title: "", dataIndex: "url", width: 70, render: (v, r) => <ImageCell src={v} name={r.title} /> },
  { title: "Title", dataIndex: "title", render: (v) => <span className="font-semibold text-ink">{v}</span>, sorter: (a, b) => a.title.localeCompare(b.title) },
  { title: "Category", dataIndex: "category", render: (v) => <Tag color="lime">{v}</Tag> },
  { title: "Added", dataIndex: "createdAt", render: (v) => <DateCell value={v} /> },
];

const fields: Field[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "category", label: "Category", type: "select", required: true, options: CATEGORIES.map((c) => ({ label: c, value: c })), default: "Food" },
  { name: "url", label: "Image URL", type: "image", required: true, span: 2 },
];

export default function GalleryManager({ initialData }: { initialData: GalleryImage[] }) {
  return (
    <CrudManager<GalleryImage>
      resource="gallery"
      singular="Image"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["title", "category"]}
      filters={{ key: "category", label: "Category", options: CATEGORIES }}
      rowKeyLabel={(r) => r.title}
    />
  );
}
