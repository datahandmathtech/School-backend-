const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            carNumber: String,
            dutyAmount: Number,
            eventId: mongoose.Schema.Types.Mixed,
            isOutsideCar: Boolean,
            company: mongoose.Schema.Types.ObjectId
        }, { collection: 'vehicles' }));

        const cars = await Vehicle.find({ dutyAmount: 3000 }).lean();
        console.log('--- DUTY AMOUNT 3000 ---');
        cars.forEach(c => {
            console.log('Vehicle:', c.carNumber, 'Outside:', c.isOutsideCar, 'EventId:', c.eventId);
        });

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
