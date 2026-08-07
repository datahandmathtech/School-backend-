const Trip = require('../models/Trip');
const Auto = require('../models/Auto');
const Driver = require('../models/Driver');

// @desc    Start a new trip
// @route   POST /api/trips/start
// @access  Private
const startTrip = async (req, res) => {
    const { autoId, driverId, startKM, pickupLocation, wage, startTime } = req.body;
    const actualDriverId = req.user.role === 'admin' ? (driverId || req.user._id) : req.user._id;

    const activeTrip = await Trip.findOne({ driver: actualDriverId, status: 'Active' });
    if (activeTrip) {
        res.status(400);
        throw new Error('This driver already has an active trip');
    }

    const trip = await Trip.create({
        auto: autoId,
        driver: actualDriverId,
        startTime: startTime ? new Date(startTime) : new Date(),
        startKM,
        pickupLocation,
        wage: wage || 0,
        status: 'Active'
    });

    await Auto.findByIdAndUpdate(autoId, { status: 'Active' });

    res.status(201).json(trip);
};

// @desc    End a trip
// @route   PUT /api/trips/:id/end
// @access  Private
const endTrip = async (req, res) => {
    const { endKM, earnings, batteryUsed, notes, dropLocation, allowanceTA, nightStayAmount, otherBonuses, endTime } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (trip) {
        trip.endTime = endTime ? new Date(endTime) : new Date();
        trip.endKM = endKM;
        trip.totalKM = endKM - trip.startKM;
        trip.earnings = earnings || 0;
        trip.batteryUsed = batteryUsed;
        trip.notes = notes;
        trip.dropLocation = dropLocation;
        trip.allowanceTA = allowanceTA || 0;
        trip.nightStayAmount = nightStayAmount || 0;
        trip.otherBonuses = otherBonuses || 0;
        trip.status = 'Completed';

        // Calculate net earnings
        const totalExpenses = trip.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        trip.totalExpenses = totalExpenses;
        trip.netEarnings = earnings - totalExpenses;

        const updatedTrip = await trip.save();

        // Update Auto status, battery and MILEAGE tracking
        await Auto.findByIdAndUpdate(trip.auto, {
            batteryStatus: 100 - (batteryUsed || 0),
            status: 'Active',
            lastKM: endKM
        });

        res.json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

// @desc    Add expense to trip
// @route   POST /api/trips/:id/expense
// @access  Private
const addTripExpense = async (req, res) => {
    const { category, amount, note, paidBy } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (trip) {
        trip.expenses.push({ category, amount, note, paidBy: paidBy || 'Office' });
        await trip.save();
        res.json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private/Admin
const getTrips = async (req, res) => {
    const trips = await Trip.find({}).populate('auto').populate('driver', 'name email').sort({ createdAt: -1 });
    res.json(trips);
};

// @desc    Get current active trip for driver
// @route   GET /api/trips/active
// @access  Private
const getActiveTrip = async (req, res) => {
    const activeTrip = await Trip.findOne({ driver: req.user._id, status: 'Active' }).populate('auto');
    res.json(activeTrip || null);
};

// @desc    Delete a Trip
// @route   DELETE /api/trips/:id
// @access  Private/Admin
const deleteTrip = async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }
    
    // Also free the auto if trip was active
    if (trip.status === 'Active') {
        const Auto = require('../models/Auto');
        const auto = await Auto.findById(trip.auto);
        if (auto) {
            auto.currentDriver = null;
            auto.status = 'Active'; 
            await auto.save();
        }
        
        const Driver = require('../models/Driver');
        const driver = await Driver.findOne({ user: trip.driver });
        if (driver) {
            driver.assignedAuto = null;
            driver.status = 'Off Duty';
            await driver.save();
        }
    }
    
    await trip.deleteOne();
    res.json({ message: 'Trip removed' });
};

// @desc    Update a Trip
// @route   PUT /api/trips/:id
// @access  Private/Admin
const updateTrip = async (req, res) => {
    const { startKM, endKM, pickupLocation, dropLocation, allowanceTA, nightStayAmount, otherBonuses, parkingAmount, parkingPaidBy, wage, startTime, endTime, dutyType } = req.body;
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const parseNum = (val, fallback) => (val === '' || val === undefined) ? fallback : Number(val);

    trip.startKM = parseNum(startKM, trip.startKM);
    trip.endKM = parseNum(endKM, trip.endKM);
    trip.pickupLocation = pickupLocation !== undefined ? pickupLocation : trip.pickupLocation;
    trip.dropLocation = dropLocation !== undefined ? dropLocation : trip.dropLocation;
    trip.allowanceTA = parseNum(allowanceTA, trip.allowanceTA);
    trip.nightStayAmount = parseNum(nightStayAmount, trip.nightStayAmount);
    trip.otherBonuses = parseNum(otherBonuses, trip.otherBonuses);
    if (wage !== undefined && wage !== '') trip.wage = Number(wage);
    if (dutyType !== undefined) trip.dutyType = dutyType;
    if (startTime) trip.startTime = new Date(startTime);
    if (endTime) {
        trip.endTime = new Date(endTime);
        if (trip.status === 'Active') {
            trip.status = 'Completed';
            // Free up the Auto
            await Auto.findByIdAndUpdate(trip.auto, {
                status: 'Active',
                lastKM: trip.endKM
            });
        }
    }

    if (trip.startKM !== null && trip.endKM !== null) {
        trip.totalKM = trip.endKM - trip.startKM;
    }

    // Handle updating parking expense
    if (parkingAmount !== undefined && parkingAmount !== '') {
        const pAmt = Number(parkingAmount);
        const parkingIdx = trip.expenses ? trip.expenses.findIndex(e => e.category === 'Parking/Toll') : -1;
        if (parkingIdx !== -1) {
            trip.expenses[parkingIdx].amount = pAmt;
            trip.expenses[parkingIdx].paidBy = parkingPaidBy || 'Self';
        } else if (pAmt > 0) {
            if (!trip.expenses) trip.expenses = [];
            trip.expenses.push({
                category: 'Parking/Toll',
                amount: pAmt,
                paidBy: parkingPaidBy || 'Self',
                note: 'Added via Edit'
            });
        }
    }

    await trip.save();
    res.json(trip);
};

module.exports = { startTrip, endTrip, addTripExpense, getTrips, getActiveTrip, deleteTrip, updateTrip };
