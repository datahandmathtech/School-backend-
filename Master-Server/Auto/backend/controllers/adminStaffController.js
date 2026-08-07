const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const StaffAttendance = require('../models/StaffAttendance');
const LeaveRequest = require('../models/LeaveRequest');
const StaffSalaryPayment = require('../models/StaffSalaryPayment');
const Advance = require('../models/Advance');
const { DateTime } = require('luxon');

// 1. Staff CRUD
const getStaff = asyncHandler(async (req, res) => {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.json(staff);
});

const addStaff = asyncHandler(async (req, res) => {
    const { name, email, mobile, password, salary, officeLocation, joiningDate, designation, staffType } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const staff = await User.create({
        name, email, mobile, password, role: 'staff',
        salary, officeLocation, joiningDate, designation, staffType
    });
    res.status(201).json(staff);
});

const updateStaff = asyncHandler(async (req, res) => {
    const staff = await User.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const updates = req.body;
    if (updates.password) {
        staff.password = updates.password;
    }
    staff.name = updates.name || staff.name;
    staff.email = updates.email || staff.email;
    staff.mobile = updates.mobile || staff.mobile;
    staff.salary = updates.salary || staff.salary;
    staff.officeLocation = updates.officeLocation || staff.officeLocation;
    staff.joiningDate = updates.joiningDate || staff.joiningDate;
    staff.designation = updates.designation || staff.designation;
    staff.staffType = updates.staffType || staff.staffType;
    
    await staff.save();
    res.json(staff);
});

const deleteStaff = asyncHandler(async (req, res) => {
    const staff = await User.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    
    await staff.deleteOne();
    res.json({ message: 'Staff removed' });
});

// 2. Stats
const getStaffStats = asyncHandler(async (req, res) => {
    const totalStaff = await User.countDocuments({ role: 'staff' });
    const today = DateTime.now().setZone('Asia/Kolkata').toFormat('yyyy-MM-dd');
    const todayAttendance = await StaffAttendance.countDocuments({ date: today, status: 'present' });
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'Pending' });

    res.json({ totalStaff, todayAttendance, pendingLeaves });
});

// 3. Attendance
const getStaffAttendance = asyncHandler(async (req, res) => {
    const { date, month, year, from, to, includeAttendance } = req.query;
    
    // For single date or range (for duty history)
    if (date || (from && to)) {
        let query = {};
        if (date) query.date = date;
        if (from && to) query.date = { $gte: from, $lte: to };
        
        const attendance = await StaffAttendance.find(query).populate('staff', 'name mobile designation').sort({ date: -1 });
        return res.json({ attendance });
    }

    // For Monthly Payroll Report
    if (month && year) {
        const { calculateSalaryForCycle } = require('./staffController');
        const staffList = await User.find({ role: 'staff' });
        const report = [];
        
        // Use luxon to generate month start/end
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        const startDate = DateTime.fromObject({ year: yearNum, month: monthNum, day: 1 }).toFormat('yyyy-MM-dd');
        const endDate = DateTime.fromObject({ year: yearNum, month: monthNum }).endOf('month').toFormat('yyyy-MM-dd');
        
        for (let staff of staffList) {
            const data = await calculateSalaryForCycle(staff, startDate, endDate);
            
            report.push({
                ...data,
                staffId: staff._id,
                name: staff.name,
                designation: staff.designation,
                salary: staff.salary,
                staffType: staff.staffType
            });
        }
        return res.json({ report });
    }
    
    res.json({ attendance: [] });
});

const addBackdateAttendance = asyncHandler(async (req, res) => {
    const { staffId, date, status, punchInTime, punchOutTime } = req.body;
    let att = await StaffAttendance.findOne({ staff: staffId, date });
    if (!att) {
        att = new StaffAttendance({ staff: staffId, date, status });
    } else {
        att.status = status;
    }
    
    if (punchInTime) {
        const dt = new Date(`${date}T${punchInTime}:00`);
        att.punchIn = { time: dt, location: { address: 'Manual Backdate' } };
    }
    if (punchOutTime) {
        const dt = new Date(`${date}T${punchOutTime}:00`);
        att.punchOut = { time: dt, location: { address: 'Manual Backdate' } };
    }
    
    await att.save();
    res.json(att);
});

const deleteAttendance = asyncHandler(async (req, res) => {
    await StaffAttendance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// 4. Leaves
const getAllLeaves = asyncHandler(async (req, res) => {
    const leaves = await LeaveRequest.find().populate('staff', 'name').sort({ createdAt: -1 });
    res.json(leaves);
});

const updateLeaveStatus = asyncHandler(async (req, res) => {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    
    leave.status = req.body.status;
    leave.approvedBy = req.user._id;
    leave.approvedAt = new Date();
    await leave.save();
    res.json(leave);
});

// 5. Salary Payments
const getSalaryPayments = asyncHandler(async (req, res) => {
    const payments = await StaffSalaryPayment.find({ month: req.query.month, year: req.query.year });
    res.json(payments);
});

const addSalaryPayment = asyncHandler(async (req, res) => {
    const p = await StaffSalaryPayment.create(req.body);
    res.status(201).json(p);
});

const deleteSalaryPayment = asyncHandler(async (req, res) => {
    await StaffSalaryPayment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// 6. Advances
const getAdvances = asyncHandler(async (req, res) => {
    // Return staff advances
    const adv = await Advance.find({ isStaffAdvance: true }).populate('driver', 'name'); // Note driver=user here
    res.json(adv);
});

const addAdvance = asyncHandler(async (req, res) => {
    const { staffId, amount, date, remark, givenBy } = req.body;
    const adv = await Advance.create({ driver: staffId, amount, date, remarks: remark, givenBy, isStaffAdvance: true });
    res.status(201).json(adv);
});

const updateAdvance = asyncHandler(async (req, res) => {
    const adv = await Advance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(adv);
});

const deleteAdvance = asyncHandler(async (req, res) => {
    await Advance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = {
    getStaff, addStaff, updateStaff, deleteStaff,
    getStaffStats, getStaffAttendance, addBackdateAttendance, deleteAttendance,
    getAllLeaves, updateLeaveStatus,
    getSalaryPayments, addSalaryPayment, deleteSalaryPayment,
    getAdvances, addAdvance, updateAdvance, deleteAdvance
};
