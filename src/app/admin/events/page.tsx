import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import EventsManager from "@/components/admin/managers/EventsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Events" };

export default function EventsAdminPage() {
  return (
    <>
      <PageHeader title="Events" subtitle="Create special events and ticketed experiences." crumbs={[{ label: "Events" }]} />
      <EventsManager initialData={list("events")} />
    </>
  );
}
