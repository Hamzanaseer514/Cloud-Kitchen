import { useState } from "react";

const API_URL = "http://localhost:5000/api/auth/register";

const AddRider = () => {
  const [formData, setFormData] = useState({
    fullname: "",  // Changed from fullName to fullname
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicle: "",
    license: "",
    role: "rider",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed!");
      }

      alert("Rider Registered Successfully!");
      setFormData({
        fullname: "",  // Changed from fullName to fullname
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        vehicle: "",
        license: "",
        role: "rider",
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl bg-white shadow-lg p-8 rounded-2xl  mt-5 border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Register as a Rider</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            type="text"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle</label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500 bg-white"
            required
          >
            <option value="">Select Vehicle</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">License</label>
          <input
            name="license"
            value={formData.license}
            onChange={handleChange}
            type="text"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        {/* Full Width Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRider;
