const express = require('express');
const {
    registerKitchen,
    getAllKitchens,
    updateKitchen,
    AddMenu,
    getKitchenMenus

} = require('../controllers/CloudKitchen');

const { addCustomOrder ,getCustomOrdersForSpecificKitchen,updateOrderStatus} = require("../controllers/Customize");



const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, registerKitchen);
router.get('/all', getAllKitchens);
router.put('/updatekitchen/:id', protect, updateKitchen);
router.get("/:id", getKitchenMenus);
router.post('/addmenu',protect,AddMenu)
router.post('/addcustomorder', protect, addCustomOrder);
router.get('/customize/order',protect, getCustomOrdersForSpecificKitchen);
router.put('/customize/updateorder', updateOrderStatus)

module.exports = router; // ✅ Correct spelling
