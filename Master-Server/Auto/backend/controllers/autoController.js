const Auto = require('../models/Auto');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all autos
// @route   GET /api/autos
// @access  Private/Admin
const getAutos = async (req, res) => {
    const autos = await Auto.find({}).populate('currentDriver', 'name email');
    res.json(autos);
};

// @desc    Get single auto
// @route   GET /api/autos/:id
// @access  Private
const getAutoById = async (req, res) => {
    const auto = await Auto.findById(req.params.id);
    if (auto) {
        res.json(auto);
    } else {
        res.status(404);
        throw new Error('Auto not found');
    }
};

// @desc    Create an auto
// @route   POST /api/autos
// @access  Private/Admin
const createAuto = async (req, res) => {
    console.log('--- CREATE AUTO DEBUG ---');
    console.log('Method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);
    const { autoNumber, model, insuranceExpiry, rcNumber, rcExpiry, lastKM } = req.body || {};

    const autoExists = await Auto.findOne({ autoNumber });
    if (autoExists) {
        res.status(400);
        throw new Error('Auto with this number already exists');
    }

    let rcPhoto = '';
    let insurancePhoto = '';

    if (req.files) {
        try {
            const uploadOpts = { 
                folder: 'auto_fleet_docs',
                cloud_name: 'donqb7fnf',
                api_key: '276661994538188',
                api_secret: 'gaU-kRZD8ce5dXpurN3rwq1ea8E'
            };
            
            const uploadPromises = [];
            
            if (req.files.rcPhoto) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.rcPhoto[0].path, uploadOpts).then(res => {
                        rcPhoto = res.secure_url;
                        fs.unlinkSync(req.files.rcPhoto[0].path);
                    })
                );
            }
            if (req.files.insurancePhoto) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.insurancePhoto[0].path, uploadOpts).then(res => {
                        insurancePhoto = res.secure_url;
                        fs.unlinkSync(req.files.insurancePhoto[0].path);
                    })
                );
            }
            
            if (uploadPromises.length > 0) {
                await Promise.all(uploadPromises);
            }
        } catch (error) {
            console.error('Cloudinary upload error in createAuto:', error);
            res.status(500);
            throw new Error('Image upload failed: ' + (error.message || error.toString()));
        }
    }

    const auto = await Auto.create({
        autoNumber,
        model,
        insuranceExpiry,
        rcNumber,
        rcExpiry,
        rcPhoto,
        insurancePhoto,
        lastKM: Number(lastKM) || 0
    });

    res.status(201).json(auto);
};

// @desc    Update auto
// @route   PUT /api/autos/:id
// @access  Private/Admin
const updateAuto = async (req, res) => {
    console.log('--- UPDATE AUTO DEBUG ---');
    console.log('Method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    const { autoNumber, model, insuranceExpiry, status, batteryStatus, rcNumber, rcExpiry, lastKM } = req.body || {};

    const auto = await Auto.findById(req.params.id);

    if (auto) {
        auto.autoNumber = autoNumber || auto.autoNumber;
        auto.model = model || auto.model;
        auto.insuranceExpiry = insuranceExpiry || auto.insuranceExpiry;
        auto.rcNumber = rcNumber || auto.rcNumber;
        auto.rcExpiry = rcExpiry || auto.rcExpiry;
        auto.status = status || auto.status;
        auto.batteryStatus = batteryStatus !== undefined ? Number(batteryStatus) : auto.batteryStatus;
        auto.lastKM = lastKM !== undefined ? Number(lastKM) : auto.lastKM;

        if (req.files) {
            try {
                const uploadOpts = { 
                    folder: 'auto_fleet_docs',
                    cloud_name: 'donqb7fnf',
                    api_key: '276661994538188',
                    api_secret: 'gaU-kRZD8ce5dXpurN3rwq1ea8E'
                };
                
                const uploadPromises = [];
                
                if (req.files.rcPhoto) {
                    uploadPromises.push(
                        cloudinary.uploader.upload(req.files.rcPhoto[0].path, uploadOpts).then(res => {
                            auto.rcPhoto = res.secure_url;
                            fs.unlinkSync(req.files.rcPhoto[0].path);
                        })
                    );
                }
                if (req.files.insurancePhoto) {
                    uploadPromises.push(
                        cloudinary.uploader.upload(req.files.insurancePhoto[0].path, uploadOpts).then(res => {
                            auto.insurancePhoto = res.secure_url;
                            fs.unlinkSync(req.files.insurancePhoto[0].path);
                        })
                    );
                }
                
                if (uploadPromises.length > 0) {
                    await Promise.all(uploadPromises);
                }
            } catch (error) {
                console.error('Cloudinary upload error in updateAuto:', error);
                res.status(500);
                throw new Error('Image upload failed: ' + (error.message || error.toString()));
            }
        }

        const updatedAuto = await auto.save();
        res.json(updatedAuto);
    } else {
        res.status(404);
        throw new Error('Auto not found');
    }
};

// @desc    Delete auto
// @route   DELETE /api/autos/:id
// @access  Private/Admin
const deleteAuto = async (req, res) => {
    const auto = await Auto.findById(req.params.id);

    if (auto) {
        await auto.deleteOne();
        res.json({ message: 'Auto removed' });
    } else {
        res.status(404);
        throw new Error('Auto not found');
    }
};

module.exports = { getAutos, getAutoById, createAuto, updateAuto, deleteAuto };
