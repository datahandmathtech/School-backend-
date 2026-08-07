const Attendance = require('../models/Attendance');
const Driver = require('../models/Driver');

// @desc    Check-in driver
// @route   POST /api/attendance/check-in
// @access  Private
const checkIn = async (req, res) => {
    // Only 1 active check-in allowed per day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
        driver: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingAttendance) {
        res.status(400);
        throw new Error('You have already checked in today');
    }

    const attendance = await Attendance.create({
        driver: req.user._id,
        date: new Date(),
        checkInTime: new Date(),
        status: 'Present'
    });

    // Update driver profile status to "On Duty"
    await Driver.findOneAndUpdate(
        { user: req.user._id },
        { status: 'On Duty' }
    );

    res.status(201).json(attendance);
};

// @desc    Check-out driver
// @route   PUT /api/attendance/check-out
// @access  Private
const checkOut = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
        driver: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!attendance) {
        res.status(404);
        throw new Error('No check-in record found for today');
    }

    if (attendance.checkOutTime) {
        res.status(400);
        throw new Error('You have already checked out today');
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    // Update driver profile status to "Off Duty"
    await Driver.findOneAndUpdate(
        { user: req.user._id },
        { status: 'Off Duty' }
    );

    res.json(attendance);
};

// @desc    Get current day attendance for driver
// @route   GET /api/attendance/today
// @access  Private
const getTodayAttendance = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
        driver: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
    });

    res.json(attendance || null);
};

// @desc    Get all attendance records (Admin)
// @route   GET /api/attendance
// @access  Private/Admin
const getAllAttendance = async (req, res) => {
    const records = await Attendance.find({}).populate('driver', 'name email').sort({ date: -1 });
    res.json(records);
};

// @desc    Get attendance for a specific date
// @route   GET /api/attendance/date/:date
// @access  Private/Admin
const getAttendanceByDate = async (req, res) => {
    const { date } = req.params;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const records = await Attendance.find({
        date: { $gte: startOfDay, $lte: endOfDay }
    }).populate('driver', 'name email');

    res.json(records);
};

// @desc    Save bulk attendance for a specific date
// @route   POST /api/attendance/bulk
// @access  Private/Admin
const saveBulkAttendance = async (req, res) => {
    const { date, records } = req.body;
    const targetDate = new Date(date);
    targetDate.setHours(12, 0, 0, 0); // Noon to avoid timezone boundary issues

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    for (let record of records) {
        let attendance = await Attendance.findOne({
            driver: record.driver,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (attendance) {
            attendance.status = record.status;
            attendance.notes = record.notes || attendance.notes;
            await attendance.save();
        } else {
            await Attendance.create({
                driver: record.driver,
                date: targetDate,
                checkInTime: targetDate, // dummy time for admin records
                status: record.status,
                notes: record.notes || ''
            });
        }
    }

    res.json({ message: 'Attendance saved successfully' });
};

module.exports = { checkIn, checkOut, getTodayAttendance, getAllAttendance, getAttendanceByDate, saveBulkAttendance };
