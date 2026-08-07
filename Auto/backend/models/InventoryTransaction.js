const mongoose = require('mongoose');

const inventoryTransactionSchema = mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InventoryItem',
            required: true
        },
        type: {
            type: String,
            enum: ['ADD', 'USE'],
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        reference: {
            type: String
        },
        maintenanceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Maintenance'
        }
    },
    {
        timestamps: true
    }
);

const InventoryTransaction = mongoose.model('InventoryTransaction', inventoryTransactionSchema);

module.exports = InventoryTransaction;
