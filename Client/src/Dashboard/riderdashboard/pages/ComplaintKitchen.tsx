import React, { useState } from 'react';
import { ChefHat, Send, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';

// Mock data for kitchens - in a real app, this would come from an API
const kitchens = [
  { id: 1, name: "Joe's Kitchen", location: "Downtown", rating: 4.5 },
  { id: 2, name: "Tasty Bites", location: "Westside", rating: 4.2 },
  { id: 3, name: "Food Express", location: "Eastside", rating: 4.7 },
  { id: 4, name: "Gourmet Hub", location: "Northside", rating: 4.4 },
  { id: 5, name: "Fresh & Fast", location: "Southside", rating: 4.3 },
];

interface FormData {
  kitchen: string;
  description: string;
}

interface FormErrors {
  kitchen?: string;
  description?: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    kitchen: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.kitchen) {
      newErrors.kitchen = 'Please select a kitchen';
    }
    
    if (!formData.description) {
      newErrors.description = 'Please provide a description of your complaint';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send data to an API
      console.log('Submitting complaint:', formData);
      
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          kitchen: '',
          description: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <ChefHat className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Kitchen Feedback</h2>
                  <p className="text-sm text-gray-600 mt-1">Help us improve our service quality</p>
                </div>
              </div>
              {submitted && (
                <div className="bg-green-50 px-4 py-2 rounded-full flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-700">Submitted</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-8 py-6">
            {submitted ? (
              <div className="bg-green-50 p-8 rounded-lg text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You for Your Feedback</h3>
                <p className="text-green-700">Your complaint has been registered successfully. Our team will review it promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="kitchen" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Kitchen <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="kitchen"
                      name="kitchen"
                      value={formData.kitchen}
                      onChange={handleChange}
                      required
                      className={`block w-full rounded-lg border ${
                        errors.kitchen ? 'border-red-300' : 'border-gray-300'
                      } px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white`}
                    >
                      <option value="">Choose a kitchen...</option>
                      {kitchens.map((kitchen) => (
                        <option key={kitchen.id} value={kitchen.id}>
                          {kitchen.name} - {kitchen.location} (★{kitchen.rating})
                        </option>
                      ))}
                    </select>
                    {errors.kitchen && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.kitchen && (
                    <p className="mt-1 text-sm text-red-600">{errors.kitchen}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Complaint Details <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`block w-full rounded-lg border ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none`}
                      placeholder="Please provide specific details about your complaint..."
                    />
                    {errors.description && (
                      <div className="absolute top-3 right-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.description ? (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">
                      Minimum 10 characters required. Be specific about your concerns.
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-3 px-6 rounded-lg text-base font-medium text-white transition-all duration-200 ${
                      loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm`}
                  >
                    {loading ? (
                      <>
                        <Clock className="animate-spin h-5 w-5 mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;