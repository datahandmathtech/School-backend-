const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    auto: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    dutyType: { type: String, default: 'City Local (Base Only)' },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    startKM: { type: Number, required: true },
    endKM: { type: Number },
    totalKM: { type: Number },
    pickupLocation: { type: String },
    dropLocation: { type: String },
    batteryUsed: { type: Number }, // Percentage
    earnings: { type: Number, default: 0 },
    expenses: [{
        category: { type: String, enum: ['Fuel', 'Parking/Toll', 'Charging', 'Repair', 'Other'] },
        amount: { type: Number },
        paidBy: { type: String, enum: ['Self', 'Office'], default: 'Office' },
        note: { type: String }
    }],
    totalExpenses: { type: Number, default: 0 },
    allowanceTA: { type: Number, default: 0 },
    nightStayAmount: { type: Number, default: 0 },
    otherBonuses: { type: Number, default: 0 },
    netEarnings: { type: Number },
    notes: { type: String },
    wage: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
