const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:\\Users\\ABHAY\\OneDrive\\Desktop\\TEXI\\backend\\.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Attendance = mongoose.model('Attendance', new mongoose.Schema({
            dailyWage: Number,
            date: String,
            eventId: mongoose.Schema.Types.Mixed
        }, { collection: 'attendances' }));

        const highWage = await Attendance.find({ dailyWage: { $gte: 1000 } }).lean();
        console.log('--- HIGH WAGE ATTENDANCE ---');
        highWage.forEach(a => {
            console.log('Date:', a.date, 'Wage:', a.dailyWage, 'EventId:', a.eventId);
        });

        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
