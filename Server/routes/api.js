const express = require('express');
const router = express.Router();

// Include other route files
const authRoutes = require('./auth');
const KitchenRoutes = require('./CloudKitchen');

// Mount routes
router.use('/auth', authRoutes);
router.use('/kitchen', KitchenRoutes);

module.exports = router;