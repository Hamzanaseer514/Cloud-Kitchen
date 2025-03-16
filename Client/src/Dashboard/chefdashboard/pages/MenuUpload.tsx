import { useState } from "react";

const MenuUpload = () => {
  const [formData, setFormData] = useState({
    menuName: "",
    category: "",
    description: "",
    price: "",
    ingredients: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // ✅ Trim and validate ingredients field
    // const formattedIngredients = formData.ingredients
    //   .split(",") // Comma se split karna
    //   .map((item) => item.trim()) // Extra spaces remove karna
    //   .filter((item) => item !== ""); // Empty values remove karna
  
    // if (formattedIngredients.length === 0) {
    //   alert("Please enter at least one ingredient!");
    //   return;
    // }
  
    // ✅ Validation Check for Other Fields
    if (!formData.menuName.trim()) {
      alert("Menu name is required!");
      return;
    }
    if (!formData.category) {
      alert("Please select a category!");
      return;
    }
    if (!formData.price) {
      alert("Price is required!");
      return;
    }
    if (!formData.image) {
      alert("Please upload an image!");
      return;
    }
  
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("User not authenticated!");
        return;
      }
  
      // ✅ Step 1: Upload Image and Get URL
      const imageFormData = new FormData();
      imageFormData.append("image", formData.image);
  
      const imageUploadResponse = await fetch("http://localhost:5000/uploadimage", {
        method: "POST",
        body: imageFormData,
      });
  
      const imageResponse = await imageUploadResponse.json();
      const imageUrl = imageResponse.image_url;
  
      // ✅ Step 2: Send Menu Data to Backend
      const menuData = {
        name: formData.menuName,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        ingredients: formData.ingredients, // Formatted ingredients
        image: imageUrl,
      };

      console.log(menuData);
  
      const response = await fetch("http://localhost:5000/api/kitchen/addmenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add menu");
      }
  
      alert("Menu added successfully!");
      setFormData({
        menuName: "",
        category: "",
        description: "",
        price: "",
        ingredients: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Failed to add menu!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-10 border-t-4 border-orange-500">
      <h2 className="text-3xl font-bold text-orange-600 text-center">Create a New Menu</h2>
      <p className="text-center text-gray-600 mt-2">Add a delicious menu for your customers</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Menu Name *</label>
          <input
            name="menuName"
            value={formData.menuName}
            onChange={handleChange}
            type="text"
            placeholder="Enter menu name"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500 bg-white"
            required
          >
            <option value="">Select category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price (PKR) *</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter price"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* ✅ Image Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500 bg-white"
            required
          />
        </div>

        {/* Full Width Fields */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients *</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="List ingredients separated by commas"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            rows={2}
            required
          ></textarea>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            rows={3}
          ></textarea>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuUpload;
