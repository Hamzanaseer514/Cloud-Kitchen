import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Premium: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100 p-6">
      {/* Header Section */}
      <h2 className="text-4xl font-extrabold text-orange-600 mb-6 drop-shadow-md">
        Chef Premium Plans
      </h2>
      <p className="text-gray-700 text-lg mb-8 text-center">
        Unlock exclusive features to boost your Cloud Kitchen business!
      </p>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weekly Plan */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative bg-white shadow-xl rounded-2xl p-8 border border-orange-300 hover:shadow-2xl transition-all"
        >
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Best for Starters
          </span>
          <h3 className="text-2xl font-semibold text-orange-600">Weekly Plan</h3>
          <p className="text-lg text-gray-700">Perfect for new chefs</p>
          <p className="text-5xl font-bold text-orange-600 mt-4">$15 <span className="text-lg">/ week</span></p>

          <ul className="text-gray-600 space-y-2 text-left mt-4">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> 5 Featured Listings</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> More Orders & Visibility</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Priority Support</li>
          </ul>

          <button className="mt-6 w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-all shadow-md">
            Choose Weekly Plan
          </button>
        </motion.div>

        {/* Monthly Plan (Highlighted) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative bg-orange-500 text-white shadow-2xl rounded-2xl p-8 border border-orange-700 hover:shadow-xl transition-all"
        >
          <span className="absolute top-3 right-3 bg-white text-orange-500 text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
          <h3 className="text-2xl font-semibold">Monthly Plan</h3>
          <p className="text-lg">For professional chefs</p>
          <p className="text-5xl font-bold mt-4">$50 <span className="text-lg">/ month</span></p>

          <ul className="space-y-2 text-left mt-4">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-white" /> Unlimited Listings</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-white" /> Top Search Priority</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-white" /> 24/7 Premium Support</li>
          </ul>

          <button className="mt-6 w-full bg-white text-orange-500 font-semibold px-6 py-3 rounded-lg hover:bg-orange-100 transition-all shadow-md">
            Choose Monthly Plan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;
