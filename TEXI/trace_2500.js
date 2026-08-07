const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            carNumber: String,
            dutyAmount: Number,
            transactionType: String,
            isOutsideCar: Boolean
        }, { collection: 'vehicles' }));

        const cars = await Vehicle.find({ dutyAmount: 2500, isOutsideCar: true }).lean();
        console.log('--- DUTIES WITH AMOUNT 2500 ---');
        cars.forEach(c => {
            console.log('Car:', c.carNumber, 'Type:', c.transactionType);
        });

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
