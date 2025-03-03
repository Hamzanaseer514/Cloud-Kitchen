const express = require('express');
const router = express.Router();

// Include other route files
const authRoutes = require('./auth');

// Mount routes
router.use('/auth', authRoutes);

module.exports = router;