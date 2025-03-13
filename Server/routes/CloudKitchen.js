const express = require('express');
const {
    registerKitchen,
    getAllKitchens,
    updateKitchen,

} = require('../controllers/CloudKitchen');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, registerKitchen);
router.get('/all', getAllKitchens);
router.put('/updatekitchen/:id', protect, updateKitchen);

module.exports = router; // ✅ Correct spelling
