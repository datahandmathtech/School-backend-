const express = require('express');
const router = express.Router();
const {
    recordAdvance,
    getAdvances,
    calculateSettlement,
    deleteAdvance,
    updateAdvance
} = require('../controllers/settlementController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/advances', protect, admin, recordAdvance);
router.get('/advances/:driverId', protect, admin, getAdvances);
router.delete('/advances/:id', protect, admin, deleteAdvance);
router.put('/advances/:id', protect, admin, updateAdvance);

router.get('/calculate/:driverId', protect, admin, calculateSettlement);

module.exports = router;
