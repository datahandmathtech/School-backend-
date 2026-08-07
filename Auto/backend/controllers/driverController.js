const User = require('../models/User');
const Driver = require('../models/Driver');
const Auto = require('../models/Auto');
const Trip = require('../models/Trip');
const cloudinary = require('cloudinary').v2;

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private/Admin
const getDrivers = async (req, res) => {
    const drivers = await Driver.find({}).populate('user', 'name email').populate('assignedAuto');
    res.json(drivers);
};

// @desc    Get driver by user ID
// @route   GET /api/drivers/profile/:userId
// @access  Private
const getDriverProfile = async (req, res) => {
    const driver = await Driver.findOne({ user: req.params.userId }).populate('user', 'name email').populate('assignedAuto');
    if (driver) {
        res.json(driver);
    } else {
        res.status(404);
        throw new Error('Driver profile not found');
    }
};

// @desc    Create/Update driver profile
// @route   POST /api/drivers
// @access  Private/Admin
const saveDriverProfile = async (req, res) => {
    const { userId, licenseNumber, phone, address, licensePhotoBase64, dailyWage, nightStayBonus, sameDayReturnBonus, sameDayReturnEnabled, driverType } = req.body;

    let licensePhoto = '';
    if (licensePhotoBase64) {
        try {
            const uploadRes = await cloudinary.uploader.upload(licensePhotoBase64, {
                folder: 'auto_fleet_docs/licenses'
            });
            licensePhoto = uploadRes.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            res.status(500);
            throw new Error('Image upload failed');
        }
    }

    let driver = await Driver.findOne({ user: userId });

    if (driver) {
        driver.licenseNumber = licenseNumber !== undefined ? licenseNumber : driver.licenseNumber;
        if (licensePhoto) driver.licensePhoto = licensePhoto;
        driver.phone = phone || driver.phone;
        driver.address = address || driver.address;
        
        // Financial Updates
        driver.dailyWage = dailyWage !== undefined ? dailyWage : driver.dailyWage;
        driver.nightStayBonus = nightStayBonus !== undefined ? nightStayBonus : driver.nightStayBonus;
        driver.sameDayReturnBonus = sameDayReturnBonus !== undefined ? sameDayReturnBonus : driver.sameDayReturnBonus;
        if (driverType) driver.driverType = driverType;
        driver.sameDayReturnEnabled = sameDayReturnEnabled !== undefined ? sameDayReturnEnabled : driver.sameDayReturnEnabled;

        const updatedDriver = await driver.save();
        res.json(updatedDriver);
    } else {
        driver = await Driver.create({
            user: userId,
            licenseNumber,
            licensePhoto,
            phone,
            address,
            dailyWage: dailyWage || 0,
            nightStayBonus: nightStayBonus || 0,
            sameDayReturnBonus: sameDayReturnBonus || 0,
            sameDayReturnEnabled: sameDayReturnEnabled || false,
            driverType: driverType || 'STAFF'
        });
        res.status(201).json(driver);
    }
};

// @desc    Assign auto to driver
// @route   PUT /api/drivers/assign
// @access  Private/Admin
const assignAuto = async (req, res) => {
    const { driverId, autoId } = req.body;

    const driver = await Driver.findById(driverId);
    const auto = await Auto.findById(autoId);

    if (!driver || !auto) {
        res.status(404);
        throw new Error('Driver or Auto not found');
    }

    // Clear previous assignments if any
    if (driver.assignedAuto) {
        await Auto.findByIdAndUpdate(driver.assignedAuto, { currentDriver: null });
    }

    driver.assignedAuto = autoId;
    driver.status = 'On Duty';
    auto.currentDriver = driver.user;
    auto.status = 'Active';

    // Automatically create a Live Trip entry for the CRM
    const newTrip = await Trip.create({
        auto: autoId,
        driver: driver.user, // Using user ID for reference
        startTime: new Date(),
        startKM: auto.lastKM || 0, // Using auto's mileage history
        status: 'Active',
        notes: 'Duty assigned by Admin'
    });

    await driver.save();
    await auto.save();

    res.json({ message: 'Auto assigned and duty started', driver, auto, tripId: newTrip._id });
};

// @desc    Delete a Driver Profile
// @route   DELETE /api/drivers/:id
// @access  Private/Admin
const deleteDriver = async (req, res) => {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
        res.status(404);
        throw new Error('Driver not found');
    }
    
    await User.findByIdAndDelete(driver.user);
    await driver.deleteOne();

    res.json({ message: 'Driver removed' });
};

// @desc    Update a Driver Profile
// @route   PUT /api/drivers/:id
// @access  Private/Admin
const updateDriver = async (req, res) => {
    try {
        const { name, phone, address, dailyWage, driverType } = req.body;
        
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        driver.phone = phone !== undefined ? phone : driver.phone;
        driver.address = address !== undefined ? address : driver.address;
        
        if (dailyWage !== undefined && dailyWage !== '') {
            driver.dailyWage = Number(dailyWage);
        } else if (dailyWage === '') {
            driver.dailyWage = 0;
        }

        if (driverType) driver.driverType = driverType;

        await driver.save();

        if (name) {
            const user = await User.findById(driver.user);
            if (user) {
                user.name = name;
                await user.save();
            }
        }

        res.json(driver);
    } catch (error) {
        console.error("Error in updateDriver:", error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = {
    getDrivers,
    getDriverProfile,
    saveDriverProfile,
    assignAuto,
    deleteDriver,
    updateDriver
};
