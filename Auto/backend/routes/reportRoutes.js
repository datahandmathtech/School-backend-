const express = require('express');
const router = express.Router();
const { getDashboardStats, getAutoExpenseReport, getDriverEarningsReport } = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/auto-expenses', protect, admin, getAutoExpenseReport);
router.get('/driver-earnings', protect, admin, getDriverEarningsReport);

module.exports = router;
