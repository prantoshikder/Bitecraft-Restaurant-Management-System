"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { ImageCell, DateCell } from "../cells";
import type { Post } from "@/lib/types";

const CATEGORIES = ["Menu", "Events", "News", "Story", "Recipes"];

const columns: ColumnsType<Post> = [
  { title: "", dataIndex: "cover", width: 60, render: (v, r) => <ImageCell src={v} name={r.title} /> },
  { title: "Title", dataIndex: "title", render: (v, r) => (
    <div><p className="font-semibold text-ink">{v}</p><p className="max-w-[260px] truncate text-[11px] text-muted">{r.excerpt}</p></div>
  ), sorter: (a, b) => a.title.localeCompare(b.title) },
  { title: "Category", dataIndex: "category", render: (v) => <Tag color="lime">{v}</Tag> },
  { title: "Author", dataIndex: "author", responsive: ["lg"] },
  { title: "Date", dataIndex: "date", render: (v) => <DateCell value={v} /> },
  { title: "Status", dataIndex: "published", render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Published" : "Draft"}</Tag> },
];

const fields: Field[] = [
  { name: "title", label: "Title", type: "text", required: true, span: 2 },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "category", label: "Category", type: "select", required: true, options: CATEGORIES.map((c) => ({ label: c, value: c })) },
  { name: "author", label: "Author", type: "text", required: true },
  { name: "date", label: "Publish Date", type: "date", required: true },
  { name: "cover", label: "Cover Image URL", type: "image", required: true, span: 2 },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Content", type: "textarea", required: true, help: "Separate paragraphs with a blank line." },
  { name: "published", label: "Published", type: "switch", default: true },
];

export default function PostsManager({ initialData }: { initialData: Post[] }) {
  return (
    <CrudManager<Post>
      resource="posts"
      singular="Post"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["title", "excerpt", "author"]}
      filters={{ key: "published", label: "Status", options: ["true", "false"] }}
      rowKeyLabel={(r) => r.title}
    />
  );
}
