const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseNumber: { type: String, required: false },
    licensePhoto: { type: String, required: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['On Duty', 'Off Duty', 'On Leave'], default: 'Off Duty' },
    assignedAuto: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto', default: null },
    dailyWage: { type: Number, default: 0 },
    nightStayBonus: { type: Number, default: 0 },
    sameDayReturnBonus: { type: Number, default: 0 },
    sameDayReturnEnabled: { type: Boolean, default: false },
    driverType: { type: String, enum: ['STAFF', 'FREELANCER'], default: 'STAFF' },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
