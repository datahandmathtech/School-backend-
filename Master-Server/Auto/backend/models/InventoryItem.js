const mongoose = require('mongoose');

const inventoryItemSchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        stockQuantity: {
            type: Number,
            required: true,
            default: 0
        },
        totalPurchased: {
            type: Number,
            default: 0
        },
        totalUsed: {
            type: Number,
            default: 0
        },
        unitPrice: {
            type: Number,
            required: true,
            default: 0
        },
        minStockLevel: {
            type: Number,
            default: 5
        },
        description: {
            type: String
        },
        billPhoto: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
