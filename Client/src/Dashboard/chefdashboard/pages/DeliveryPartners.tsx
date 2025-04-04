import React, { useEffect, useState } from "react";
import { Package2, Truck, AlertCircle, Loader2, Phone, Mail, Car, CreditCard, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

interface OrderItem {
  _id: string;
  kitchenId: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  orderItems: OrderItem[];
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
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/getorderswithriderinfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const getStatusColor = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      pending: "bg-amber-100 text-amber-800 border border-amber-200",
      "On The Way": "bg-blue-100 text-blue-800 border border-blue-200",
      delivered: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      cancelled: "bg-rose-100 text-rose-800 border border-rose-200",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (expandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId);
    } else {
      newExpandedOrders.add(orderId);
    }
    setExpandedOrders(newExpandedOrders);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-3 rounded-xl shadow-lg shadow-purple-200">
                <Package2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
                  Chef Dashboard
                </h1>
                <p className="text-sm text-purple-600 mt-1 font-medium">
                  Manage your delivery orders and track items
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg shadow-purple-100 border border-purple-100 flex items-center gap-3">
                <Truck className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">
                  {orders.length} Active Deliveries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
              <p className="text-sm text-purple-600 font-medium">Loading orders...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="bg-rose-50 px-6 py-4 rounded-xl flex items-center gap-3 text-rose-700 border border-rose-200">
              <AlertCircle className="h-6 w-6" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-xl shadow-lg shadow-purple-100 border border-purple-100 overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-purple-100">
                <div 
                  className="px-6 py-4 cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => toggleOrderExpansion(order.orderId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm text-purple-900 font-bold">
                          #{order.orderId.substring(0, 8)}
                        </span>
                        <span className={`mt-1.5 inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="hidden sm:block border-l-2 border-purple-100 h-12 mx-2"></div>
                      <div className="hidden sm:flex flex-col">
                        <div className="text-sm font-semibold text-purple-900">{order.RiderName}</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Car className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-purple-600">{order.RiderVehicle}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-bold text-purple-900">
                          PKR {order.totalPrice.toLocaleString()}
                        </div>
                        {order.deliveryPrice && (
                          <div className="text-xs font-medium text-purple-600 mt-1">
                            +PKR {order.deliveryPrice.toLocaleString()} delivery
                          </div>
                        )}
                      </div>
                      {expandedOrders.has(order.orderId) ? (
                        <ChevronUp className="h-5 w-5 text-purple-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-purple-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedOrders.has(order.orderId) && (
                  <div className="border-t border-purple-100">
                    <div className="px-6 py-4 bg-purple-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-semibold text-purple-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Order Items
                          </h3>
                          <div className="space-y-3">
                            {order.orderItems.map((item) => (
                              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                                <div className="h-20 w-20 flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="h-full w-full object-cover rounded-lg shadow-sm"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-base font-semibold text-purple-900">{item.name}</p>
                                  <p className="text-sm text-purple-600 mt-1">{item.category}</p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-md">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="text-xs font-bold text-purple-900">
                                      PKR {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-900 mb-4 flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Rider Details
                          </h3>
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-purple-100 space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <Mail className="h-5 w-5 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">{order.RiderEmail}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <Phone className="h-5 w-5 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">{order.RiderPhone}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <Car className="h-5 w-5 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">
                                {order.RiderVehicle} - License: {order.RiderLicense}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefDashboard;