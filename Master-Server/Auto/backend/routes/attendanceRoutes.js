const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getTodayAttendance, getAllAttendance, getAttendanceByDate, saveBulkAttendance } = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/check-in', protect, checkIn);
router.put('/check-out', protect, checkOut);
router.get('/today', protect, getTodayAttendance);
router.get('/', protect, admin, getAllAttendance);
router.get('/date/:date', protect, admin, getAttendanceByDate);
router.post('/bulk', protect, admin, saveBulkAttendance);

module.exports = router;
