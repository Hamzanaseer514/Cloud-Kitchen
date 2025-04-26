 import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const queryParams = new URLSearchParams(location.search);
    // const role = queryParams.get('role');  
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role");
    const type = searchParams.get("type"); // 👈 yeh bhi nikaalna


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">

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
                    Thank you for your considering Us.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    {/* Conditional Buttons based on role */}
                    {role === "chef" && type === "menuupload"?  (
                        <button
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
                            onClick={() => navigate("/chef-dashboard/menuupload")}
                        >
                            Go Upload Your Menu
                        </button>
                    ) : role === "chef" && type === "chatbot" ? (
                        <button 
                            className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition"
                            onClick={() => navigate("/chef-dashboard")} // 👈 Direct Chef dashboard
                        >
                            Go to Your Dashboard
                        </button>)
                        : (
                        <button
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccess;
