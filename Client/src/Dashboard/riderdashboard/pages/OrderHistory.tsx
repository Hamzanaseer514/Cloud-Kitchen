import { useState } from "react";
import { FaMotorcycle, FaUser, FaShoppingBag } from "react-icons/fa";

// Dummy Orders Data (For Cloud Kitchen)
const incomingOrders = [
  { id: "IN-101", customer: "Ali Raza", rider: "Pending", status: "Preparing", price: "PKR 1,500" },
  { id: "IN-102", customer: "Sara Khan", rider: "Pending", status: "Preparing", price: "PKR 850" },
  { id: "IN-103", customer: "Usman Tariq", rider: "Pending", status: "Pending", price: "PKR 1,200" },
];

const outgoingOrders = [
  { id: "OUT-201", customer: "Zain Ahmed", rider: "Imran Ali", status: "On the Way", price: "PKR 2,000" },
  { id: "OUT-202", customer: "Hina Malik", rider: "Bilal Hussain", status: "Delivered", price: "PKR 1,750" },
  { id: "OUT-203", customer: "Hamza Sheikh", rider: "Asad Khan", status: "On the Way", price: "PKR 900" },
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("incoming");

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-6">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-4 md:mb-6">Cloud Kitchen Orders</h1>

      {/* Tabs Section */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-4 md:mb-6">
        <button
          className={`px-4 py-1 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-lg ${
            activeTab === "incoming" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border border-orange-600"
          }`}
          onClick={() => setActiveTab("incoming")}
        >
          Incoming Orders
        </button>
        <button
          className={`px-4 py-1 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-lg ${
            activeTab === "outgoing" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border border-orange-600"
          }`}
          onClick={() => setActiveTab("outgoing")}
        >
          Outgoing Orders
        </button>
      </div>

      {/* Order List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
          {activeTab === "incoming" ? "Incoming Orders" : "Outgoing Orders"}
        </h2>

        <div className="space-y-3 md:space-y-4">
          {(activeTab === "incoming" ? incomingOrders : outgoingOrders).map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
            >
              <div>
                <p className="text-sm md:text-base font-semibold">
                  <FaShoppingBag className="inline-block mr-1 md:mr-2 text-orange-600" /> Order ID: {order.id}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  <FaUser className="inline-block mr-1 md:mr-2 text-orange-600" /> Customer: {order.customer}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  <span className="font-semibold">Status: </span> {order.status}
                </p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 mt-2 md:mt-0">
                <FaMotorcycle className="text-orange-600 text-lg md:text-2xl" />
                <p className="text-sm md:text-base font-semibold">{order.rider}</p>
              </div>
              <div className="text-sm md:text-lg font-bold text-orange-600 mt-2 md:mt-0">{order.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
