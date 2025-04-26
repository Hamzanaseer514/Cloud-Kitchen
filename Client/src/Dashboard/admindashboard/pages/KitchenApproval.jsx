import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, AlertCircle, Clock } from 'lucide-react';
import API_BASE_URL from "../../../utils/config";


const API_URL = `${API_BASE_URL}/api/kitchen/all`;

export function KitchenApproval() {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setKitchens(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching kitchens:", error);
        setError("Failed to load kitchen data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchKitchens();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const kitchen = kitchens.find(k => k._id === id);
      const newStatus = kitchen.approve.trim().toLowerCase() === "yes" ? "no" : "yes";
  
      // ✅ Optimistic UI Update
      setKitchens(kitchens.map(k => 
        k._id === id ? { ...k, approve: newStatus } : k
      ));
  
      // ✅ Backend API Call
      const response = await fetch(`${API_BASE_URL}/api/kitchen/updatekitchen/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ approve: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update kitchen status");
      }
  
    } catch (error) {
      console.error("Error updating status:", error);
  
      // ❌ Revert UI on Failure
      setKitchens(prevKitchens => [...prevKitchens]);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading kitchens...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Kitchen
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Preview
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Operating Hours
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {kitchens.map((kitchen) => (
              <tr key={kitchen._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">{kitchen.kitchenName}</div>
                      <div className="text-gray-500 text-sm">ID: {kitchen._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                
                <td className="whitespace-nowrap px-3 py-4">
                  <div className="h-16 w-24 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={`${API_BASE_URL}/uploads/${kitchen.kitchenLogo}`}
                      alt={kitchen.kitchenName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=500';
                      }}
                    />
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    kitchen.approve.trim().toLowerCase() === "yes"
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {kitchen.approve.trim().toLowerCase() === "yes" ? "Approved" : "Not Approved"}
                  </span>
                </td>

                {/* Time Section with Clock Icon */}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{kitchen.openingTime} - {kitchen.closingTime}</span>
                  </div>
                </td>

                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => toggleStatus(kitchen._id)}
                    className={`inline-flex items-center justify-center p-2 rounded-full ${
                      kitchen.approve.trim().toLowerCase() === "yes"
                        ? 'text-green-600 bg-green-100 hover:bg-green-200'
                        : 'text-red-600 bg-red-100 hover:bg-red-200'
                    } transition-colors duration-200`}
                    title={kitchen.approve.trim().toLowerCase() === "yes" ? "Revoke Approval" : "Approve Kitchen"}
                  >
                    {kitchen.approve.trim().toLowerCase() === "yes" ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KitchenApproval;
