import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import StaffManager from "@/components/admin/managers/StaffManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Staff" };

export default function StaffPage() {
  return (
    <>
      <PageHeader title="Staff" subtitle="Manage your team, roles, shifts and payroll." crumbs={[{ label: "Staff" }]} />
      <StaffManager initialData={list("staff")} />
    </>
  );
}
