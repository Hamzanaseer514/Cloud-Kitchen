const express = require('express');
const router = express.Router();

const { getavailableOrderForRider,RiderAcceptedOrder,RiderDeliveredOrder,getOrdersWithRiderInfo } = require('../controllers/Orders');
const { protect } = require('../middleware/auth'); // ✅ Correct spelling

router.get('/available-for-rider',getavailableOrderForRider)
router.post('/accept/:id', protect, RiderAcceptedOrder); // ✅ Correct spelling
router.put('/updateorderstatus/:id', protect, RiderDeliveredOrder); // ✅ Correct spelling
router.get('/getorderswithriderinfo', protect, getOrdersWithRiderInfo); // ✅ Correct spelling



module.exports = router; // ✅ Correct spelling