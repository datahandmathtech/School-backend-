const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const Auto = require('../models/Auto');

// @desc    Get live feed data for a specific date
// @route   GET /api/live-feed
// @access  Private/Admin
const getLiveFeed = async (req, res) => {
    try {
        const dateParam = req.query.date ? new Date(req.query.date) : new Date();
        const startOfDay = new Date(dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate(), 23, 59, 59, 999);

        // 1. Fetch Trips for the date
        const trips = await Trip.find({
            startTime: { $gte: startOfDay, $lte: endOfDay }
        }).populate('auto').populate('driver', 'name email').sort({ startTime: 1 }); // Sort by start time for the timeline

        // Calculate metrics
        let activeDriversCount = new Set();
        let activeFleetCount = new Set();
        let totalFuelCost = 0;
        let totalRunningCost = 0;
        let fuelLogs = [];

        trips.forEach(trip => {
            if (trip.driver) activeDriversCount.add(trip.driver._id.toString());
            if (trip.auto) activeFleetCount.add(trip.auto._id.toString());
            
            // Sum wages & bonuses
            totalRunningCost += (trip.wage || 0) + (trip.allowanceTA || 0) + (trip.nightStayAmount || 0) + (trip.otherBonuses || 0);

            // Expenses
            trip.expenses.forEach(exp => {
                totalRunningCost += exp.amount;
                if (exp.category === 'Fuel') {
                    totalFuelCost += exp.amount;
                    fuelLogs.push({ 
                        tripId: trip._id, 
                        driverName: trip.driver?.name, 
                        autoNumber: trip.auto?.autoNumber, 
                        ...exp._doc 
                    });
                }
            });
        });

        // Fetch all drivers and autos
        const allDrivers = await Driver.find().populate('user', 'name');
        const allAutos = await Auto.find();

        const absentDrivers = allDrivers.filter(d => d.user && !activeDriversCount.has(d.user._id.toString()));
        const idleAutos = allAutos.filter(a => !activeFleetCount.has(a._id.toString()));

        res.json({
            stats: {
                activeDrivers: activeDriversCount.size,
                activeFleet: activeFleetCount.size,
                totalFuelCost,
                totalRunningCost
            },
            trips,
            absentDrivers,
            idleAutos,
            fuelLogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error in Live Feed' });
    }
};

module.exports = {
    getLiveFeed
};
