import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CustomizeFood: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get `id` from URL params

  const [formData, setFormData] = useState({
    dishName: "",
    spiceLevel: "Mild",
    cookingMethod: "N/A",
    servingSize: "Single",
    ingredients: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({
    dishName: "",
    ingredients: "",
    specialInstructions: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Remove error when user types
  };

  // Handle toggle button selections
  const handleSelection = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ Validation Function
  const validateForm = () => {
    let valid = true;
    let newErrors = { dishName: "", ingredients: "", specialInstructions: "" };

    if (!formData.dishName.trim()) {
      newErrors.dishName = "Dish name is required";
      valid = false;
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
      valid = false;
    }
    if (!formData.specialInstructions.trim()) {
      newErrors.specialInstructions = "Special instructions are required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ API Call Function with Validation
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const apiUrl = "http://localhost:5000/api/kitchen/addcustomorder"; // API endpoint

    const requestBody = {
      ...formData,
      kitchenId: id, // Assign `id` to `kitchenId` in request body
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send token in headers
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Order Submitted Successfully!");
        navigate(`/kitchen/${id}`); // Go back to kitchen page
      } else {
        alert("Failed to submit order!");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6"
    >
      <div className="w-full max-w-5xl bg-orange-50 shadow-lg rounded-lg p-4 sm:p-6 border border-orange-300 mb-3 mt-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4 sm:mb-6 text-center">Customize Your Order</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Dish Name */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Dish Name</label>
            <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              placeholder="Enter dish name"
              className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.dishName && <p className="text-red-500 text-xs mt-1">{errors.dishName}</p>}
          </div>

          {/* Spice Level Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-2">Spice Level</label>
            <div className="flex flex-wrap gap-2">
              {["Mild", "Medium", "Spicy", "Extra Spicy"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleSelection("spiceLevel", level)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm font-semibold transition ${
                    formData.spiceLevel === level ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking Method Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-2">Cooking Method</label>
            <div className="flex flex-wrap gap-2">
              {["Grilled", "Fried", "Boiled", "Baked","N/A"].map((method) => (
                <button
                  key={method}
                  onClick={() => handleSelection("cookingMethod", method)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm font-semibold transition ${
                    formData.cookingMethod === method ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Serving Size Selection */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600 block mb-2">Serving Size</label>
            <div className="flex flex-wrap gap-2">
              {["Single", "Family", "Party Size"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSelection("servingSize", size)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm font-semibold transition ${
                    formData.servingSize === size ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Optional add-ons (comma-separated)"
              className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
          </div>

          {/* Special Instructions */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Special Instructions</label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="Any special instructions"
              className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              rows={3}
              style={{ resize: "none" }}
            ></textarea>
            {errors.specialInstructions && <p className="text-red-500 text-xs mt-1">{errors.specialInstructions}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 gap-2 sm:gap-0">
          <button className="bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 rounded-md hover:bg-gray-400 transition" onClick={() => navigate(`/kitchen/${id}`)}>Cancel</button>
          <button className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-md text-lg font-semibold hover:bg-orange-600 transition" onClick={handleSubmit}>Submit Order</button>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomizeFood;
