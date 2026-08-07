const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all executives / admins
// @route   GET /api/admin/executives
// @access  Private/Admin
const getAllExecutives = asyncHandler(async (req, res) => {
    let query = { role: { $in: ['executive', 'admin', 'Executive', 'Admin'] } };

    // You can add more filters here if needed.
    // For Yatree Auto, we don't have multi-tenant company filters,
    // so we can just return all executives for the admin.

    const executives = await User.find(query).select('-password');
    res.json(executives);
});

// @desc    Create a new executive user
// @route   POST /api/admin/executives
// @access  Private/Admin
const createExecutive = asyncHandler(async (req, res) => {
    const { name, mobile, username, password, permissions } = req.body;

    if (!name || !mobile || !password || !username) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for existing user by mobile or username (or email, since we use email interchangeably)
    const userExists = await User.findOne({
        $or: [
            { mobile: mobile },
            { username: { $regex: new RegExp(`^${username.trim()}$`, 'i') } },
            { email: { $regex: new RegExp(`^${username.trim()}@`, 'i') } } // Fallback check
        ]
    });

    if (userExists) {
        const msg = userExists.mobile === mobile
            ? 'User already exists with this mobile number'
            : 'User already exists with this username';
        return res.status(400).json({ message: msg });
    }

    try {
        // Create user instance explicitly to ensure pre-save hooks (hashing) run
        const executive = new User({
            name,
            mobile,
            username,
            email: `${username}@yatreedestination.com`, // Email is required in User schema, we generate a dummy one if it's just a username
            password,
            role: 'executive',
            permissions: permissions || {
                dashboard: true,
                liveFeed: true,
                logBook: true,
                driversServices: false,
                vehiclesMgt: false,
                vehiclesLife: false,
                staffManagement: false,
                manageAdmins: false
            }
        });

        await executive.save();
        res.status(201).json(executive);
    } catch (error) {
        console.error('Error creating executive:', error);
        res.status(500).json({ message: 'Server error while creating admin', error: error.message });
    }
});

// @desc    Update an executive user permissions
// @route   PUT /api/admin/executives/:id
// @access  Private/Admin
const updateExecutive = asyncHandler(async (req, res) => {
    const { name, mobile, username, password, permissions, status } = req.body;
    const executive = await User.findById(req.params.id);

    const validRoles = ['executive', 'admin', 'superadmin'];
    if (executive && validRoles.includes((executive.role || '').toLowerCase())) {
        executive.name = name || executive.name;
        if (mobile && mobile !== executive.mobile) {
            const mobileExists = await User.findOne({ mobile, _id: { $ne: executive._id } });
            if (mobileExists) return res.status(400).json({ message: 'Mobile number already in use' });
            executive.mobile = mobile;
        }
        if (username && username !== executive.username) {
            const usernameExists = await User.findOne({
                username: { $regex: new RegExp(`^${username.trim()}$`, 'i') },
                _id: { $ne: executive._id }
            });
            if (usernameExists) return res.status(400).json({ message: 'Username already in use' });
            executive.username = username;
            executive.email = `${username}@yatreedestination.com`;
        }
        
        // Status is not in current User schema, but we can just ignore or add it later if needed.

        if (permissions) {
            executive.permissions = permissions;
            executive.markModified('permissions');
        }

        if (password) {
            executive.password = password;
        }

        const updatedUser = await executive.save();
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'Executive user not found' });
    }
});

// @desc    Delete an executive user
// @route   DELETE /api/admin/executives/:id
// @access  Private/Admin
const deleteExecutive = asyncHandler(async (req, res) => {
    const executive = await User.findById(req.params.id);
    const validRoles = ['executive', 'admin', 'superadmin'];
    if (executive && validRoles.includes((executive.role || '').toLowerCase())) {
        await User.deleteOne({ _id: executive._id });
        res.json({ message: 'Executive user removed' });
    } else {
        res.status(404).json({ message: 'Executive user not found' });
    }
});

module.exports = {
    getAllExecutives,
    createExecutive,
    updateExecutive,
    deleteExecutive
};
