import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

const ChefRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [kitchenLogo, setKitchenLogo] = useState(null);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = () => setShowSuccess(true);
  const handleSuccessOk = () => {
    setShowSuccess(false);
    setStep(1);
    navigate('/');

  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // step 1 working 

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "chef",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    // Full Name Validation
    if (!formData.fullname) newErrors.fullname = "Full name required";
    
    // Email Validation (Must end with @gmail.com)
    if (!formData.email) {
      newErrors.email = "Email required";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }
    
    // Phone Validation (Must start with 03 and be 11 digits)
    if (!formData.phone) {
      newErrors.phone = "Phone required";
    } else if (!/^03\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone must start with 03 and be 11 digits long";
    }
    
    // Password Validation
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    // Set Errors
    setErrors(newErrors);
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }    

  const handleNext = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setStep(2); // ✅ Move to next step if registration successful
        localStorage.setItem("token", result.token);
      } else {
        setErrors({ apiError: result.message || "Registration failed" });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ apiError: "Network error, try again later" });
    }
  };

  ////////////////////////

  // Step 2 working 
  const [kitchenData, setKitchenData] = useState({
    kitchenName: "",
    openingTime: "",
    closingTime: "",
    specification: "",
    userImage: "",
    kitchenLogo: ""
  });

  const [kitchenErrors, setKitchenErrors] = useState({});
  const handleKitchenChange = (e) => {
    setKitchenData({ ...kitchenData, [e.target.name]: e.target.value });
  };
  const validateKitchenForm = () => {
    let errors = {};

    if (!kitchenData.kitchenName) errors.kitchenName = "Kitchen Name required";
    if (!kitchenData.openingTime) errors.openingTime = "Opening time required";
    if (!kitchenData.closingTime) errors.closingTime = "Closing time required";
    if (!kitchenData.specification) errors.specification = "Specification required";

    setKitchenErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextKitchen = () => {
    if (validateKitchenForm()) {
      setStep(3);
    }
 
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "userImage") {
      setUserImage(file);
    } else if (type === "kitchenLogo") {
      setKitchenLogo(file);
    }
  };


  const handleSubmitKitchen = async () => {
    if (!userImage || !kitchenLogo) {
      alert("Please upload both images first!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload User Image
      const userImageFormData = new FormData();
      userImageFormData.append("image", userImage);

      const userImageResponse = await fetch("http://localhost:5000/uploadimage", {
        method: "POST",
        body: userImageFormData,
      });

      const userImageResult = await userImageResponse.json();
      if (!userImageResponse.ok) throw new Error("User image upload failed");

      // Step 2: Upload Kitchen Logo
      const kitchenLogoFormData = new FormData();
      kitchenLogoFormData.append("image", kitchenLogo);

      const kitchenLogoResponse = await fetch("http://localhost:5000/uploadimage", {
        method: "POST",
        body: kitchenLogoFormData,
      });

      const kitchenLogoResult = await kitchenLogoResponse.json();
      if (!kitchenLogoResponse.ok) throw new Error("Kitchen logo upload failed");

      // Step 3: Update kitchenData with Image URLs
      const updatedKitchenData = {
        ...kitchenData,
        userImage: userImageResult.image_url,
        kitchenLogo: kitchenLogoResult.image_url,
      };

      // Step 4: Send Final Create Kitchen API Request
      const response = await fetch("http://localhost:5000/api/kitchen/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedKitchenData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setShowSuccess(true);
        localStorage.removeItem("token");
      } else {
        setKitchenErrors({ apiError: result.message || "Kitchen registration failed" });
      }
    } catch (error) {
      setLoading(false);
      setKitchenErrors({ apiError: error.message || "Network error, try again later" });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white relative">
      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-[url('')] bg-cover bg-center blur-sm z-0"
      />

      {/* Main container with wider width */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-2xl w-full z-10 overflow-hidden"
      >
        {/* Enhanced Progress Bar */}
        <div className="relative mb-8">
          {/* Background Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-full" />

          {/* Animated Progress Bar */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
          />

          {/* Progress Indicators with Labels */}
          <div className="relative z-10 flex justify-between px-4 mt-3">
            {/* Personal Step */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center">
                <span className="w-6 h-6 bg-orange-500 rounded-full animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Personal</span>
            </div>

            {/* Kitchen Step */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center">
                <span className={`w-6 h-6 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-orange-500  animate-pulse' : 'bg-gray-300'}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Kitchen</span>
            </div>

            {/* Upload Step */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center">
                <span className={`w-6 h-6 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-orange-500  animate-pulse' : 'bg-gray-300'}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Upload</span>
            </div>
          </div>
        </div>



        {/* Form content with staggered animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-orange-500">🧑‍🍳</span>
                  Personal Details
                </h2>

                {/* Full Name */}
                <motion.div className="relative">
                  <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                    Your Name
                  </label>
                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400 transition-all duration-300"
                    placeholder="Enter your full name"
                    type="text"
                  />
                  {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                </motion.div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400 transition-all duration-300"
                      placeholder="Enter your email"
                      type="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </motion.div>

                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Phone Number (Optional)
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400 transition-all duration-300"
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  </motion.div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Password
                    </label>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400 transition-all duration-300"
                      placeholder="Enter your password"
                      type="password"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </motion.div>

                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400 transition-all duration-300"
                      placeholder="Confirm your password"
                      type="password"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </motion.div>
                </div>

                {/* Next Button */}
                {errors.apiError && <p className="text-red-500 text-sm">{errors.apiError}</p>}
                <button
                  onClick={handleNext}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all"
                >
                  Next
                </button>
              </div>

            )}

            {/* Step 2: Kitchen Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-orange-500">🍽️</span>
                  Kitchen Details
                </h2>

                {/* Kitchen Name */}
                <motion.div className="relative">
                  <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                    Kitchen Name
                  </label>
                  <input
                    name="kitchenName"
                    value={kitchenData.kitchenName}
                    onChange={handleKitchenChange}
                    className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400"
                    placeholder="Enter kitchen name"
                    type="text"
                  />
                  {kitchenErrors.kitchenName && <p className="text-red-500 text-sm">{kitchenErrors.kitchenName}</p>}
                </motion.div>

                {/* Kitchen Timings */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Opening Time
                    </label>
                    <input
                      name="openingTime"
                      value={kitchenData.openingTime}
                      onChange={handleKitchenChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400"
                      type="time"
                    />
                    {kitchenErrors.openingTime && <p className="text-red-500 text-sm">{kitchenErrors.openingTime}</p>}
                  </motion.div>

                  <motion.div className="relative">
                    <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                      Closing Time
                    </label>
                    <input
                      name="closingTime"
                      value={kitchenData.closingTime}
                      onChange={handleKitchenChange}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400"
                      type="time"
                    />
                    {kitchenErrors.closingTime && <p className="text-red-500 text-sm">{kitchenErrors.closingTime}</p>}
                  </motion.div>
                </div>

                {/* Kitchen Specifications */}
                <motion.div className="relative">
                  <label className="absolute -top-4 left-4 px-2 bg-white text-sm font-medium text-gray-600">
                    Specifications
                  </label>
                  <textarea
                    name="specification"
                    value={kitchenData.specification}
                    onChange={handleKitchenChange}
                    className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:border-orange-400"
                    placeholder="Describe your kitchen (e.g., Special Dishes, Capacity, Equipment)"
                    rows={3}
                  ></textarea>
                  {kitchenErrors.specification && <p className="text-red-500 text-sm">{kitchenErrors.specification}</p>}
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={handleNextKitchen}
                  // disabled={!validateKitchenForm()}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all"
                >
                  Next
                </button>
              </div>
            )}


            {/* Step 3: Upload Pictures */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-orange-500">📸</span>
                  Upload Pictures
                </h2>

                {/* User Image Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative  w-full flex flex-col items-center justify-center border-2 border-dashed border-orange-500 rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition-all">
                    <label htmlFor="userImage">
                      <span className="text-orange-500 text-4xl">📷</span>
                      <p className="text-gray-700 font-medium">Upload Your Picture</p>
                    </label>
                    <input type="file" id="userImage" className="hidden" onChange={(e) => handleFileUpload(e, "userImage")} />
                  </div>
                  <img
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                    src={userImage ? URL.createObjectURL(userImage) : "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"}
                    alt="User Image"
                  />
                </div>
                
                {/* Kitchen Logo Upload */}
                <div className="flex gap-6 items-center">

                <div className="relative w-full flex flex-col items-center justify-center border-2 border-dashed border-orange-500 rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition-all">
                  <label htmlFor="kitchenLogo">
                    <span className="text-orange-500 text-4xl">🏠</span>
                    <p className="text-gray-700 font-medium">Upload Kitchen Logo</p>
                  </label>
                  <input type="file" id="kitchenLogo" className="hidden" onChange={(e) => handleFileUpload(e, "kitchenLogo")} />
                </div>
                
                <img
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                  src={kitchenLogo ? URL.createObjectURL(kitchenLogo) : 'https://w7.pngwing.com/pngs/408/758/png-transparent-cooking-chef-s-hat-restaurant-chef-professional-cooking-knife-kitchen-utensils-icon-logo.png'}
                  alt="kitchen Logo"
                />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitKitchen}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
                >
                  Done
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {/* {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-300"
            >
              Back
            </motion.button>
          )} */}

          {/* {step < 3 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg transition-all duration-300 hover:from-green-600 hover:to-green-700"
            >
              Submit
            </motion.button>
          )} */}
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="text-4xl text-green-500">✅</span>
                <h2 className="text-2xl font-bold text-gray-900">Information Submitted!</h2>
                <p className="text-gray-600 text-center">
                  Your application has been received and is under review by our team.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSuccessOk}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl transition-all duration-300 hover:from-green-600 hover:to-green-700 mt-4"
                >
                  OK
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .input-style {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}


export default ChefRegisterPage;