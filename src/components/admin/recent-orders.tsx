const orders = [
  {
    id: "#1024",
    customer: "Rounak",
    amount: "₹2,999",
    status: "Paid",
  },
  {
    id: "#1025",
    customer: "Reya",
    amount: "₹4,499",
    status: "Pending",
  },
  {
    id: "#1026",
    customer: "Priya",
    amount: "₹1,899",
    status: "Shipped",
  },
];

export function RecentOrders() {
  return (
    <div className="rounded-3xl border border-border bg-white p-6">
      <h3 className="font-heading text-2xl">
        Recent Orders
      </h3>

      <table className="mt-6 w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-4">
              Order
            </th>

            <th className="pb-4">
              Customer
            </th>

            <th className="pb-4">
              Amount
            </th>

            <th className="pb-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-border"
            >
              <td className="py-4">
                {order.id}
              </td>

              <td>{order.customer}</td>

              <td>{order.amount}</td>

              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}