import { StatCard } from "@/components/admin/stat-card";
import { RecentOrders } from "@/components/admin/recent-orders";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Revenue"
          value="₹1.2L"
          subtitle="This month"
        />

        <StatCard
          title="Orders"
          value="146"
          subtitle="Total orders"
        />

        <StatCard
          title="Products"
          value="58"
          subtitle="Published"
        />

        <StatCard
          title="Customers"
          value="420"
          subtitle="Registered users"
        />
      </div>

      <RecentOrders />
    </div>
  );
}