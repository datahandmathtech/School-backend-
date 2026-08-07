const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');

const getLiveFeed = async (req, res) => {
    try {
        // Fetch recent trips and format as feed events
        const recentTrips = await Trip.find().sort({ createdAt: -1 }).limit(5).populate('driver', 'name').populate('auto', 'autoNumber rcNumber');
        
        // Fetch recent maintenance and format
        const recentMaintenance = await Maintenance.find().sort({ createdAt: -1 }).limit(5).populate('auto', 'autoNumber rcNumber');

        let feedEvents = [];

        recentTrips.forEach(trip => {
            feedEvents.push({
                id: `trip-${trip._id}`,
                type: trip.status === 'Active' ? 'driver' : 'vehicle',
                title: trip.status === 'Active' ? 'Trip Started' : 'Trip Completed',
                desc: `${trip.driver?.name || 'A driver'} ${trip.status === 'Active' ? 'started' : 'completed'} a trip in vehicle ${trip.auto?.rcNumber || trip.auto?.autoNumber}.`,
                time: trip.createdAt,
                iconType: 'trip'
            });
        });

        recentMaintenance.forEach(m => {
            feedEvents.push({
                id: `maint-${m._id}`,
                type: 'maintenance',
                title: 'Maintenance Logged',
                desc: `Vehicle ${m.auto?.rcNumber || m.auto?.autoNumber} logged for ${m.serviceCategory || 'Service'}. Cost: ₹${m.totalCost}`,
                time: m.createdAt,
                iconType: 'maintenance'
            });
        });

        // Sort combined feed by time descending
        feedEvents.sort((a, b) => new Date(b.time) - new Date(a.time));

        res.json(feedEvents.slice(0, 10)); // return top 10
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error in fetching live feed' });
    }
};

module.exports = {
    getLiveFeed
};
