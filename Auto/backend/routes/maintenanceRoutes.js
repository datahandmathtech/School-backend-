const express = require('express');
const router = express.Router();
const { addMaintenance, getAutoMaintenanceHistory, getAllMaintenance, deleteMaintenance, updateMaintenance } = require('../controllers/maintenanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getAllMaintenance)
    .post(protect, admin, addMaintenance);

router.route('/:id')
    .put(protect, admin, updateMaintenance)
    .delete(protect, admin, deleteMaintenance);

router.get('/auto/:autoId', protect, getAutoMaintenanceHistory);

module.exports = router;
