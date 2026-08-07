const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    remarks: { type: String },
    givenBy: { type: String, enum: ['Office', 'Client'], default: 'Office' },
    isStaffAdvance: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Advance', advanceSchema);
