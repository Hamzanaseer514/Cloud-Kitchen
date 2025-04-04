import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/orders/available-for-rider";
const ACCEPT_ORDER_URL = "http://localhost:5000/api/orders/accept";
const UPDATE_STATUS_URL = "http://localhost:5000/api/orders/updateorderstatus";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [accepting, setAccepting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch Orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to load orders!");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Accept Order Function
  const handleAcceptOrder = async (orderId) => {
    setAccepting(true);
    try {
      const response = await fetch(`${ACCEPT_ORDER_URL}/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to accept order");
      }

      const data = await response.json();

      // Update Local State
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, RiderAcceptedOrder: true } : order
        )
      );

      setSelectedOrder(null);
    } catch (err) {
      console.error("Error accepting order:", err);
    } finally {
      setAccepting(false);
    }
  };

  // Update Order Status Function
  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(`${UPDATE_STATUS_URL}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json()
      if (data.message === "You are not authorized to update this order!") {
        return alert(data.message)
      }

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update Local State
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      setSelectedOrder(null);
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Filter orders based on status and RiderAcceptedOrder
  const filteredOrders = orders.filter(order =>
    order.status === "On The Way"
  );
  console.log(filteredOrders)

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-6">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-6">
        Cloud Kitchen Orders
      </h1>

      {/* Order List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        {loading && <p className="text-center text-gray-600">Loading orders...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div>
                  <p className="text-sm font-semibold">
                    ID: {order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Address :</span> {order.address.slice(0, 10)}... <br />
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Delivery Amount :</span> {order.deliveryPrice} PKR
                  </p>
                </div>
                <div>
                  
                <div className="text-sm font-bold text-orange-600">
                PKR {order.totalPrice}
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-50 flex justify-center items-center p-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
            {/* Close Button */}
            {/* Close Button */}
            <button
              className=" relative left-[28rem] -top-5 text-black hover:text-gray-800 text-lg font-semibold"
              onClick={() => setSelectedOrder(null)}
            >
              ✖ 
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Order Details</h2>

            {/* Order Info */}
            <div className="space-y-4">
              {/* <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Order ID:</span>
                <span className="text-sm text-gray-800">{selectedOrder._id}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm text-gray-800">{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Total Price:</span>
                <span className="text-sm text-gray-800">PKR {selectedOrder.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">After delivery Price:</span>
                <span className="text-sm text-gray-800">PKR {(selectedOrder.totalPrice - selectedOrder.deliveryPrice).toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Address:</span>
                <span className="text-sm text-gray-800">{selectedOrder.address}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="text-sm text-gray-800">{selectedOrder.userId?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Username:</span>
                <span className="text-sm text-gray-800">{selectedOrder.userId?.fullname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Payment Status:</span>
                <span className="text-sm text-gray-800">{selectedOrder.paymentStatus}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Payment Type:</span>
                <span className="text-sm text-gray-800">{selectedOrder.paymentType}</span>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-4">
              {/* Mark as Delivered Button */}
              {selectedOrder.RiderAcceptedOrder && (
                <button
                  className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 disabled:bg-gray-400"
                  onClick={() => handleUpdateStatus(selectedOrder._id, "Delivered")}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Updating..." : "Mark as Delivered"}
                </button>
              )}

              {/* Accept Order Button */}
              {!selectedOrder.RiderAcceptedOrder && (
                <button
                  className="w-full bg-gray-600 text-white py-3 rounded-md font-medium text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 disabled:bg-gray-400"
                  onClick={() => handleAcceptOrder(selectedOrder._id)}
                  disabled={accepting}
                >
                  {accepting ? "Accepting..." : "Accept Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default OrderHistory;