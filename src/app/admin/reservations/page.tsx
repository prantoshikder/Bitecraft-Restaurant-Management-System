import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import ReservationsManager from "@/components/admin/managers/ReservationsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Reservations" };

export default function ReservationsPage() {
  const tables = list("tables").map((t) => ({ id: t.id, number: t.number, capacity: t.capacity }));
  return (
    <>
      <PageHeader title="Reservations" subtitle="Confirm bookings and assign tables to your guests." crumbs={[{ label: "Reservations" }]} />
      <ReservationsManager initialData={list("reservations")} tables={tables} />
    </>
  );
}
