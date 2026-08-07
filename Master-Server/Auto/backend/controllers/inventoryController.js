const InventoryItem = require('../models/InventoryItem');
const InventoryTransaction = require('../models/InventoryTransaction');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
const getInventory = async (req, res) => {
    const items = await InventoryItem.find({}).sort({ itemName: 1 });
    res.json(items);
};

// @desc    Add new inventory item
// @route   POST /api/inventory
// @access  Private/Admin
const addInventoryItem = async (req, res) => {
    const { itemName, category, stockQuantity, unitPrice, minStockLevel, description, billPhotoBase64, date } = req.body;

    const itemExists = await InventoryItem.findOne({ itemName });

    let billPhoto = '';
    if (billPhotoBase64) {
        try {
            const uploadRes = await cloudinary.uploader.upload(billPhotoBase64, {
                folder: 'fleet_management/inventory_bills'
            });
            billPhoto = uploadRes.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            res.status(500);
            throw new Error('Image upload failed');
        }
    }

    if (itemExists) {
        // Restock existing item
        const oldStock = itemExists.stockQuantity;
        const qtyDiff = Number(stockQuantity);
        itemExists.stockQuantity += qtyDiff;
        itemExists.totalPurchased = (itemExists.totalPurchased || oldStock) + qtyDiff;
        
        if (unitPrice) itemExists.unitPrice = unitPrice;
        if (billPhoto) itemExists.billPhoto = billPhoto; // Update receipt to latest purchase
        if (description) itemExists.description = description;
        
        const updatedItem = await itemExists.save();

        await InventoryTransaction.create({
            item: updatedItem._id,
            type: 'ADD',
            quantity: qtyDiff,
            reference: `Stock Adjusted (${qtyDiff > 0 ? 'Added' : 'Removed'})`,
            date: date || Date.now()
        });

        return res.status(200).json(updatedItem);
    }

    const item = await InventoryItem.create({
        itemName,
        category,
        stockQuantity,
        totalPurchased: stockQuantity,
        unitPrice,
        minStockLevel,
        description,
        billPhoto
    });

    await InventoryTransaction.create({
        item: item._id,
        type: 'ADD',
        quantity: Number(stockQuantity),
        reference: 'Initial Stock Added',
        date: date || Date.now()
    });

    res.status(201).json(item);
};

// @desc    Update inventory stock or details
// @route   PUT /api/inventory/:id
// @access  Private/Admin
const updateInventoryItem = async (req, res) => {
    const { itemName, category, stockQuantity, unitPrice, minStockLevel, description, billPhotoBase64, date } = req.body;

    const item = await InventoryItem.findById(req.params.id);

    if (item) {
        let billPhoto = item.billPhoto;
        if (billPhotoBase64) {
            try {
                const uploadRes = await cloudinary.uploader.upload(billPhotoBase64, {
                    folder: 'fleet_management/inventory_bills'
                });
                billPhoto = uploadRes.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                res.status(500);
                throw new Error('Image upload failed');
            }
        }

        item.itemName = itemName || item.itemName;
        item.category = category || item.category;
        item.stockQuantity = stockQuantity !== undefined ? stockQuantity : item.stockQuantity;
        item.unitPrice = unitPrice !== undefined ? unitPrice : item.unitPrice;
        item.minStockLevel = minStockLevel !== undefined ? minStockLevel : item.minStockLevel;
        item.description = description || item.description;
        item.billPhoto = billPhoto;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private/Admin
const deleteInventoryItem = async (req, res) => {
    const item = await InventoryItem.findById(req.params.id);

    if (item) {
        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
};

// @desc    Get item transaction history
// @route   GET /api/inventory/:id/transactions
// @access  Private
const getItemTransactions = async (req, res) => {
    const transactions = await InventoryTransaction.find({ item: req.params.id })
        .populate('maintenanceId', 'billNumber vendorName auto')
        .sort({ date: -1 });
    res.json(transactions);
};

module.exports = { getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem, getItemTransactions };
