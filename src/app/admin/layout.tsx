import { requireAdmin } from "@/lib/auth/require-admin";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: Props) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}