const express = require('express');
const {
    registerKitchen,

} = require('../controllers/CloudKitchen');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, registerKitchen);

module.exports = router; // ✅ Correct spelling
