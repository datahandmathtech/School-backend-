const Driver = require('../models/Driver');
const Auto = require('../models/Auto');
const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');

const getDashboardStats = async (req, res) => {
    try {
        const totalDrivers = await Driver.countDocuments();
        const totalAutos = await Auto.countDocuments();
        
        // Active logs are trips with status 'Active'
        const activeTrips = await Trip.countDocuments({ status: 'Active' });
        
        // Maintenance alerts (let's say Autos in Maintenance status)
        const autosInMaintenance = await Auto.countDocuments({ status: 'Maintenance' });

        // Dummy trend data for the chart, as generating actual trend from dates takes complex aggregation for MVP.
        const vehicleTrend = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [65, 59, 80, 81, 56, 55, 40]
        };

        const recentAlerts = await Maintenance.find().sort({ maintenanceDate: -1 }).limit(4).populate('auto', 'rcNumber autoNumber');

        res.json({
            stats: {
                totalDrivers,
                totalVehicles: totalAutos,
                activeLogs: activeTrips,
                maintenanceAlerts: autosInMaintenance
            },
            vehicleTrend,
            recentAlerts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error in fetching dashboard stats' });
    }
};

module.exports = {
    getDashboardStats
};
