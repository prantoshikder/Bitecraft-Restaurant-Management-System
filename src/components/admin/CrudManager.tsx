"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table, Button, Modal, Form, Input, InputNumber, Select, Switch, DatePicker, Rate,
  Popconfirm, App, Segmented, Empty, Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiRefreshCw } from "react-icons/fi";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import type { Resource } from "@/lib/types";

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "money" | "select" | "multiselect" | "tags" | "switch" | "date" | "rate" | "image" | "email" | "color";
  required?: boolean;
  options?: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  span?: 1 | 2;
  help?: string;
  default?: unknown;
};

type Row = Record<string, unknown> & { id: string };

export default function CrudManager<T extends Row>({
  resource,
  singular,
  columns,
  fields,
  initialData,
  searchKeys,
  filters,
  rowKeyLabel,
}: {
  resource: Resource;
  singular: string;
  columns: ColumnsType<T>;
  fields: Field[];
  initialData: T[];
  searchKeys: string[];
  filters?: { key: string; label: string; options: string[] };
  rowKeyLabel?: (row: T) => string;
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await api.list(resource);
      setData(res.data as unknown as T[]);
    } catch {
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // keep initial SSR data, but silently refresh once for latest
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let rows = data;
    if (filters && filterValue !== "All") {
      rows = rows.filter((r) => String(r[filters.key]) === filterValue);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) => searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q)));
    }
    return rows;
  }, [data, query, filterValue, filters, searchKeys]);

  function openCreate() {
    setEditing(null);
    form.resetFields();
    const defaults: Record<string, unknown> = {};
    for (const f of fields) if (f.default !== undefined) defaults[f.name] = f.default;
    form.setFieldsValue(defaults);
    setOpen(true);
  }

  function openEdit(row: T) {
    setEditing(row);
    const values: Record<string, unknown> = { ...row };
    for (const f of fields) {
      if (f.type === "date" && values[f.name]) values[f.name] = dayjs(values[f.name] as string);
    }
    form.setFieldsValue(values);
    setOpen(true);
  }

  async function save() {
    try {
      const values = await form.validateFields();
      for (const f of fields) {
        if (f.type === "date" && values[f.name]) {
          const d = values[f.name] as dayjs.Dayjs;
          values[f.name] = f.name === "date" ? d.format("YYYY-MM-DD") : d.toISOString();
        }
      }
      setSaving(true);
      if (editing) {
        const res = await api.update(resource, editing.id, values);
        setData((prev) => prev.map((r) => (r.id === editing.id ? (res.data as unknown as T) : r)));
        message.success(`${singular} updated`);
      } else {
        const res = await api.create(resource, values);
        setData((prev) => [res.data as unknown as T, ...prev]);
        message.success(`${singular} created`);
      }
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) message.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: T) {
    try {
      await api.remove(resource, row.id);
      setData((prev) => prev.filter((r) => r.id !== row.id));
      message.success(`${singular} deleted`);
    } catch {
      message.error("Delete failed");
    }
  }

  const actionColumn: ColumnsType<T>[number] = {
    title: "Actions",
    key: "__actions",
    fixed: "right",
    width: 110,
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <Tooltip title="Edit">
          <Button type="text" size="small" icon={<FiEdit2 />} onClick={() => openEdit(row)} />
        </Tooltip>
        <Popconfirm
          title={`Delete this ${singular.toLowerCase()}?`}
          description="This action cannot be undone."
          okText="Delete"
          okButtonProps={{ danger: true }}
          onConfirm={() => remove(row)}
        >
          <Tooltip title="Delete">
            <Button type="text" size="small" danger icon={<FiTrash2 />} />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  };

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            allowClear
            prefix={<FiSearch className="text-muted" />}
            placeholder={`Search ${resource}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 260 }}
          />
          {filters ? (
            <Segmented
              options={["All", ...filters.options]}
              value={filterValue}
              onChange={(v) => setFilterValue(v as string)}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<FiRefreshCw />} onClick={refresh}>Refresh</Button>
          <Button type="primary" icon={<FiPlus />} onClick={openCreate}>
            Add {singular}
          </Button>
        </div>
      </div>

      <Table<T>
        rowKey="id"
        loading={loading}
        columns={[...columns, actionColumn]}
        dataSource={filtered}
        size="middle"
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 8, showSizeChanger: true, showTotal: (t) => `${t} ${resource}` }}
        locale={{ emptyText: <Empty description={`No ${resource} yet`} /> }}
      />

      <Modal
        title={
          <span className="text-base font-bold">
            {editing ? `Edit ${singular}` : `Add New ${singular}`}
            {editing && rowKeyLabel ? <span className="ml-2 text-xs font-normal text-muted">{rowKeyLabel(editing)}</span> : null}
          </span>
        }
        open={open}
        onCancel={() => setOpen(false)}
        onOk={save}
        okText={editing ? "Save Changes" : `Create ${singular}`}
        confirmLoading={saving}
        width={640}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-x-4">
            {fields.map((f) => (
              <Form.Item
                key={f.name}
                name={f.name}
                label={f.label}
                help={f.help}
                valuePropName={f.type === "switch" ? "checked" : "value"}
                rules={f.required ? [{ required: true, message: `${f.label} is required` }] : undefined}
                className={f.span === 2 || ["textarea", "tags", "multiselect"].includes(f.type) ? "col-span-2" : "col-span-2 sm:col-span-1"}
              >
                <FieldControl field={f} />
              </Form.Item>
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

function FieldControl({ field }: { field: Field }) {
  switch (field.type) {
    case "textarea":
      return <Input.TextArea rows={3} placeholder={field.placeholder} />;
    case "number":
      return <InputNumber min={field.min} max={field.max} step={field.step} placeholder={field.placeholder} style={{ width: "100%" }} />;
    case "money":
      return <InputNumber min={0} step={0.5} prefix="$" placeholder={field.placeholder} style={{ width: "100%" }} />;
    case "select":
      return <Select options={field.options} placeholder={field.placeholder} showSearch optionFilterProp="label" />;
    case "multiselect":
      return <Select mode="multiple" options={field.options} placeholder={field.placeholder} />;
    case "tags":
      return <Select mode="tags" tokenSeparators={[","]} placeholder={field.placeholder ?? "Type and press enter"} />;
    case "switch":
      return <Switch />;
    case "date":
      return <DatePicker style={{ width: "100%" }} />;
    case "rate":
      return <Rate allowHalf />;
    case "email":
      return <Input type="email" placeholder={field.placeholder} />;
    case "color":
      return <Input type="text" placeholder="#8cb33f" />;
    case "image":
      return <Input placeholder="https://image-url.com/photo.jpg" />;
    default:
      return <Input placeholder={field.placeholder} />;
  }
}
