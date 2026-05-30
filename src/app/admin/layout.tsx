import { requireAdmin } from "@/lib/auth/require-admin";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: Props) {
  await requireAdmin();

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}