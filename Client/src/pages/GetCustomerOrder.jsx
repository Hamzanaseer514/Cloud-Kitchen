import { useEffect, useState } from "react";

const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Accepted: "bg-blue-500 text-white",
  Preparing: "bg-purple-500 text-white",
  "On The Way": "bg-green-500 text-white",
  Delivered: "bg-gray-500 text-white",
};

const GetCustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kitchen/user/getAllOrder",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-6 shadow-md rounded-lg mb-6">
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </h3>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[order.status] || "bg-gray-300 text-black"}`}>
                {order.status}
              </span>
            </div>

            {/* Order Details */}
            <p className="text-gray-500 text-sm mt-2">
              Payment: <span className="font-medium">{order.paymentType}</span> ({order.paymentStatus})
            </p>
            <p className="font-semibold text-xl text-orange-600 mt-2">
              Total: ${order.totalPrice}
            </p>

            {/* Order Items */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 mb-3 border p-3 rounded-lg shadow-sm bg-gray-50">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <p className="text-md font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetCustomerOrder;
