const express = require('express');
const router = express.Router();
const { getAutos, getAutoById, createAuto, updateAuto, deleteAuto } = require('../controllers/autoController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(protect, getAutos)
    .post(protect, admin, upload.fields([
        { name: 'rcPhoto', maxCount: 1 },
        { name: 'insurancePhoto', maxCount: 1 }
    ]), createAuto);

router.route('/:id')
    .get(protect, getAutoById)
    .put(protect, admin, upload.fields([
        { name: 'rcPhoto', maxCount: 1 },
        { name: 'insurancePhoto', maxCount: 1 }
    ]), updateAuto)
    .delete(protect, admin, deleteAuto);

module.exports = router;
