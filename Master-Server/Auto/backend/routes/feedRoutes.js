const express = require('express');
const router = express.Router();
const { getLiveFeed } = require('../controllers/feedController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getLiveFeed);

module.exports = router;
