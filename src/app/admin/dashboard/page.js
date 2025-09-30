export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Revenue Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$12,340</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold mt-2">240</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
      </div>

      {/* Orders Status */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Orders Summary</h2>
        <ul className="space-y-2">
          <li>Processing: 50</li>
          <li>Shipped: 120</li>
          <li>Delivered: 70</li>
        </ul>
      </div>
    </div>
  );
}
