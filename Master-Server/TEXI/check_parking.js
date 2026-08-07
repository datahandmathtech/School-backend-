const mongoose = require('mongoose');
const Attendance = require('./backend/src/models/Attendance');
const Parking = require('./backend/src/models/Parking');
const { DateTime } = require('luxon');

const URI = 'mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true';

async function check() {
    await mongoose.connect(URI);
    const start = '2026-02-01';
    const end = '2026-02-28';

    const parkings = await Parking.find({
        date: { $gte: new Date(start), $lte: new Date(end) }
    });
    const parkTotal = parkings.reduce((s, p) => s + p.amount, 0);
    console.log('Parking Collection Total:', parkTotal);
    console.log('Parking Entries Count:', parkings.length);

    const atts = await Attendance.find({
        date: { $gte: start, $lte: end }
    });

    let totalTollParking = 0;
    let totalVerifiedParkingSum = 0;
    let totalPendingParking = 0;

    atts.forEach(a => {
        totalTollParking += (a.punchOut?.tollParkingAmount || 0);
        totalVerifiedParkingSum += (a.parking || []).reduce((sum, e) => sum + (e.amount || 0), 0);
        (a.pendingExpenses || []).forEach(e => {
            if (e.status === 'pending' && (e.type === 'parking' || e.type === 'other')) {
                totalPendingParking += (e.amount || 0);
            }
        });
    });

    console.log('Attendance Records Count:', atts.length);
    console.log('Attendance [punchOut.tollParkingAmount] Sum:', totalTollParking);
    console.log('Attendance [parking] array Sum:', totalVerifiedParkingSum);
    console.log('Attendance Pending Parking Sum:', totalPendingParking);

    process.exit(0);
}

check().catch(err => {
    console.error(err);
    process.exit(1);
});
