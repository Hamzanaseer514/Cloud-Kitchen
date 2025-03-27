import { useState, useEffect } from "react";
import {
  ChefHat,
  Flame,
  Users,
  ClipboardList,
  AlertCircle,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ChevronDown,
  Utensils,
  Timer
} from "lucide-react";

const statusConfig = {
  Pending: {
    icon: Clock,
    class: "bg-orange-500 text-white border-orange-600",
    iconClass: "text-white",
    badge: "bg-orange-100 text-orange-700"
  },
  Accepted: {
    icon: CheckCircle2,
    class: "bg-orange-500 text-white border-orange-600",
    iconClass: "text-white",
    badge: "bg-orange-100 text-orange-700"
  },
  Preparing: {
    icon: ChefHat,
    class: "bg-orange-500 text-white border-orange-600",
    iconClass: "text-white",
    badge: "bg-orange-100 text-orange-700"
  },
  "On The Way": {
    icon: Truck,
    class: "bg-orange-500 text-white border-orange-600",
    iconClass: "text-white",
    badge: "bg-orange-100 text-orange-700"
  },
  Delivered: {
    icon: CheckCircle2,
    class: "bg-green-500 text-white border-green-600",
    iconClass: "text-white",
    badge: "bg-green-100 text-green-700"
  },
  Cancelled: {
    icon: XCircle,
    class: "bg-red-500 text-white border-red-600",
    iconClass: "text-white",
    badge: "bg-red-100 text-red-700"
  }
};

const prepTimeOptions = [
  "15-20 mins",
  "20-25 mins",
  "25-30 mins",
  "30-35 mins",
  "35-40 mins",
  "40-45 mins"
];

interface Order {
  id: string;
  dish: string;
  spiceLevel: string;
  serving: string;
  ingredients: string;
  notes: string;
  status: keyof typeof statusConfig;
  prepTime: string;
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<keyof typeof statusConfig | 'all'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kitchen/customize/order", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        const data = await response.json();

        if (data.orders) {
          setOrders(data.orders.map((order: any) => ({
            id: order._id,
            dish: order.dishName,
            spiceLevel: order.spiceLevel,
            serving: order.servingSize,
            ingredients: order.ingredients.join(", "),
            notes: order.specialInstructions || "None",
            status: order.status,
            prepTime: order.prepTime || "25-30 mins",
          })));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    alert(id)
    try {
      const response = await fetch("http://localhost:5000/api/kitchen/customize/updateorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, ...updates } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(order => order.status === activeFilter);

  const OrderCard = ({ order }: { order: Order }) => {
    const StatusIcon = statusConfig[order.status].icon;

    return (
      <div className="bg-white brounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
        <div className="border-b border-gray-50 bg-gray-50/50 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{order.dish}</h3>
                <p className="text-sm text-gray-500">Order #{order.id.slice(-6)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className={`px-3 py-1 rounded-full ${statusConfig[order.status].badge}`}>
                <div className="flex items-center space-x-1">
                  <StatusIcon className={`w-3.5 h-3.5`} />
                  <span className="text-xs font-medium">{order.status}</span>
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <select
                  value={order.status}
                  onChange={(e) => updateOrder(order.id, { status: e.target.value as keyof typeof statusConfig })}
                  className={`appearance-none ${statusConfig[order.status].class} pl-9 pr-8 py-2 rounded-lg border font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Spice Level</span>
              </div>
              <p className="font-medium text-gray-900">{order.spiceLevel}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Serving Size</span>
              </div>
              <p className="font-medium text-gray-900">{order.serving}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Timer className="w-4 h-4 text-orange-500" />
                <span>Prep Time</span>
              </div>
              <select
                value={order.prepTime}
                onChange={(e) => updateOrder(order.id, { prepTime: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-none p-0 focus:ring-0 text-sm cursor-pointer hover:text-orange-600 transition-colors"
              >
                {prepTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ClipboardList className="w-4 h-4 text-orange-500" />
                <span>Ingredients</span>
              </div>
              <div className="flex flex-wrap gap-2 ">
                {order.ingredients.split(",").map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-700
 rounded-full"
                  >
                    {ingredient.trim()}
                  </span>
                ))}
              </div>
            </div>

          </div>


          {order.notes !== "None" && (
            <div className="mt-6">
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
    <div className="min-h-screen bg-gray-50/50 ">
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
          <div className="flex items-center">
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

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            All Orders
          </button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status as keyof typeof statusConfig)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${activeFilter === status
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              <config.icon className={`w-4 h-4 ${activeFilter === status ? 'text-white' : 'text-orange-500'}`} />
              <span>{status}</span>
            </button>
          ))}
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
              {activeFilter === 'all'
                ? 'New orders will appear here'
                : `No ${activeFilter.toLowerCase()} orders at the moment`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;