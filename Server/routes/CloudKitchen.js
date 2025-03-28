const express = require('express');
const {
    registerKitchen,
    getAllKitchens,
    updateKitchen,
    AddMenu,
    getKitchenMenus,
    GetAllOrderAccordingToKitchen,
    updateuserOrderStatus,
    getAllOrderofSpecificUser

} = require('../controllers/CloudKitchen');

const { addCustomOrder ,getCustomOrdersForSpecificKitchen,updateOrderStatus,finduserCustomOrder} = require("../controllers/Customize");



const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, registerKitchen);
router.get('/all', getAllKitchens);
router.put('/updatekitchen/:id', protect, updateKitchen);
router.get("/:id", getKitchenMenus);
router.post('/addmenu',protect,AddMenu)
router.post('/addcustomorder', protect, addCustomOrder);
router.get('/customize/order',protect, getCustomOrdersForSpecificKitchen);
router.put('/customize/updateorder', updateOrderStatus);
router.post('/customize/finduserorder',protect,finduserCustomOrder)
router.get('/user/allorders', protect, GetAllOrderAccordingToKitchen);
router.put("/user/updateorderstatus",updateuserOrderStatus)
router.get("/user/getAllOrder",protect,getAllOrderofSpecificUser)

module.exports = router; // ✅ Correct spelling
