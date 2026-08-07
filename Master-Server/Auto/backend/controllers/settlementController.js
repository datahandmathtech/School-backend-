const Advance = require('../models/Advance');
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const mongoose = require('mongoose');

// @desc    Record a new advance
// @route   POST /api/settlements/advances
// @access  Private/Admin
const recordAdvance = async (req, res) => {
    const { driverId, date, amount, remarks, givenBy } = req.body;
    
    const advance = await Advance.create({
        driver: driverId,
        date: date || new Date(),
        amount,
        remarks,
        givenBy: givenBy || 'Office'
    });

    res.status(201).json(advance);
};

// @desc    Get advances for a driver (optionally filter by month)
// @route   GET /api/settlements/advances/:driverId
// @access  Private/Admin
const getAdvances = async (req, res) => {
    const { driverId } = req.params;
    const { month, year } = req.query;

    let query = { driver: driverId };

    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
        query.date = { $gte: startDate, $lte: endDate };
    }

    const advances = await Advance.find(query).sort({ date: -1 });
    res.json(advances);
};

// Removed Loan endpoints

// @desc    Calculate Monthly Settlement for a Driver
// @route   GET /api/settlements/calculate/:driverId
// @access  Private/Admin
const calculateSettlement = async (req, res) => {
    const { driverId } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
        res.status(400);
        throw new Error('Month and year are required');
    }

    const driver = await Driver.findOne({ user: driverId }).populate('user', 'name email');
    if (!driver) {
        res.status(404);
        throw new Error('Driver not found');
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // 1. Fetch Completed Trips
    const trips = await Trip.find({
        driver: driverId,
        status: 'Completed',
        date: { $gte: startDate, $lte: endDate }
    });

    let totalDuties = trips.length;
    let totalWages = 0;
    
    let totalAllowanceTA = 0;
    let totalNightStayBonuses = 0;
    let totalOtherBonuses = 0;
    let totalSelfPaidTolls = 0;

    trips.forEach(trip => {
        totalWages += (trip.wage || driver.dailyWage || 0);
        totalAllowanceTA += (trip.allowanceTA || 0);
        totalNightStayBonuses += (trip.nightStayAmount || 0);
        totalOtherBonuses += (trip.otherBonuses || 0);

        trip.expenses.forEach(exp => {
            if (exp.paidBy === 'Self' && exp.category === 'Parking/Toll') {
                totalSelfPaidTolls += (exp.amount || 0);
            }
        });
    });

    const totalEarnings = totalWages + totalAllowanceTA + totalNightStayBonuses + totalOtherBonuses + totalSelfPaidTolls;

    // 2. Fetch Payments Issued (Stored as Advances)
    const advances = await Advance.find({
        driver: driverId,
        date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });

    let totalAdvances = advances.reduce((sum, adv) => sum + adv.amount, 0);

    const netPayable = totalEarnings - totalAdvances;

    res.json({
        driverName: driver.user.name,
        month,
        year,
        earningsBreakdown: {
            totalDuties,
            dailyWageRate: driver.dailyWage,
            totalWages,
            totalAllowanceTA,
            totalNightStayBonuses,
            totalOtherBonuses,
            totalSelfPaidTolls,
            totalEarnings
        },
        deductionsBreakdown: {
            totalAdvances,
            totalDeductions: totalAdvances
        },
        netPayable,
        trips, // Duty Calendar
        advances // Payments Issued
    });
};

// @desc    Delete an Advance/Payment
// @route   DELETE /api/settlements/advances/:id
// @access  Private/Admin
const deleteAdvance = async (req, res) => {
    const advance = await Advance.findById(req.params.id);
    if (!advance) {
        res.status(404);
        throw new Error('Advance not found');
    }
    
    await advance.deleteOne();
    res.json({ message: 'Payment removed' });
};

// @desc    Update an Advance/Payment
// @route   PUT /api/settlements/advances/:id
// @access  Private/Admin
const updateAdvance = async (req, res) => {
    const { amount, date, remarks } = req.body;
    
    const advance = await Advance.findById(req.params.id);
    if (!advance) {
        res.status(404);
        throw new Error('Advance not found');
    }

    advance.amount = amount !== undefined ? amount : advance.amount;
    advance.date = date || advance.date;
    advance.remarks = remarks !== undefined ? remarks : advance.remarks;
    
    await advance.save();
    res.json(advance);
};

module.exports = {
    recordAdvance,
    getAdvances,
    calculateSettlement,
    deleteAdvance,
    updateAdvance
};
