const express = require('express');
const router = express.Router();
const { getDrivers, getDriverProfile, saveDriverProfile, assignAuto, deleteDriver, updateDriver } = require('../controllers/driverController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getDrivers)
    .post(protect, admin, saveDriverProfile);

router.delete('/:id', protect, admin, deleteDriver);
router.put('/:id', protect, admin, updateDriver);
router.get('/profile/:userId', protect, getDriverProfile);
router.put('/assign', protect, admin, assignAuto);

module.exports = router;
