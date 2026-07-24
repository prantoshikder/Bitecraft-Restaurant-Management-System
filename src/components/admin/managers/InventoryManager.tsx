"use client";

import type { ColumnsType } from "antd/es/table";
import { Tag, Progress } from "antd";
import CrudManager, { type Field } from "../CrudManager";
import { MoneyCell, DateCell } from "../cells";
import type { InventoryItem } from "@/lib/types";

export default function InventoryManager({
  initialData,
  suppliers,
}: {
  initialData: InventoryItem[];
  suppliers: Array<{ id: string; name: string }>;
}) {
  const supMap = new Map(suppliers.map((s) => [s.id, s.name]));

  const columns: ColumnsType<InventoryItem> = [
    { title: "Item", dataIndex: "name", render: (v) => <span className="font-semibold text-ink">{v}</span>, sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Stock", dataIndex: "quantity", sorter: (a, b) => a.quantity - b.quantity, render: (v, r) => {
      const ratio = Math.min(100, Math.round((v / (r.threshold * 2 || 1)) * 100));
      const low = v <= r.threshold;
      return (
        <div className="w-32">
          <div className="flex items-center justify-between text-[12px]">
            <span className={low ? "font-bold text-rose-600" : "font-semibold text-ink"}>{v} {r.unit}</span>
            {low ? <Tag color="red" className="!m-0">Low</Tag> : null}
          </div>
          <Progress percent={ratio} showInfo={false} size="small" strokeColor={low ? "#e11d48" : "#8cb33f"} />
        </div>
      );
    } },
    { title: "Threshold", dataIndex: "threshold", align: "center", render: (v, r) => `${v} ${r.unit}` },
    { title: "Cost / Unit", dataIndex: "costPerUnit", align: "right", render: (v) => <MoneyCell value={v} bold={false} /> },
    { title: "Value", key: "value", align: "right", render: (_, r) => <MoneyCell value={Math.round(r.quantity * r.costPerUnit * 100) / 100} /> },
    { title: "Supplier", dataIndex: "supplierId", responsive: ["lg"], render: (v) => <Tag>{supMap.get(v) ?? "—"}</Tag> },
    { title: "Updated", dataIndex: "updatedAt", responsive: ["xl"], render: (v) => <DateCell value={v} /> },
  ];

  const fields: Field[] = [
    { name: "name", label: "Item Name", type: "text", required: true },
    { name: "unit", label: "Unit", type: "select", required: true, options: ["kg", "ltr", "pcs", "bunch", "box"].map((u) => ({ label: u, value: u })), default: "kg" },
    { name: "quantity", label: "Quantity in Stock", type: "number", required: true, min: 0, default: 0 },
    { name: "threshold", label: "Low-stock Threshold", type: "number", required: true, min: 0, default: 10 },
    { name: "costPerUnit", label: "Cost per Unit", type: "money", required: true, default: 1 },
    { name: "supplierId", label: "Supplier", type: "select", options: suppliers.map((s) => ({ label: s.name, value: s.id })) },
  ];

  return (
    <CrudManager<InventoryItem>
      resource="inventory"
      singular="Inventory Item"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={["name", "unit"]}
      rowKeyLabel={(r) => r.name}
    />
  );
}
