import React, { useEffect, useState } from "react";

interface Order {
  orderId: string;
  orderStatus: string;
  RiderName: string;
  RiderEmail: string;
  RiderPhone: string;
  RiderLicense: string;
  RiderVehicle: string;
  totalPrice: number;
  deliveryPrice?: number;
}

const ChefDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/getorderswithriderinfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Token agar required hai
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-5xl mx-auto bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Chef Dashboard - Rider Orders 📦
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="relative overflow-x-auto">
            <div className="min-w-full overflow-x-auto max-h-[400px] border border-gray-200 rounded-md">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-800 text-white sticky top-0">
                  <tr>
                    <th className="px-3 py-2">Order ID</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Rider</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Phone</th>
                    <th className="px-3 py-2">License</th>
                    <th className="px-3 py-2">Vehicle</th>
                    <th className="px-3 py-2">Total</th>
                    <th className="px-3 py-2">Delivery</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-100 transition duration-200">
                      <td className="px-3 py-2">{order.orderId.substring(0, 6)}...</td>
                      <td className="px-3 py-2">{order.orderStatus}</td>
                      <td className="px-3 py-2">{order.RiderName}</td>
                      <td className="px-3 py-2">{order.RiderEmail}</td>
                      <td className="px-3 py-2">{order.RiderPhone}</td>
                      <td className="px-3 py-2">{order.RiderLicense}</td>
                      <td className="px-3 py-2">{order.RiderVehicle}</td>
                      <td className="px-3 py-2 text-green-600 font-medium">PKR {order.totalPrice}</td>
                      <td className="px-3 py-2 text-blue-600 font-medium">PKR {order.deliveryPrice || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefDashboard;
