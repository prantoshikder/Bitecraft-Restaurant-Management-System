import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import MessagesManager from "@/components/admin/managers/MessagesManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <>
      <PageHeader title="Messages" subtitle="Enquiries submitted through your contact form." crumbs={[{ label: "Messages" }]} />
      <MessagesManager initialData={list("messages")} />
    </>
  );
}
