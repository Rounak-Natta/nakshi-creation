import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminDashboard() {
  const admin =
    await requireAdmin();

  return (
    <div>
      Welcome {admin.name}
    </div>
  );
}