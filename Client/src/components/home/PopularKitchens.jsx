import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import Button from "../ui/Button";
import { KitchenContext } from "../../context/KitchenContext";

const PopularKitchens = () => {
  const { kitchens, loading, error } = useContext(KitchenContext);

  if (loading) return <p className="text-center">Loading kitchens...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Popular Kitchens
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the best home kitchens operated by talented chefs.
          </p>
        </div>

        {/* Kitchens List (Show Only First 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kitchens.filter(kitchen => kitchen.approve === "yes").slice(0, 6).length > 0 ? (
            kitchens
              .filter(kitchen => kitchen.approve === "yes") 
              .slice(0, 6) // ✅ Sirf first 6 kitchens show hongi
              .map((kitchen) => (
                <Link to={`/kitchen/${kitchen._id}`} key={kitchen._id}> 
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Kitchen Logo */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={kitchen.kitchenLogo || "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?fm=jpg&q=60&w=3000"}
                        alt={kitchen.kitchenName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Kitchen Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {kitchen.kitchenName}
                          </h3>
                          <p className="text-sm text-gray-600">By {kitchen.owner.name}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            kitchen.status === "Open" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {kitchen.status}
                        </div>
                      </div>

                      {/* Rating & Timings */}
                      <div className="flex items-center mt-2 text-gray-600 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1">{kitchen.rating.toFixed(1)}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        {kitchen.openingTime} - {kitchen.closingTime}
                      </div>

                      {/* Specification */}
                      <p className="mt-2 text-gray-700 text-sm">{kitchen.specification}</p>

                      {/* Buttons */}
                      <div className="mt-4 flex justify-between">
                        <Link to={`/kitchen/${kitchen._id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                        <Button size="sm">Order Now</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p className="text-center text-gray-500">No kitchens available.</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/kitchen">
            <Button size="lg">View All Kitchens</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularKitchens;
