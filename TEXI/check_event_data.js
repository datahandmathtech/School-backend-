const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
            carNumber: String,
            isOutsideCar: Boolean,
            dutyAmount: Number,
            company: mongoose.Schema.Types.ObjectId
        }, { collection: 'vehicles' }));

        const v = await Vehicle.findOne({ carNumber: /6113/ });
        console.log('--- VEHICLE INFO ---');
        if (v) {
            console.log('Plate:', v.carNumber);
            console.log('Is Outside Car:', v.isOutsideCar);
            console.log('Default Duty Amount:', v.dutyAmount);
        } else {
            console.log('Vehicle not found');
        }

        const Attendance = mongoose.model('Attendance', new mongoose.Schema({
            vehicle: mongoose.Schema.Types.ObjectId,
            eventId: mongoose.Schema.Types.Mixed,
            date: String,
            dutyAmount: Number // Does it exist?
        }, { collection: 'attendances' }));

        const atts = await Attendance.find({ date: '2026-03-16' }).populate('vehicle').lean();
        console.log('--- ATTENDANCE FOR 2026-03-16 ---');
        atts.filter(a => a.eventId).forEach(a => {
            console.log('Attendance:', a.vehicle?.carNumber, 'EventId:', a.eventId, 'Amount:', a.dutyAmount);
        });

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
