"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell } from "../cells";
import type { Category } from "@/lib/types";

const columns: ColumnsType<Category> = [
  { title: "", dataIndex: "image", width: 60, render: (v, r) => <ImageCell src={v} name={r.name} /> },
  { title: "Name", dataIndex: "name", render: (v) => <span className="font-semibold text-ink">{v}</span>, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Slug", dataIndex: "slug", render: (v) => <span className="text-muted">{v}</span> },
  { title: "Items", dataIndex: "itemCount", align: "center", sorter: (a, b) => a.itemCount - b.itemCount },
  { title: "Status", dataIndex: "active", render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Active" : "Hidden"}</Tag> },
];

const fields: Field[] = [
  { name: "name", label: "Category Name", type: "text", required: true, placeholder: "e.g. Burger" },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "burger" },
  { name: "image", label: "Image URL", type: "image", required: true, span: 2 },
  { name: "itemCount", label: "Item Count", type: "number", min: 0, default: 0 },
  { name: "active", label: "Active", type: "switch", default: true },
];

export default function CategoriesManager({ initialData }: { initialData: Category[] }) {
  return (
    <CrudManager<Category>
      resource="categories"
      singular="Category"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "slug"]}
      filters={{ key: "active", label: "Status", options: ["true", "false"] }}
    />
  );
}
