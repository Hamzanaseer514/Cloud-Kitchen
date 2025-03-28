import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                {/* Success Icon (SVG) */}
                <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m0 0a9 9 0 11-4.5 7.794M12 3v0"
                    ></path>
                </svg>

                <h2 className="text-2xl font-bold text-gray-800">
                    🎉 Payment Successful! 🎉
                </h2>
                <p className="text-gray-600 mt-2">
                    Thank you for your order. Your delicious food is being prepared!
                </p>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
                    <p className="text-sm text-gray-600">Order #123456</p>
                    <p className="text-sm text-gray-600">Estimated Delivery: 30-40 mins</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                    {/* <button 
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
                        onClick={() => navigate("/orders")}
                    >
                        View My Orders
                    </button> */}
                    <button 
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
