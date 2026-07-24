"use client";

import { useState } from "react";
import { Form, Input, InputNumber, Button, Card, App, Row, Col } from "antd";
import { FiSave } from "react-icons/fi";
import { api } from "@/lib/api";
import type { Settings } from "@/lib/types";

export default function SettingsManager({ initial }: { initial: Settings }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  async function save() {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await api.update("settings", initial.id, values);
      message.success("Settings saved");
    } catch (err) {
      if (err instanceof Error) message.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Form form={form} layout="vertical" initialValues={initial} onFinish={save}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={<span className="font-bold">Restaurant Details</span>}>
          <Form.Item name="name" label="Restaurant Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="tagline" label="Tagline"><Input /></Form.Item>
          <Form.Item name="address" label="Address"><Input.TextArea rows={2} /></Form.Item>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="openHours" label="Weekday Hours"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="weekendHours" label="Weekend Hours"><Input /></Form.Item></Col>
          </Row>
        </Card>

        <Card title={<span className="font-bold">Contact & Finance</span>}>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="email" label="Email" rules={[{ type: "email" }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="Phone"><Input /></Form.Item></Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="currency" label="Currency"><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="taxRate" label="Tax Rate (%)"><InputNumber min={0} max={100} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="deliveryFee" label="Delivery Fee"><InputNumber min={0} step={0.5} prefix="$" style={{ width: "100%" }} /></Form.Item></Col>
          </Row>
        </Card>

        <Card title={<span className="font-bold">Social Links</span>} className="lg:col-span-2">
          <Row gutter={12}>
            <Col xs={24} sm={12} lg={6}><Form.Item name={["socials", "facebook"]} label="Facebook"><Input placeholder="https://" /></Form.Item></Col>
            <Col xs={24} sm={12} lg={6}><Form.Item name={["socials", "instagram"]} label="Instagram"><Input placeholder="https://" /></Form.Item></Col>
            <Col xs={24} sm={12} lg={6}><Form.Item name={["socials", "twitter"]} label="Twitter"><Input placeholder="https://" /></Form.Item></Col>
            <Col xs={24} sm={12} lg={6}><Form.Item name={["socials", "youtube"]} label="YouTube"><Input placeholder="https://" /></Form.Item></Col>
          </Row>
        </Card>
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="primary" size="large" icon={<FiSave />} loading={saving} onClick={save}>Save Settings</Button>
      </div>
    </Form>
  );
}
