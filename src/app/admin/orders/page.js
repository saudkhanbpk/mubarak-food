"use client";
import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react"; // ✅ Trash icon
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/order");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  // ✅ Update status in DB
  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();

    if (data.success) {
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    }
  };

  // ✅ Delete order
  const deleteOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const res = await fetch(`/api/order/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      setOrders((prev) => prev.filter((o) => o._id !== id));
    }
  };

  // ✅ Export All Orders to Excel
  const exportToExcel = () => {
    const worksheetData = orders.map((o, index) => ({
      "Order No": index + 1,
      "Name": o.fullName,
      "Email": o.email,
      "Phone": o.phone,
      "Products": o.items.map((item) => `${item.title} (x${item.quantity})`).join(", "),
      "Date": new Date(o.createdAt).toLocaleString(),
      "Status": o.status,
      "Subtotal": o.subtotal,
      "Shipping": o.shippingFees,
      "Other Charges": o.otherCharges,
      "Discount": o.discount,
      "Total": o.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "orders.xlsx");
  };

  return (
    <div className="text-gray-700">
      {/* ✅ Header with Download Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Orders</h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Excel
        </button>
      </div>

      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Order No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={o._id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{o.fullName}</td>
                <td className="p-3">{o.email}</td>
                <td className="p-3">{o.phone}</td>
                <td className="p-3">
                  {o.items && o.items.length > 0 ? o.items[0].title : "N/A"}
                </td>
                <td className="p-3">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedOrder(o)}
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteOrder(o._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal (same as before) */}
     {selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
      <button
        onClick={() => setSelectedOrder(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold mb-4">
        Order Preview - {selectedOrder._id}
      </h2>

      <p><b>Name:</b> {selectedOrder.fullName}</p>
      <p><b>Email:</b> {selectedOrder.email}</p>
      <p><b>Phone:</b> {selectedOrder.phone}</p>
      <p><b>Address:</b> {selectedOrder.dropOffAddress}, {selectedOrder.city}, {selectedOrder.state}</p>
      <p><b>Payment:</b> {selectedOrder.payment}</p>
      <p><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

      <h3 className="font-semibold mt-4 mb-2">Products:</h3>
      <ul className="list-disc list-inside">
        {selectedOrder.items.map((item, idx) => (
          <li key={idx}>
            {item.title} - {item.quantity} × ${item.price}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Summary:</h3>
      <p><b>Subtotal:</b> ${selectedOrder.subtotal}</p>
      <p><b>Shipping Fees:</b> ${selectedOrder.shippingFees}</p>
      <p><b>Other Charges:</b> ${selectedOrder.otherCharges}</p>
      <p><b>Discount:</b> ${selectedOrder.discount}</p>
      <p><b>Total:</b> ${selectedOrder.total}</p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            // ✅ Print
            window.print();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Order
        </button>

        <button
          onClick={async () => {
            // ✅ Download as PDF
            const { jsPDF } = await import("jspdf"); // dynamic import
            const doc = new jsPDF();

            doc.setFontSize(14);
            doc.text(`Order ID: ${selectedOrder._id}`, 10, 10);
            doc.text(`Name: ${selectedOrder.fullName}`, 10, 20);
            doc.text(`Email: ${selectedOrder.email}`, 10, 30);
            doc.text(`Phone: ${selectedOrder.phone}`, 10, 40);
            doc.text(
              `Address: ${selectedOrder.dropOffAddress}, ${selectedOrder.city}, ${selectedOrder.state}`,
              10,
              50
            );
            doc.text(`Payment: ${selectedOrder.payment}`, 10, 60);
            doc.text(
              `Date: ${new Date(selectedOrder.createdAt).toLocaleString()}`,
              10,
              70
            );

            doc.text("Products:", 10, 85);
            selectedOrder.items.forEach((item, i) => {
              doc.text(
                `${item.title} - ${item.quantity} × $${item.price}`,
                15,
                95 + i * 10
              );
            });

            doc.text("Summary:", 10, 120);
            doc.text(`Subtotal: $${selectedOrder.subtotal}`, 15, 130);
            doc.text(`Shipping: $${selectedOrder.shippingFees}`, 15, 140);
            doc.text(`Other Charges: $${selectedOrder.otherCharges}`, 15, 150);
            doc.text(`Discount: $${selectedOrder.discount}`, 15, 160);
            doc.text(`Total: $${selectedOrder.total}`, 15, 170);

            doc.save(`order-${selectedOrder._id}.pdf`);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
