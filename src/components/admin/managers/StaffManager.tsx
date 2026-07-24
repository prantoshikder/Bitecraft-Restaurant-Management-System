"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { UserCell, MoneyCell, StatusTag } from "../cells";
import type { Staff } from "@/lib/types";

const SHIFTS = ["Morning", "Evening", "Night"];
const STATUSES = ["active", "on-leave", "inactive"];
const ROLES = ["Head Chef", "Sous Chef", "Grill Specialist", "Pastry Chef", "Restaurant Manager", "Head Waiter", "Waiter", "Bartender", "Cashier", "Host"];

const columns: ColumnsType<Staff> = [
  { title: "Staff", dataIndex: "name", render: (v, r) => <UserCell src={r.avatar} name={v} sub={r.email} />, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Role", dataIndex: "role", render: (v) => <Tag color="lime">{v}</Tag> },
  { title: "Phone", dataIndex: "phone", responsive: ["lg"] },
  { title: "Shift", dataIndex: "shift", align: "center" },
  { title: "Salary", dataIndex: "salary", align: "right", sorter: (a, b) => a.salary - b.salary, render: (v) => <MoneyCell value={v} /> },
  { title: "Status", dataIndex: "status", render: (v) => <StatusTag value={v} /> },
];

const fields: Field[] = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "role", label: "Role", type: "select", required: true, options: ROLES.map((r) => ({ label: r, value: r })) },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "avatar", label: "Avatar URL", type: "image", span: 2 },
  { name: "salary", label: "Monthly Salary", type: "money", required: true, default: 3000 },
  { name: "shift", label: "Shift", type: "select", options: SHIFTS.map((s) => ({ label: s, value: s })), default: "Morning" },
  { name: "status", label: "Status", type: "select", options: STATUSES.map((s) => ({ label: s, value: s })), default: "active" },
  { name: "joinedAt", label: "Joined Date", type: "date" },
];

export default function StaffManager({ initialData }: { initialData: Staff[] }) {
  return (
    <CrudManager<Staff>
      resource="staff"
      singular="Staff"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "role", "email"]}
      filters={{ key: "status", label: "Status", options: STATUSES }}
      rowKeyLabel={(r) => r.name}
    />
  );
}
