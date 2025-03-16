const express = require('express');
const {
    registerKitchen,
    getAllKitchens,
    updateKitchen,
    AddMenu

} = require('../controllers/CloudKitchen');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, registerKitchen);
router.get('/all', getAllKitchens);
router.put('/updatekitchen/:id', protect, updateKitchen);
router.post('/addmenu',protect,AddMenu)

module.exports = router; // ✅ Correct spelling
