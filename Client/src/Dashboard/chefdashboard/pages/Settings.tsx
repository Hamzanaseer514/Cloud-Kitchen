import React from 'react';
import { Key, Shield, Smartphone, Globe } from 'lucide-react';

export function Settings() {
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
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Gordon Smith"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="gordon.smith@cloudchef.com"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates about orders and schedule</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-500">
                      <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Mobile Notifications</p>
                      <p className="text-sm text-gray-500">Get push notifications on your phone</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200">
                      <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Security</h3>
              <div className="space-y-4">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                  <Key size={20} />
                  <span>Change Password</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                  <Shield size={20} />
                  <span>Two-Factor Authentication</span>
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Connected Devices</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">iPhone 12 Pro</p>
                      <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-500 hover:text-red-600">Remove</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Chrome Browser</p>
                      <p className="text-sm text-gray-500">Last active: Just now</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-500 hover:text-red-600">Remove</button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}