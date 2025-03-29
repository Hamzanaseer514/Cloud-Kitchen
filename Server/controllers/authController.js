const User = require('../models/User');
const Rider = require('../models/Rider');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { chkChefKitchen } = require("./CloudKitchen");
const OrderHistory = require("../models/orderHistory");
const Kitchen = require("../models/CloudKitchen");
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  let accountstatus;
  const { fullname, email, password, phone, role } = req.body;
  if (role === "customer" || role === "rider") {
    accountstatus = "active";
  }
  else if (role === "chef") {
    accountstatus = "active";
  }
  console.log(req.body);
  let cart = {}

  // Create user
  const user = await User.create({
    fullname,
    email,
    password,
    phone,
    role,
    accountstatus,
    cartItem: cart
  });

  if (user.role === "rider") {
    const { vehicle, license } = req.body;
    const rider = await Rider.create({
      userid: user._id,
      vehicle,
      license
    });
    if (!rider) {
      return next(new ErrorResponse('Rider not created', 400));
    }
    res.status(201).json({ success: true, data: rider });
  }



  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Received Request Body:", req.body);

  // Validate email & password
  if (!email || !password) {
    console.log("Missing Email or Password");
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user in database
  const user = await User.findOne({ email }).select('+password');
  console.log("User from DB:", user.role);

  if (!user) {
    console.log("User not found in database");
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // if(user.accountstatus === "inactive"){
  //   console.log("User account is inactive");
  //   return next(new ErrorResponse('Your account status is pending, please ask the admin to approve', 401));
  // }
  if (user.role === "chef") {
    const chkChef = await chkChefKitchen(user._id); // ✅ Await added
    if (chkChef === false) {
      console.log("User is Chef but has no approved kitchen");
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  console.log("Password Match Status:", isMatch);

  if (!isMatch) {
    console.log("Passwords do not match");
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  console.log("User authenticated successfully!");
  sendTokenResponse(user, 200, res);
});


// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
};

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { fullname, address, phone } = req.body;

  // Allowed fields only
  const updatedFields = {};
  if (fullname) updatedFields.fullname = fullname;
  if (address) updatedFields.address = address;
  if (phone) updatedFields.phone = phone;

  // Update user profile
  const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully!",
    data: {
      id: user._id,
      fullname: user.fullname,
      address: user.address,
      phone: user.phone,
    },
  });
});


exports.registerRider = asyncHandler(async (req, res, next) => {
  let accountstatus = "active";
  const { fullname, email, password, phone, role, vehicle, license } = req.body;
  const user = await User.create({
    fullname,
    email,
    password,
    phone,
    role,
    accountstatus
  });
  if (!user) {
    return next(new ErrorResponse('User not created',
      400));
  }
  const rider = await Rider.create({
    userid: user._id,
    vehicle,
    license
  });

  sendTokenResponse(rider, 201, res);
}
);



exports.updateCart = asyncHandler(async (req, res, next) => {
  try {
    // ✅ Get User ID from Auth Middleware
    const userId = req.user.id;
    if (!userId) {
      return next(new ErrorResponse("User ID missing from token", 400));
    }

    // 🛒 Extract cartItems from request body
    const { cartItems } = req.body;
    console.log("🛒 Received Cart Update Request:", req.body);

    console.log("🛒 Received Cart Update Request:", req.body);

    // 🛑 Check if cartItems is an array
    if (!Array.isArray(cartItems)) {
      console.error("❌ Error: cartItems is not an array!", cartItems);
      return next(new ErrorResponse("Cart must be an array", 400));
    }

    // ✅ Fix: Use `findByIdAndUpdate` to avoid version conflict
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { CartItem: cartItems } }, // ✅ `$set` ensures only CartItem is updated
      { new: true } // ✅ No need for `overwrite`
    );


    if (!updatedUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully!",
      cart: updatedUser.CartItem,
    });
  } catch (error) {
    console.error("❌ Server Error in Cart Update:", error);
    next(new ErrorResponse("Internal Server Error", 500));
  }
});


exports.getUserCart = asyncHandler(async (req, res, next) => {
  try {

    const userId = req.user.id;
    if (!userId) {
      return next(new ErrorResponse("User ID missing from token", 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // ✅ Return User's Cart
    res.status(200).json({
      success: true,
      cart: user.CartItem || [], // Ensure cart is always an array
    });
  } catch (error) {
    console.error("❌ Server Error in Fetching Cart:", error);
    next(new ErrorResponse("Internal Server Error", 500));
  }
});

exports.AddUsercartToOrder = asyncHandler(async (req, res, next) => {
  const { totalPrice, totalItems, paymentType, paymentStatus, items,address } = req.body;
  console.log(req.body)
  const userId = req.user.id;
  const order = await OrderHistory.create({
    userId,
    items,
    totalPrice,
    totalItems,
    paymentStatus,
    paymentType,
    address
  });
  if (!order) {
    return next(new ErrorResponse('Order not created', 400));
  }
  res.status(200).json({ success: true, message: "Order placed successfully!" });
});









