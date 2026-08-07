const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    auto: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto', required: true },
    serviceCategory: { 
        type: String, 
        required: false,
        enum: [
            'Battery Check', 
            'Wiring Inspection', 
            'Lights & Indicators', 
            'Starter Motor & Self System', 
            'Alternator / Charging System', 
            'Fuse & Relay Check', 
            'Horn & Switches', 
            'Dashboard & Meter',
            'Engine Overhaul',
            'Tire Replacement',
            'Body / Interior',
            'Others'
        ]
    },
    specificTasks: [String],
    partsReplaced: [{
        name: { type: String, required: true },
        cost: { type: Number, required: true }
    }],
    kmReading: { type: Number, required: true, default: 0 },
    billNumber: { type: String, required: false },
    billPhoto: { type: String, required: false },
    paymentStatus: { type: String, enum: ['PAID', 'PENDING'], default: 'PAID' },
    maintenanceDate: { type: Date, default: Date.now },
    serviceCost: { type: Number, default: 0 },
    totalCost: { type: Number, required: true },
    vendorName: { type: String, required: true },
    nextServiceDate: { type: Date, required: true },
    description: { type: String },
    isOutsourced: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
