const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            isOutsideCar: Boolean,
            dutyAmount: Number,
            transactionType: String,
            eventId: mongoose.Schema.Types.Mixed,
            createdAt: Date,
            company: mongoose.Schema.Types.ObjectId
        }, { collection: 'vehicles' }));

        const companyId = '67d667c4b6f63402484f7b2a'; // yatree
        const start = new Date("2026-03-01T00:00:00Z");
        const end = new Date("2026-03-31T23:59:59Z");

        const cars = await Vehicle.find({
            company: companyId,
            isOutsideCar: true,
            createdAt: { $gte: start, $lte: end }
        }).lean();

        console.log('Total Outside Cars this month:', cars.length);
        
        const allAmount = cars.reduce((s, c) => s + (Number(c.dutyAmount) || 0), 0);
        console.log('Total Amount (All): ₹', allAmount);

        const buyNoEvent = cars.filter(v => (!v.eventId || v.eventId === 'undefined') && (v.transactionType || 'Buy') === 'Buy');
        const buyNoEventAmt = buyNoEvent.reduce((s, v) => s + (Number(v.dutyAmount) || 0), 0);
        console.log('Buy (No Event) Amount: ₹', buyNoEventAmt);

        const eventAmt = cars.filter(v => v.eventId && v.eventId !== 'undefined' && (v.transactionType || 'Buy') === 'Buy')
                         .reduce((s, v) => s + (Number(v.dutyAmount) || 0), 0);
        console.log('Event (Buy) Amount: ₹', eventAmt);

        const sellAmt = cars.filter(v => v.transactionType === 'Sell').reduce((s, v) => s + (Number(v.dutyAmount) || 0), 0);
        console.log('Sell Amount: ₹', sellAmt);

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
