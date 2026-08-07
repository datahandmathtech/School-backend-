const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            carNumber: String,
            dutyAmount: Number,
            transactionType: String,
            eventId: mongoose.Schema.Types.Mixed,
            isOutsideCar: Boolean,
            company: mongoose.Schema.Types.ObjectId
        }, { collection: 'vehicles' }));

        const companyId = '67d667c4b6f63402484f7b2a'; // yatree
        const start = "2026-03-01";
        const end = "2026-03-31";

        const all = await Vehicle.find({ company: companyId, isOutsideCar: true }).lean();
        
        // Filter by Mar 2026 using carNumber suffix logic
        const marCars = all.filter(v => {
            const d = v.carNumber?.split('#')[1];
            return d && d >= start && d <= end;
        });

        console.log('--- DIAGNOSTIC RESULTS ---');
        console.log('Total Mar Outside Vehicles:', marCars.length);

        const buyNoEvent = marCars.filter(v => (!v.eventId || v.eventId === 'undefined') && (v.transactionType || 'Buy') === 'Buy');
        console.log('Buy (No Event) Total: ₹', buyNoEvent.reduce((s,v) => s + (Number(v.dutyAmount)||0), 0));

        const buyWithEvent = marCars.filter(v => (v.eventId && v.eventId !== 'undefined') && (v.transactionType || 'Buy') === 'Buy');
        console.log('Buy (With Event) Total: ₹', buyWithEvent.reduce((s,v) => s + (Number(v.dutyAmount)||0), 0));

        const otherWithEvent = marCars.filter(v => (v.eventId && v.eventId !== 'undefined') && (v.transactionType || 'Buy') !== 'Buy');
        console.log('Non-Buy (With Event) Total: ₹', otherWithEvent.reduce((s,v) => s + (Number(v.dutyAmount)||0), 0));

        const otherNoEvent = marCars.filter(v => (!v.eventId || v.eventId === 'undefined') && (v.transactionType || 'Buy') !== 'Buy');
        console.log('Non-Buy (No Event) Total: ₹', otherNoEvent.reduce((s,v) => s + (Number(v.dutyAmount)||0), 0));

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
