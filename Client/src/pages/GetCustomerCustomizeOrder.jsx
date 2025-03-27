import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetCustomerCustomizeOrder = () => {
    const { id } = useParams();  // Getting `id` from URL
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/kitchen/customize/finduserorder", {
                    method: "POST",  
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ kitchenId: id }) 
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.error || "Failed to fetch orders");

                setOrders(data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomOrders();
    }, [id]);  

    // ✅ **Function to get colors based on status**
    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-gray-200 text-gray-800 shadow-gray-300 hover:bg-gray-300";
            case "Accepted":
                return "bg-blue-200 text-blue-800 shadow-blue-300 hover:bg-blue-300";
            case "Preparing":
                return "bg-yellow-200 text-yellow-800 shadow-yellow-300 hover:bg-yellow-300";
            case "On The Way":
                return "bg-purple-200 text-purple-800 shadow-purple-300 hover:bg-purple-300";
            case "Delivered":
                return "bg-green-200 text-green-800 shadow-green-300 hover:bg-green-300";
            case "Cancelled":
                return "bg-red-200 text-red-800 shadow-red-300 hover:bg-red-300";
            default:
                return "bg-gray-200 text-gray-800 shadow-gray-300";
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-wide">
                🍽️ Custom Orders
            </h2>

            {loading && <p className="text-gray-500 text-center">Loading orders...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid gap-8 md:grid-cols-2">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="relative p-6 border border-gray-200 rounded-3xl shadow-2xl bg-white backdrop-blur-lg transition-transform transform hover:scale-[1.03] hover:shadow-3xl overflow-hidden">
                            
                            {/* Soft Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 opacity-30 blur-xl"></div>

                            {/* Status Badge - Dynamic Colors */}
                            <span className={`absolute top-4 right-4 px-4 py-2 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 ${getStatusStyle(order.status)}`}>
                                {order.status}
                            </span>

                            {/* Order Details */}
                            <h3 className="text-2xl font-bold text-orange-700 mb-3">{order.dishName}</h3>
                            <p className="text-gray-800 mb-1 text-lg">
                                <span className="font-semibold">🌶️ Spice Level:</span> {order.spiceLevel}
                            </p>

                            {/* Date with Icon */}
                            <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
                                📅 {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-gray-500 text-center text-lg">No custom orders found.</p>
                )}
            </div>
        </div>
    );
};

export default GetCustomerCustomizeOrder;
