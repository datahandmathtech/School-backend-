const express = require('express');
const router = express.Router();
const { getLiveFeed } = require('../controllers/liveFeedController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getLiveFeed);

module.exports = router;
