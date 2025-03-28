import { useState, useEffect } from "react";
import {
  ChefHat,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ChevronDown,
  ClipboardList,
  AlertCircle,
  Timer,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

const statusConfig = {
  Pending: {
    icon: Clock,
    class: "bg-orange-500 text-white border-orange-600",
    iconClass: "text-white",
    badge: "bg-orange-100 text-orange-700",
    description: "Order received, waiting for confirmation"
  },
  Accepted: {
    icon: CheckCircle2,
    class: "bg-blue-500 text-white border-blue-600",  // 🔵 Blue Color
    iconClass: "text-white",
    badge: "bg-blue-100 text-blue-700",
    description: "Order confirmed by kitchen"
  },
  Preparing: {
    icon: ChefHat,
    class: "bg-purple-500 text-white border-purple-600", // 🟣 Purple Color
    iconClass: "text-white",
    badge: "bg-purple-100 text-purple-700",
    description: "Food is being prepared"
  },
  "On The Way": {
    icon: Truck,
    class: "bg-teal-500 text-white border-teal-600", // 🟢 Teal Color
    iconClass: "text-white",
    badge: "bg-teal-100 text-teal-700",
    description: "Order out for delivery"
  },
  Delivered: {
    icon: CheckCircle2,
    class: "bg-green-500 text-white border-green-600",
    iconClass: "text-white",
    badge: "bg-green-100 text-green-700",
    description: "Order successfully delivered"
  },
  Cancelled: {
    icon: XCircle,
    class: "bg-red-500 text-white border-red-600",
    iconClass: "text-white",
    badge: "bg-red-100 text-red-700",
    description: "Order has been cancelled"
  }
};

interface Order {
  _id: string;
  userId: string;
  email: string;
  items: { name: string; quantity: number; price: number,image:string }[];
  totalQuantity: number;
  totalPrice: number;
  status: keyof typeof statusConfig;
  orderDate: string;
  orderTime: string;
  notes?: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<keyof typeof statusConfig | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("http://localhost:5000/api/kitchen/user/allorders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const data = await response.json();
  
      if (data.orders) {
        // Orders ko bina kisi grouping ke direct set kar rahe hain
        const allOrders: Order[] = data.orders.map((order: any) => ({
          _id:order._id,
          userId: order.userId._id,
          email: order.userId.email,
          items: order.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            image:item.image,
            price: item.price,
          })),
          totalQuantity: order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
          totalPrice: order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
          status: order.status,
          orderDate: new Date(order.createdAt).toLocaleDateString(),
          orderTime: new Date(order.createdAt).toLocaleTimeString(),
          notes: order.notes || "None",
        }));
  
        setOrders(allOrders); // Directly orders ko set kar rahe hain
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);



  const handleStatusChange = async (orderId: string, newStatus: keyof typeof statusConfig) => {
    console.log(orderId, newStatus)
    try {
      const response = await fetch(`http://localhost:5000/api/kitchen/user/updateorderstatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus , id:orderId}),
      });

      if (response.ok) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
              order._id === orderId ? { ...order, status: newStatus } : order
          )
      );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = orders
    .filter(order => activeFilter === "all" || order.status === activeFilter)
    .filter(order =>
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const OrderCard = ({ order }: { order: Order }) => {
    const StatusIcon = statusConfig[order.status].icon;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
        <div className="border-b border-gray-50 bg-gray-50/50 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="md:text-sm text-xs lg:text-lg font-semibold text-gray-900">{order.email}</h3>
                <p className="md:text-sm text-xs text-gray-500">Order #{order.userId.slice(-6)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className={`px-3 py-1 hidden md:block rounded-full ${statusConfig[order.status].badge}`}>
                <div className="flex  items-center space-x-1">
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{order.status}
                   
                  </span>
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value as keyof typeof statusConfig)}
                  className={`appearance-none ${statusConfig[order.status].class} pl-9 pr-8 py-2 rounded-lg border font-medium text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
                >
                  {Object.keys(statusConfig).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <StatusIcon className={`absolute left-2.5 top-2.5 w-4 h-4 ${statusConfig[order.status].iconClass}`} />
                <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ClipboardList className="w-4 h-4 text-orange-500" />
                <span>Order Items</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between space-x-4 text-sm p-2 border-b">
                    {/* Image Wrapper */}
                    <div className="flex items-center space-x-3 flex-1">
                      <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" />
                      <span className="text-gray-600 text-xs sm:text-sm">{item.name} × {item.quantity}</span>
                    </div>
                  
                    {/* Price */}
                    <span className="font-medium text-xs sm:text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                  
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-orange-100">
                  <div className="flex justify-between items-center">
                    <div className="text-xs sm:text-sm text-gray-600">
                      Total Items: <span className="font-medium">{order.totalQuantity}</span>
                    </div>
                    <div className="md:text-md text-sm lg:text-lg font-semibold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-orange-500" />
              <span>Ordered on {order.orderDate} at {order.orderTime}</span>
            </div>
          </div>

          {order.notes && order.notes !== "None" && (
            <div className="mt-4">
              <div className="flex items-start space-x-2 bg-orange-50 p-4 rounded-lg border border-orange-100">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions</p>
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
              <p className="text-sm text-gray-500">Manage and track all kitchen orders</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchOrders}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  {orders.length} Active Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-orange-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  All Orders
                </button>
                {Object.entries(statusConfig).map(([status, config]) => {
                  const StatusIcon = config.icon;
                  return (
                    <button
                      key={status}
                      onClick={() => setActiveFilter(status as keyof typeof statusConfig)}
                      className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-2 transition-colors ${activeFilter === status ? "bg-orange-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <StatusIcon className={`w-4 h-4 ${activeFilter === status ? "text-white" : "text-orange-500"}`} />
                      <span>{status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by email or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <ClipboardList className="w-12 h-12 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {activeFilter === "all"
                ? "New orders will appear here"
                : `No ${activeFilter.toLowerCase()} orders at the moment`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={`${order.userId}_${order.orderDate}_${order.orderTime}`} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;