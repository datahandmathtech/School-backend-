const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            isOutsideCar: Boolean,
            dutyAmount: Number,
            transactionType: String,
            eventId: mongoose.Schema.Types.Mixed
        }, { collection: 'vehicles' }));

        const cars = await Vehicle.find({ isOutsideCar: true });
        console.log('Total:', cars.length);
        console.log('Buy:', cars.filter(c => (c.transactionType || 'Buy') === 'Buy').length);
        console.log('Sell:', cars.filter(c => c.transactionType === 'Sell').length);
        
        const sells = cars.filter(c => c.transactionType === 'Sell');
        sells.forEach(s => console.log('Sell amount:', s.dutyAmount));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();
