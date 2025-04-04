const express = require('express');
const router = express.Router();



// Include other route files
const authRoutes = require('./auth');
const KitchenRoutes = require('./CloudKitchen');
const paymentRoute = require('./PaymentRoute'); 
const ChefPaymentRoute = require('./ChefPaymentRoute');
const CustomerPlanPaymentRoute = require('./CustomerPlanPaymentRoute');
const orderRoute = require('./orders');





// Mount routes
router.use('/auth', authRoutes);
router.use('/kitchen', KitchenRoutes);
router.use('/payment', paymentRoute);
router.use('/chef-payment', ChefPaymentRoute);
router.use('/customer-plan-payment', CustomerPlanPaymentRoute);
router.use('/orders', orderRoute);
// Add more routes as needed

module.exports = router;