const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

const vehicleSchema = new mongoose.Schema({
    carNumber: String,
    dutyAmount: { type: Number, default: 0 },
    isOutsideCar: Boolean,
    transactionType: String,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    createdAt: Date
}, { collection: 'vehicles' });

const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

const run = async () => {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        const cars = await Vehicle.find({ isOutsideCar: true });
        console.log(`Total Outside Cars: ${cars.length}`);
        
        const buyCars = cars.filter(c => (c.transactionType || 'Buy') === 'Buy' && !c.eventId);
        const sellCars = cars.filter(c => c.transactionType === 'Sell' && !c.eventId);
        const eventCars = cars.filter(c => c.eventId);
        
        console.log(`Buy Total (No Event): ₹${buyCars.reduce((s, c) => s + (Number(c.dutyAmount) || 0), 0)}`);
        console.log(`Sell Total (No Event): ₹${sellCars.reduce((s, c) => s + (Number(c.dutyAmount) || 0), 0)}`);
        console.log(`Event Total: ₹${eventCars.reduce((s, c) => s + (Number(c.dutyAmount) || 0), 0)}`);
        
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
};

run();
