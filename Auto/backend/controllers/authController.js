const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../debug_login.log');
function debugLog(msg) {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - ${msg}\n`);
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    debugLog(`Login attempt for email: ${email}`);

    const user = await User.findOne({ 
        $or: [
            { email: new RegExp(`^${email.trim()}$`, 'i') },
            { username: new RegExp(`^${email.trim()}$`, 'i') }
        ]
    });
    if (user) {
        debugLog(`User found: ${user.email}`);
        const isMatch = await user.matchPassword(password);
        debugLog(`Password match result for "${password}": ${isMatch}`);
    } else {
        debugLog(`User NOT found for email: ${email}`);
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            permissions: user.permissions,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Admin
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'driver',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { loginUser, registerUser, getUserProfile };
