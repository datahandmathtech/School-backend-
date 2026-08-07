const Maintenance = require('../models/Maintenance');
const Auto = require('../models/Auto');
const InventoryItem = require('../models/InventoryItem');
const InventoryTransaction = require('../models/InventoryTransaction');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Record maintenance
// @route   POST /api/maintenance
// @access  Private/Admin
const addMaintenance = async (req, res) => {
    const { autoId, partsReplaced, inventoryItemsUsed, totalCost, serviceCost, vendorName, nextServiceDate, description, isOutsourced, serviceCategory, specificTasks, kmReading, billNumber, paymentStatus, billPhotoBase64, maintenanceDate } = req.body;

    let billPhoto = '';
    if (billPhotoBase64) {
        try {
            const uploadRes = await cloudinary.uploader.upload(billPhotoBase64, {
                folder: 'fleet_management/bills'
            });
            billPhoto = uploadRes.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            res.status(500);
            throw new Error('Image upload failed');
        }
    }

    // Deduct inventory items
    if (inventoryItemsUsed && inventoryItemsUsed.length > 0) {
        for (let part of inventoryItemsUsed) {
            const item = await InventoryItem.findById(part.itemId);
            if (item) {
                item.stockQuantity = Math.max(0, item.stockQuantity - part.quantity);
                item.totalUsed = (item.totalUsed || 0) + part.quantity;
                await item.save();
            }
        }
    }

    const maintenance = await Maintenance.create({
        auto: autoId,
        serviceCategory,
        specificTasks,
        partsReplaced,
        serviceCost,
        totalCost,
        vendorName,
        nextServiceDate,
        description,
        isOutsourced,
        kmReading: kmReading || 0,
        billNumber,
        billPhoto,
        paymentStatus: paymentStatus || 'PAID',
        maintenanceDate: maintenanceDate || Date.now()
    });

    // Update auto's last and next service dates
    await Auto.findByIdAndUpdate(autoId, {
        lastServiceDate: new Date(),
        nextServiceDate,
        status: 'Active' // Assuming it's ready after maintenance
    });

    // Create InventoryTransaction for used items AFTER maintenance is created
    if (inventoryItemsUsed && inventoryItemsUsed.length > 0) {
        for (let part of inventoryItemsUsed) {
            await InventoryTransaction.create({
                item: part.itemId,
                type: 'USE',
                quantity: part.quantity,
                date: maintenanceDate || Date.now(), // Using provided date for transaction
                reference: `Used in Maintenance for Vehicle`,
                maintenanceId: maintenance._id
            });
        }
    }

    res.status(201).json(maintenance);
};

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Private/Admin
const getAllMaintenance = async (req, res) => {
    const records = await Maintenance.find({})
        .populate({
            path: 'auto',
            select: 'rcNumber autoNumber currentDriver model',
            populate: {
                path: 'currentDriver',
                select: 'name'
            }
        })
        .sort({ maintenanceDate: -1 });
    res.json(records);
};

// @desc    Get maintenance history for an auto
// @route   GET /api/maintenance/auto/:autoId
// @access  Private
const getAutoMaintenanceHistory = async (req, res) => {
    const history = await Maintenance.find({ auto: req.params.autoId }).sort({ maintenanceDate: -1 });
    res.json(history);
};

// @desc    Update maintenance record
// @route   PUT /api/maintenance/:id
// @access  Private/Admin
const updateMaintenance = async (req, res) => {
    const { kmReading, billNumber, paymentStatus, vendorName, serviceCost, billPhotoBase64, nextServiceDate, partsReplaced, inventoryItemsUsed, maintenanceDate } = req.body;
    const record = await Maintenance.findById(req.params.id);

    if (record) {
        let billPhoto = record.billPhoto;
        if (billPhotoBase64) {
            try {
                const uploadRes = await cloudinary.uploader.upload(billPhotoBase64, {
                    folder: 'fleet_management/bills'
                });
                billPhoto = uploadRes.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                res.status(500);
                throw new Error('Image upload failed');
            }
        }

        // Deduct inventory items (for newly added parts during edit)
        if (inventoryItemsUsed && inventoryItemsUsed.length > 0) {
            for (let part of inventoryItemsUsed) {
                const item = await InventoryItem.findById(part.itemId);
                if (item) {
                    item.stockQuantity = Math.max(0, item.stockQuantity - part.quantity);
                    item.totalUsed = (item.totalUsed || 0) + part.quantity;
                    await item.save();

                    await InventoryTransaction.create({
                        item: part.itemId,
                        type: 'USE',
                        quantity: part.quantity,
                        date: maintenanceDate || Date.now(),
                        reference: `Used in Updated Maintenance for Vehicle`,
                        maintenanceId: record._id
                    });
                }
            }
        }

        record.kmReading = kmReading !== undefined ? kmReading : record.kmReading;
        record.billNumber = billNumber !== undefined ? billNumber : record.billNumber;
        record.paymentStatus = paymentStatus || record.paymentStatus;
        record.vendorName = vendorName || record.vendorName;
        record.serviceCost = serviceCost !== undefined ? serviceCost : record.serviceCost;
        record.billPhoto = billPhoto;
        record.nextServiceDate = nextServiceDate || record.nextServiceDate;
        record.maintenanceDate = maintenanceDate || record.maintenanceDate;
        if (partsReplaced) {
            record.partsReplaced = partsReplaced;
        }
        
        // Recalculate total cost if service cost or parts changes
        const partsCost = record.partsReplaced.reduce((acc, part) => acc + part.cost, 0);
        record.totalCost = Number(record.serviceCost) + partsCost;

        const updatedRecord = await record.save();
        res.json(updatedRecord);
    } else {
        res.status(404);
        throw new Error('Maintenance record not found');
    }
};

// @desc    Delete maintenance record
// @route   DELETE /api/maintenance/:id
// @access  Private/Admin
const deleteMaintenance = async (req, res) => {
    const record = await Maintenance.findById(req.params.id);
    if (record) {
        await record.deleteOne();
        res.json({ message: 'Maintenance record removed' });
    } else {
        res.status(404);
        throw new Error('Maintenance record not found');
    }
};

module.exports = { addMaintenance, getAutoMaintenanceHistory, getAllMaintenance, deleteMaintenance, updateMaintenance };
