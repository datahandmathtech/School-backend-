const Trip = require('../models/Trip');
const Auto = require('../models/Auto');
const Maintenance = require('../models/Maintenance');
const mongoose = require('mongoose');

// @desc    Daily and Monthly Stats
// @route   GET /api/reports/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const dailyTrips = await Trip.find({ createdAt: { $gte: startOfDay } });
    const monthlyTrips = await Trip.find({ createdAt: { $gte: startOfMonth } });

    const totalAutos = await Auto.countDocuments({});
    const activeAutosToday = await Auto.countDocuments({ status: 'Active' });

    const dailyEarnings = dailyTrips.reduce((acc, trip) => acc + (trip.earnings || 0), 0);
    const monthlyEarnings = monthlyTrips.reduce((acc, trip) => acc + (trip.earnings || 0), 0);

    const maintenanceCosts = await Maintenance.aggregate([
        { $match: { maintenanceDate: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalCost" } } }
    ]);

    res.json({
        dailyEarnings,
        monthlyEarnings,
        totalDailyTrips: dailyTrips.length,
        monthlyMaintenanceCost: maintenanceCosts[0] ? maintenanceCosts[0].total : 0,
        totalAutos,
        activeAutosToday
    });
};

// @desc    Auto-wise Expense Report
// @route   GET /api/reports/auto-expenses
// @access  Private/Admin
const getAutoExpenseReport = async (req, res) => {
    const report = await Maintenance.aggregate([
        {
            $group: {
                _id: "$auto",
                totalMaintenanceCost: { $sum: "$totalCost" },
                serviceCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "autos",
                localField: "_id",
                foreignField: "_id",
                as: "autoDetails"
            }
        },
        { $unwind: "$autoDetails" }
    ]);

    res.json(report);
};

// @desc    Driver Earnings Report
// @route   GET /api/reports/driver-earnings
// @access  Private/Admin
const getDriverEarningsReport = async (req, res) => {
    const report = await Trip.aggregate([
        {
            $group: {
                _id: "$driver",
                totalEarnings: { $sum: "$earnings" },
                totalKM: { $sum: "$totalKM" },
                tripCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "driverDetails"
            }
        },
        { $unwind: "$driverDetails" },
        { $project: { "driverDetails.password": 0 } }
    ]);

    res.json(report);
};

module.exports = { getDashboardStats, getAutoExpenseReport, getDriverEarningsReport };
