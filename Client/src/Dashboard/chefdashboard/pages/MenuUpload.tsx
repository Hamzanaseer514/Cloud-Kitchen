import { useState } from "react";

const MenuUpload = () => {
  const [formData, setFormData] = useState<{
    menuName: string;
    category: string;
    description: string;
    price: string;
    ingredients: string;
    prepTime: string;
    image: File | null;
  }>({
    menuName: "",
    category: "",
    description: "",
    price: "",
    ingredients: "",
    prepTime: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Menu Data Submitted:", formData);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-10 border-t-4 border-orange-500">
      <h2 className="text-3xl font-bold text-orange-600 text-center">Create a New Menu</h2>
      <p className="text-center text-gray-600 mt-2">Add a delicious menu for your customers</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Menu Name</label>
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
          <label className="block text-sm font-medium text-gray-700">Category</label>
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
          <label className="block text-sm font-medium text-gray-700">Price (PKR)</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Preparation Time (Minutes)</label>
          <input
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            type="number"
            placeholder="Enter preparation time"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* Full Width Fields */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="List ingredients separated by commas"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            rows={2}
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
          >
            Add Menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuUpload;