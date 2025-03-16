import React, { useState, useEffect } from "react";
import { Key, Shield } from "lucide-react";

const  RiderSettings = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    accountStatus: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.data
        setUser({
          
          fullName: data.fullname,
          email: data.email,
          phone: data.phone,
          address: data.address,
          role: data.role,
          accountStatus: data.accountstatus,
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save Changes Function
  const handleSaveChanges = () => {
    setLoading(true);
    setMessage("");

    fetch("http://localhost:5000/api/auth/updateprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setMessage("Profile updated successfully!");
        } else {
          setMessage("Failed to update profile. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage("An error occurred. Please try again.");
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your account preferences and settings</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Role (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={user.role}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Account Status (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                    <input
                      type="text"
                      value={user.accountStatus}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Security</h3>
                <div className="space-y-4">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 cursor-not-allowed">
                    <Key size={20} />
                    <span>Password (Cannot Change Here)</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                    <Shield size={20} />
                    <span>Two-Factor Authentication</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Success/Error Message */}
            {message && (
              <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            {/* Save & Cancel Buttons */}
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderSettings;