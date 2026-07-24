"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { UserCell, MoneyCell, DateCell, TIER_COLORS } from "../cells";
import type { Customer } from "@/lib/types";

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

const columns: ColumnsType<Customer> = [
  { title: "Customer", dataIndex: "name", render: (v, r) => <UserCell src={r.avatar} name={v} sub={r.email} />, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: "Phone", dataIndex: "phone", responsive: ["lg"] },
  { title: "Orders", dataIndex: "orders", align: "center", sorter: (a, b) => a.orders - b.orders },
  { title: "Spent", dataIndex: "spent", align: "right", sorter: (a, b) => a.spent - b.spent, render: (v) => <MoneyCell value={v} /> },
  { title: "Tier", dataIndex: "tier", render: (v) => <Tag color={TIER_COLORS[v]}>{v}</Tag>,
    filters: TIERS.map((t) => ({ text: t, value: t })), onFilter: (val, r) => r.tier === val },
  { title: "Joined", dataIndex: "joinedAt", responsive: ["xl"], render: (v) => <DateCell value={v} /> },
];

const fields: Field[] = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "avatar", label: "Avatar URL", type: "image", span: 2 },
  { name: "orders", label: "Total Orders", type: "number", min: 0, default: 0 },
  { name: "spent", label: "Total Spent", type: "money", default: 0 },
  { name: "tier", label: "Loyalty Tier", type: "select", options: TIERS.map((t) => ({ label: t, value: t })), default: "Bronze" },
  { name: "joinedAt", label: "Joined Date", type: "date" },
];

export default function CustomersManager({ initialData }: { initialData: Customer[] }) {
  return (
    <CrudManager<Customer>
      resource="customers"
      singular="Customer"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "email", "phone"]}
      filters={{ key: "tier", label: "Tier", options: TIERS }}
      rowKeyLabel={(r) => r.name}
    />
  );
}
