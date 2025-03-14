const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { chkChefKitchen } = require("./CloudKitchen"); 
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  let accountstatus;
  const { fullname, email, password, phone, role } = req.body;
  if (role === "customer") {
    accountstatus = "active";
  }
  else if (role === "chef" || role === "rider") {
    accountstatus = "inactive";
  }
  console.log(req.body);
  // Create user
  const user = await User.create({
    fullname,
    email,
    password,
    phone,
    role,
    accountstatus
  });

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


