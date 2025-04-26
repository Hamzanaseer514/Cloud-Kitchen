import API_BASE_URL from "../../../utils/config";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51QM8InGrY1JqG9Bl9huwlyiEbRMfBJ1L53aH513B5LKQkT6hFBlrswOpltUyXzn3jZyRpwG633LQHMdbegVFiRui00rtF0Slhe");

// Plans with correct price format (numbers)
const plans = [
  {
    displayName: "Weekly",     // what user sees
    internalName: "Basic",     // what backend/Stripe sees
    price: 1000,
    duration: "Per Week",
    features: ["10 Menus Can be Uploaded", "Priority Support"],
  },
  {
    displayName: "Monthly",
    internalName: "Advance",
    price: 1750,
    duration: "Per Month",
    features: ["All Basic Benefits","AI Chatbot Support",  "30 Menus can Be uploaded"],
  },
  {
    displayName: "Yearly",
    internalName: "Pro",
    price: 5999,
    duration: "Per Year",
    features: ["All Advance Benefits", "Special Offers", "Unlimited Menus Can Be Uploaded"],
  },
];


const Premium: React.FC = () => {
  const handleCheckout = async (planName: string, price: number, type: string) => {
    const stripe = await stripePromise;
    // Make a request to your backend to create the checkout session
    const response = await fetch(`${API_BASE_URL}/api/chef-payment/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planName, price,type }),
    });
    if (!response.ok) {
      console.error("Failed to create checkout session:", await response.text());
      return;
    }

    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  const saveUserSubscription = async (planName: string, price: number) => {
    try {
    const response = await fetch(`${API_BASE_URL}/api/auth/saveUserSubscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ planName, price }),
    });

    if (!response.ok) {
      console.error("Failed to save user subscription:", await response.text());
      return;
    }

    const data = await response.json(); 
    console.log("User subscription saved:", data);
    alert("User subscription saved successfully");
  } catch (error) {
    console.error("Error saving user subscription:", error);
  }
  };
  


  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-orange-50 gap-6 p-4">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`bg-white shadow-lg rounded-2xl p-6 max-w-sm border-t-4 ${
            plan.displayName === "Monthly" ? "border-orange-500 scale-105" : "border-gray-300"
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-bold text-orange-500 text-center">{plan.displayName} Plan</h2>
          <p className="text-gray-600 text-center mt-2">{plan.duration}</p>

          <div className="mt-4">
            <ul className="space-y-3 text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-orange-500 mr-3" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-3xl font-bold text-orange-500">{plan.price} PKR</p> {/* Added "PKR" separately */}
            <button 
              onClick={() => {
                handleCheckout(plan.internalName, plan.price, "chatbot");
                saveUserSubscription(plan.internalName, plan.price);
              }} 
              className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-orange-600 transition">
              Choose Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Premium;
