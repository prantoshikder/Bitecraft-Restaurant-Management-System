import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, decodeSession } from "@/lib/auth";
import AdminProviders from "@/components/admin/AdminProviders";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const user = decodeSession(store.get(AUTH_COOKIE)?.value);
  if (!user) redirect("/login");

  return (
    <AdminProviders>
      <AdminShell user={user}>{children}</AdminShell>
    </AdminProviders>
  );
}
