import { FaTruck, FaClock } from "react-icons/fa";

const DeliveryPartners = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 to-white p-6">
      {/* Title */}
      <h2 className="text-4xl font-bold text-orange-700 mb-4 animate-fade-in">
        Delivery Partners
      </h2>
      <p className="text-gray-600 text-lg mb-8 animate-fade-in-slow">
        Our delivery network is expanding! Stay tuned for updates.
      </p>

      {/* Card Section */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center border border-orange-300 animate-slide-up">
        <FaTruck className="text-orange-500 text-6xl mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-orange-600">Coming Soon</h3>
        <p className="text-gray-700 mt-2">
          We are onboarding reliable delivery partners to serve you better.
        </p>
        <div className="flex justify-center mt-4 space-x-2">
          <FaClock className="text-orange-400 text-xl animate-pulse" />
          <span className="text-gray-600">Stay tuned...</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartners;