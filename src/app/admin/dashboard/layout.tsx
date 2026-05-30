import Link from "next/link";

import { requireAdmin } from "@/lib/auth/require-admin";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: Props) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/admin/dashboard"
            className="text-lg font-semibold"
          >
            Admin Panel
          </Link>

          <form
            action="/api/auth/logout"
            method="POST"
          >
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}