import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import SettingsManager from "@/components/admin/managers/SettingsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  const settings = list("settings")[0];
  return (
    <>
      <PageHeader title="Settings" subtitle="Configure your restaurant profile and preferences." crumbs={[{ label: "Settings" }]} />
      <SettingsManager initial={settings} />
    </>
  );
}
