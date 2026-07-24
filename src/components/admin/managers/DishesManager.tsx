"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { FiStar } from "react-icons/fi";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell, MoneyCell, Tags } from "../cells";
import type { Dish } from "@/lib/types";

export default function DishesManager({
  initialData,
  categories,
}: {
  initialData: Dish[];
  categories: Array<{ id: string; name: string }>;
}) {
  const catMap = new Map(categories.map((c) => [c.id, c.name]));

  const columns: ColumnsType<Dish> = [
    { title: "", dataIndex: "image", width: 60, render: (v, r) => <ImageCell src={v} name={r.name} /> },
    { title: "Dish", dataIndex: "name", render: (v, r) => (
      <div><p className="font-semibold text-ink">{v}</p><p className="max-w-[220px] truncate text-[11px] text-muted">{r.description}</p></div>
    ), sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Category", dataIndex: "categoryId", render: (v) => <Tag color="lime">{catMap.get(v) ?? "—"}</Tag>,
      filters: categories.map((c) => ({ text: c.name, value: c.id })), onFilter: (val, r) => r.categoryId === val },
    { title: "Price", dataIndex: "price", align: "right", sorter: (a, b) => a.price - b.price, render: (v) => <MoneyCell value={v} /> },
    { title: "Rating", dataIndex: "rating", align: "center", sorter: (a, b) => a.rating - b.rating,
      render: (v) => <span className="inline-flex items-center gap-1 font-semibold"><FiStar className="size-3.5 fill-amber-400 text-amber-400" />{v.toFixed(1)}</span> },
    { title: "Tags", dataIndex: "tags", render: (v) => <Tags items={v} /> },
    { title: "Available", dataIndex: "available", render: (v) => <Tag color={v ? "green" : "red"}>{v ? "Yes" : "Sold out"}</Tag> },
    { title: "Featured", dataIndex: "featured", align: "center", render: (v) => (v ? <FiStar className="mx-auto size-4 fill-amber-400 text-amber-400" /> : <span className="text-muted">—</span>) },
  ];

  const fields: Field[] = [
    { name: "name", label: "Dish Name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "categoryId", label: "Category", type: "select", required: true, options: categories.map((c) => ({ label: c.name, value: c.id })) },
    { name: "image", label: "Image URL", type: "image", required: true },
    { name: "price", label: "Price", type: "money", required: true },
    { name: "oldPrice", label: "Old Price (optional)", type: "money" },
    { name: "rating", label: "Rating", type: "rate", default: 4.5 },
    { name: "reviews", label: "Review Count", type: "number", min: 0, default: 0 },
    { name: "prepTime", label: "Prep Time (min)", type: "number", min: 1, default: 15 },
    { name: "calories", label: "Calories", type: "number", min: 0, default: 400 },
    { name: "spicy", label: "Spice Level (0-3)", type: "number", min: 0, max: 3, default: 0 },
    { name: "tags", label: "Tags", type: "tags" },
    { name: "veg", label: "Vegetarian", type: "switch", default: false },
    { name: "available", label: "Available", type: "switch", default: true },
    { name: "featured", label: "Featured on Home", type: "switch", default: false },
    { name: "todaysMenu", label: "Show in Today's Menu", type: "switch", default: false },
  ];

  return (
    <CrudManager<Dish>
      resource="dishes"
      singular="Dish"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "description"]}
      rowKeyLabel={(r) => r.name}
    />
  );
}
