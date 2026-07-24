"use client";

import type { ColumnsType } from "antd/es/table";
import { Rate, Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { UserCell, DateCell } from "../cells";
import type { Review } from "@/lib/types";

const columns: ColumnsType<Review> = [
  { title: "Reviewer", dataIndex: "name", render: (v, r) => <UserCell src={r.avatar} name={v} sub={r.role} />, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Rating", dataIndex: "rating", render: (v) => <Rate disabled value={v} style={{ fontSize: 13 }} />, sorter: (a, b) => a.rating - b.rating },
  { title: "Message", dataIndex: "message", render: (v) => <p className="max-w-[360px] truncate text-ink/70">{v}</p> },
  { title: "Date", dataIndex: "createdAt", responsive: ["lg"], render: (v) => <DateCell value={v} /> },
  { title: "Status", dataIndex: "approved", render: (v) => <Tag color={v ? "green" : "gold"}>{v ? "Approved" : "Pending"}</Tag> },
];

const fields: Field[] = [
  { name: "name", label: "Reviewer Name", type: "text", required: true },
  { name: "role", label: "Role / Title", type: "text", placeholder: "Food Blogger" },
  { name: "avatar", label: "Avatar URL", type: "image", span: 2 },
  { name: "rating", label: "Rating", type: "rate", default: 5 },
  { name: "message", label: "Review Message", type: "textarea", required: true, span: 2 },
  { name: "approved", label: "Approved (show on site)", type: "switch", default: false },
];

export default function ReviewsManager({ initialData }: { initialData: Review[] }) {
  return (
    <CrudManager<Review>
      resource="reviews"
      singular="Review"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "message", "role"]}
      filters={{ key: "approved", label: "Status", options: ["true", "false"] }}
      rowKeyLabel={(r) => r.name}
    />
  );
}
