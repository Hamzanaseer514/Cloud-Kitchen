import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* 🚀 Icon or Illustration */}
      <div className="bg-red-500 text-white p-6 rounded-full mb-4 shadow-lg">
        <FaLock size={50} />
      </div>

      {/* ❌ Error Message */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        You do not have permission to access this page.
      </p>

      {/* 🔄 Back to Home */}
      <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md transition">
        Go to Homepage
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
