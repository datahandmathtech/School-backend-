const express = require('express');
const router = express.Router();
const { startTrip, endTrip, addTripExpense, getTrips, getActiveTrip, deleteTrip, updateTrip } = require('../controllers/tripController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getTrips);
router.get('/active', protect, getActiveTrip);
router.post('/start', protect, startTrip);
router.put('/:id/end', protect, endTrip);
router.post('/:id/expense', protect, addTripExpense);
router.delete('/:id', protect, admin, deleteTrip);
router.put('/:id', protect, admin, updateTrip);

module.exports = router;
