import React, { useEffect, useState } from "react";
import { Check, X, Star, Loader2, ChefHat, Search, RefreshCw, Mail, MessageSquare } from "lucide-react";

function CheckReviewsOfKitchen() {
    const [kitchenData, setKitchenData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedReview, setExpandedReview] = useState(null);

    useEffect(() => {
        fetchKitchens();
    }, []);

    const fetchKitchens = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/kitchen/chkreview/all");
            const data = await res.json();
            setKitchenData(data.kitchen || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch kitchen data.");
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchKitchens();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleApproveChange = async (id, newValue) => {
        setUpdating(id);
        try {
            const response = await fetch(`http://localhost:5000/api/kitchen/updatekitchen/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ approve: newValue }),
            });

            if (!response.ok) throw new Error('Failed to update approval status');

            setKitchenData(prevData =>
                prevData.map(kitchen =>
                    kitchen._id === id ? { ...kitchen, approve: newValue } : kitchen
                )
            );
        } catch (err) {
            console.error('Error updating kitchen approval:', err);
        } finally {
            setUpdating(null);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews?.length) return "N/A";
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const filteredKitchens = kitchenData.filter(kitchen =>
        kitchen.kitchenName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
                    <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-6" />
                    <p className="text-gray-600 text-lg font-medium">Loading kitchen data...</p>
                    <p className="text-gray-400 mt-2">Please wait while we fetch the latest information</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                        <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <X className="w-10 h-10 text-red-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-3">{error}</p>
                        <p className="text-gray-600 mb-8">Unable to load kitchen information. Please try again.</p>
                        <button
                            onClick={fetchKitchens}
                            className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Retry Loading
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* <header className="mb-12 text-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <ChefHat className="w-16 h-16 text-gray-200" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Kitchen Reviews Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and monitor kitchen reviews and approval status
            </p>
          </div>
        </header> */}

                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search kitchens..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                <div className="grid gap-8">
                    {filteredKitchens.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                            <div className="max-w-sm mx-auto">
                                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <X className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Kitchens Found</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? "No kitchens match your search criteria." : "There are currently no kitchens available in the system."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        filteredKitchens.map((kitchen) => (
                            <div key={kitchen._id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="relative group">
                                                <img
                                                    src={kitchen.kitchenLogo || "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"}
                                                    alt={kitchen.kitchenName}
                                                    className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                                />
                                                {updating === kitchen._id && (
                                                    <div className="absolute inset-0 bg-white/75 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-md md:text-2xl font-bold text-gray-900 mb-2">
                                                    {kitchen.kitchenName}
                                                </h2>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                        <span className="font-semibold text-yellow-700">{calculateAverageRating(kitchen.reviews)}</span>
                                                    </div>
                                                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                                                        <span className="font-semibold text-xs sm:text-md text-blue-700">{kitchen.reviews.length} reviews</span>
                                                    </div>
                                                    {Number(calculateAverageRating(kitchen.reviews)) < 3 ? (
                                                        <div className="flex items-center  px-3 py-1  ">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-3 h-3 sm:h-5 sm:w-5 text-red-800 animate-ping"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a1 1 0 011 1v6a1 1 0 01-2 0V5a1 1 0 011-1zm0 10a1 1 0 011 1H9a1 1 0 011-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            {/* <span className="font-semibold text-red-700">Low Rating</span> */}
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            <span className="font-semibold text-green-700"></span>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 sm:ml-auto">
                                            <button
                                                onClick={() => handleApproveChange(kitchen._id, "yes")}
                                                disabled={updating === kitchen._id}
                                                className={`p-3 rounded-xl transition-all duration-200 ${kitchen.approve === "yes"
                                                    ? 'bg-green-800 text-white ring-2 ring-green-600 ring-offset-2'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                                                    }`}
                                            >
                                                <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                                            </button>
                                            <button
                                                onClick={() => handleApproveChange(kitchen._id, "no")}
                                                disabled={updating === kitchen._id}
                                                className={`p-3 rounded-xl transition-all duration-200 ${kitchen.approve === "no"
                                                    ? 'bg-red-800 text-white ring-2 ring-red-600 ring-offset-2'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                                                    }`}
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    {kitchen.reviews.length > 0 ? (
                                        <div className="mt-8 overflow-hidden">
                                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            <th scope="col" className="px-6 py-4 text-left">
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User</span>
                                                                </div>
                                                            </th>
                                                            <th scope="col" className="px-6 py-4 text-left">
                                                                <div className="flex items-center gap-2">
                                                                    <MessageSquare className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</span>
                                                                </div>
                                                            </th>
                                                            <th scope="col" className="px-6 py-4 text-left">
                                                                <div className="flex items-center gap-2">
                                                                    <Star className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</span>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {kitchen.reviews.map((review, index) => (
                                                            <tr
                                                                key={index}
                                                                className="group hover:bg-gray-50 transition-colors cursor-pointer"
                                                                onClick={() => setExpandedReview(expandedReview === index ? null : index)}
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center">
                                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                                                            <Mail className="w-4 h-4 text-gray-500" />
                                                                        </div>
                                                                        <span className="text-sm font-medium text-gray-900">
                                                                            {review.userId?.email || review.userEmail}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className={`text-sm text-gray-600 ${expandedReview === index ? '' : 'line-clamp-2'}`}>
                                                                        {review.comment}
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
                                                                        <Star className="w-4 h-4 text-yellow-500 mr-1.5" />
                                                                        <span className="text-sm font-semibold text-yellow-700">
                                                                            {review.rating}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-6 py-8 text-center text-gray-500 bg-gray-50 rounded-xl">
                                            <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-lg">No reviews available yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckReviewsOfKitchen;