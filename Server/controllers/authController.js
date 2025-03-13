const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, phone, role } = req.body;
  console.log(req.body);
  // Create user
  const user = await User.create({
    fullname,
    email,
    password,
    phone,
    role
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
  // if (user.role === "chef") {
  //   const kitchen = await Kitchen.findOne({ owner: user._id });

  //   if (!kitchen) {
  //     return next(new ErrorResponse("You don't have a registered kitchen!", 403));
  //   }

  //   if (kitchen.approve !== "yes") {
  //     return next(new ErrorResponse("Your kitchen is not approved yet!", 403));
  //   }
  // }

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


