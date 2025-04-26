const express = require('express');
const User = require('../models/User');
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  registerRider,
  updateCart,
  getUserCart,
  AddUsercartToOrder,
  saveUserSubscription

  
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');
// const checkPremium = require('../middleware/checkPremium');
const checkSubscription = require('../middleware/checkSubscription');

router.get('/check-premium', protect, checkSubscription, async (req, res) => {
  const user = req.userData; // 👈 No need to call findById again

  res.status(200).json({
    isPremium: user.subscription.isPremium,
    role: user.role,
    plan: user.subscription.plan, // Ab plan bhi bhej diya
  });
});



router.post('/register', register);
router.post('/login', login);
// router.get('/me', protect, getMe);
router.get('/me', protect, checkSubscription, getMe);
router.get('/logout', logout);
router.put("/updateprofile", protect, updateProfile);
router.post("/registerrider", registerRider);
router.put("/updatecart",protect,updateCart);
router.get("/getcart",protect,getUserCart);
router.post("/adduserorder",protect,AddUsercartToOrder)
router.post("/saveUserSubscriptions", protect, saveUserSubscription);
// router.get('/chatbot', protect, checkPremium, (req, res) => {
//   res.json({ success: true, message: "Welcome to the Premium Chatbot!" });
// });
router.get('/check-premiums', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user found in database subscription 0", user.subscription);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("user found in database subscription", user.subscription);
    return res.status(200).json({ 
      isPremium: user.subscription?.isPremium || false,
      plan: user.subscription?.plan || null
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;