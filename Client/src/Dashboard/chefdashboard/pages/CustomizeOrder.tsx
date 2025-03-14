import { useState } from "react";

const CustomizeOrder = () => {
  // Dummy Orders Data (Can be replaced with API data)
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Ali Khan",
      item: "Grilled Chicken Burger",
      quantity: 2,
      notes: "No mayo, extra cheese",
      isOpen: false,
    },
    {
      id: 2,
      customer: "Sarah Ahmed",
      item: "Spicy Chicken Pizza",
      quantity: 1,
      notes: "Extra spicy, no onions",
      isOpen: false,
    },
    {
      id: 3,
      customer: "Usman Tariq",
      item: "Pasta Alfredo",
      quantity: 3,
      notes: "Add mushrooms, light sauce",
      isOpen: false,
    },
  ]);

  // Toggle Order Details
  const toggleOrder = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isOpen: !order.isOpen } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg shadow-lg">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-orange-700 text-center mb-4">
        Customized Orders
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Click on an order to view details
      </p>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg border border-orange-300 p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Order Header */}
            <div
              className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-orange-50"
              onClick={() => toggleOrder(order.id)}
            >
              <h3 className="text-lg font-semibold text-orange-600">
                {order.customer} - {order.item} ({order.quantity})
              </h3>
              <span className="text-gray-500 text-xl">
                {order.isOpen ? "▲" : "▼"}
              </span>
            </div>

            {/* Order Details (Dropdown) */}
            {order.isOpen && (
              <div className="mt-3 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-800">Special Instructions:</span>{" "}
                  {order.notes || "None"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizeOrder;