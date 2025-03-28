const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  registerRider,
  updateCart,
  getUserCart,
  AddUsercartToOrder
  
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.put("/updateprofile", protect, updateProfile);
router.post("/registerrider", registerRider);
router.put("/updatecart",protect,updateCart);
router.get("/getcart",protect,getUserCart);
router.post("/adduserorder",protect,AddUsercartToOrder)


module.exports = router;