import { useState, useEffect } from "react";
import { FaUtensils, FaCheckCircle, FaClock, FaAngleDown, FaAngleUp, FaInfoCircle } from "react-icons/fa";

const KitchenOrders = () => {
  // 🛠 Orders state
  const [orders, setOrders] = useState<
    { id: string; dish: string; spiceLevel: string; serving: string; ingredients: string; notes: string; isOpen: boolean; status: string }[]
  >([]);

  // 📌 Fetch Orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kitchen/customize/order", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        const data = await response.json();

        if (data.orders) {
          // Ensure each order has an `isOpen` property for toggling
          const formattedOrders = data.orders.map((order: any) => ({
            id: order._id, // Change `_id` to `id`
            dish: order.dishName, // Fix `dishName`
            spiceLevel: order.spiceLevel,
            serving: order.servingSize, // Fix `servingSize`
            ingredients: order.ingredients.join(", "), // Convert array to string
            notes: order.specialInstructions || "None", // Fix `specialInstructions`
            isOpen: false, // Add isOpen property for dropdown toggle
            status: "Pending", // Default status (since API response doesn't include it)
          }));

          setOrders(formattedOrders);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // 🟠 Toggle Order Details
  const toggleOrder = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isOpen: !order.isOpen } : order
      )
    );
  };

  // ✅ Mark Order as Completed
  const markCompleted = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">🍽️ Kitchen Orders</h2>
      <p className="text-center text-gray-600 mb-6">Manage your orders efficiently</p>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg border border-gray-300 p-5 transition-transform transform hover:scale-[1.02] hover:shadow-xl flex flex-col"
            >
              {/* Order Header (Only Key Info) */}
              <div className="flex justify-between items-center cursor-pointer p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition" onClick={() => toggleOrder(order.id)}>
                <div className="flex items-center space-x-4">
                  <FaUtensils className="text-orange-500 text-lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.dish}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">🔥 Spice:</span> {order.spiceLevel} &nbsp; | &nbsp; 
                      <span className="font-medium">🍽️ Servings:</span> {order.serving}
                    </p>
                  </div>
                </div>
                <span className="text-gray-500 text-xl">{order.isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
              </div>

              {/* Order Details (Dropdown) */}
              {order.isOpen && (
                <div className="mt-3 bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-gray-700 flex items-center">
                    <FaInfoCircle className="mr-2 text-gray-600" />
                    <span className="font-medium text-gray-800">Ingredients:</span> {order.ingredients}
                  </p>

                  <p className="text-gray-700 mt-2">
                    <span className="font-medium text-gray-800">📝 Special Instructions:</span> {order.notes}
                  </p>

                  <p className="text-gray-700 mt-2 flex items-center">
                    <span className="font-medium text-gray-800 mr-2">🕒 Status:</span>
                    <span className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full flex items-center ${
                      order.status === "Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                    }`}>
                      {order.status === "Completed" ? <FaCheckCircle className="mr-1" /> : <FaClock className="mr-1" />}
                      {order.status}
                    </span>
                  </p>

                  {order.status !== "Completed" && (
                    <button
                      className="mt-3 bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition flex items-center"
                      onClick={() => markCompleted(order.id)}
                    >
                      <FaCheckCircle className="mr-2" />
                      Mark as Completed
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenOrders;
