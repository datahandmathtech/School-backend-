const mongoose = require('mongoose');

const autoSchema = new mongoose.Schema({
    autoNumber: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    rcNumber: { type: String, required: false },
    rcExpiry: { type: Date, required: false },
    batteryStatus: { type: Number, default: 100 }, // Percentage
    insuranceExpiry: { type: Date, required: false },
    rcPhoto: { type: String }, // URL or Base64
    insurancePhoto: { type: String }, // URL or Base64
    status: {
        type: String,
        enum: ['Active', 'Maintenance', 'Inactive'],
        default: 'Active'
    },
    lastServiceDate: { type: Date },
    nextServiceDate: { type: Date },
    lastKM: { type: Number, default: 0 },
    currentDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Auto', autoSchema);
