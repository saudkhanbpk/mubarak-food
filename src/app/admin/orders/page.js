export default function OrdersPage() {
  const orders = [
    { id: 1, customer: "Ali", status: "Processing" },
    { id: 2, customer: "Ahmed", status: "Shipped" },
    { id: 3, customer: "Sara", status: "Delivered" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="p-3">{o.id}</td>
              <td className="p-3">{o.customer}</td>
              <td className="p-3">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
