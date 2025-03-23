const express = require('express');
const router = express.Router();


// Include other route files
const authRoutes = require('./auth');
const KitchenRoutes = require('./CloudKitchen');
const paymentRoute = require('./PaymentRoute'); 





// Mount routes
router.use('/auth', authRoutes);
router.use('/kitchen', KitchenRoutes);
router.use('/payment', paymentRoute);

module.exports = router;