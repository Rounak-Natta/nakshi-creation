import {
  Package,
  FolderTree,
  ShoppingBag,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-5xl">
          Welcome back
        </h1>

        <p className="mt-3 text-muted">
          Manage products, categories,
          orders and customers from a
          single place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
            <Package size={22} />
          </div>

          <h3 className="text-lg font-medium">
            Products
          </h3>

          <p className="mt-2 text-sm text-muted">
            Manage catalog, inventory
            and product details.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
            <FolderTree size={22} />
          </div>

          <h3 className="text-lg font-medium">
            Categories
          </h3>

          <p className="mt-2 text-sm text-muted">
            Organize products with
            parent and child
            categories.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
            <ShoppingBag size={22} />
          </div>

          <h3 className="text-lg font-medium">
            Orders
          </h3>

          <p className="mt-2 text-sm text-muted">
            Track purchases and order
            fulfillment.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
            <Users size={22} />
          </div>

          <h3 className="text-lg font-medium">
            Customers
          </h3>

          <p className="mt-2 text-sm text-muted">
            View customer accounts and
            activity.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/60">
        <h2 className="font-heading text-3xl">
          Nakshi Creations
        </h2>

        <p className="mt-3 max-w-2xl text-muted">
          Your admin dashboard is ready.
          Next steps are connecting real
          products, inventory, orders,
          customers and analytics from
          the database.
        </p>
      </div>
    </div>
  );
}