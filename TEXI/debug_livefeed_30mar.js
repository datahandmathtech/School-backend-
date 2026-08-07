/**
 * Debug Script: Live Feed Freelancer Salary issue for 30-March-2026
 * Run: node debug_livefeed_30mar.js
 */
const mongoose = require('./taxi-fleet-crm/backend/node_modules/mongoose');
require('dotenv').config({ path: './taxi-fleet-crm/backend/.env' });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const targetDate = '2026-03-30';

async function run() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;

    // 1. Check Freelancer Attendance for 30-March-2026
    console.log('=== 1. FREELANCER ATTENDANCE (30-Mar-2026) ===');
    const attendance = await db.collection('attendances').find({ 
        date: targetDate,
    }).toArray();

    const freelancerAtts = [];
    for (const att of attendance) {
        // Check if driver is freelancer
        if (att.driver) {
            const driver = await db.collection('users').findOne({ _id: att.driver });
            if (driver && driver.isFreelancer) {
                freelancerAtts.push({ att, driver });
            }
        }
        if (att.isFreelancer) {
            freelancerAtts.push({ att, driver: null });
        }
    }

    console.log(`Total attendances on ${targetDate}: ${attendance.length}`);
    console.log(`Freelancer attendances: ${freelancerAtts.length}`);
    
    if (freelancerAtts.length > 0) {
        freelancerAtts.forEach(({ att, driver }) => {
            console.log(`  - Driver: ${driver?.name || 'Unknown'}, dailyWage: ${att.dailyWage}, status: ${att.status}`);
            const wage = Number(att.dailyWage) || 0;
            const sameDayReturn = Number(att.punchOut?.allowanceTA) || 0;
            const nightStay = Number(att.punchOut?.nightStayAmount) || 0;
            const bonuses = Math.max(sameDayReturn + nightStay, Number(att.outsideTrip?.bonusAmount) || 0);
            const parking = att.punchOut?.parkingPaidBy !== 'Office' ? (Number(att.punchOut?.tollParkingAmount) || 0) : 0;
            console.log(`    wage: ${wage}, bonuses: ${bonuses}, parking: ${parking}, TOTAL: ${wage + bonuses + parking}`);
        });
    }

    // 2. Check ALL attendances on 30-March-2026 (check isFreelancer flag)
    console.log('\n=== 2. ALL ATTENDANCES ON 30-MAR-2026 ===');
    for (const att of attendance) {
        const driver = att.driver ? await db.collection('users').findOne({ _id: att.driver }) : null;
        const isFreelancer = driver?.isFreelancer === true || att.isFreelancer === true;
        const drvWage = Number(driver?.dailyWage) || 0;
        const attWage = Number(att.dailyWage) || 0;
        const wage = attWage || drvWage;
        const sameDayReturn = Number(att.punchOut?.allowanceTA) || 0;
        const nightStay = Number(att.punchOut?.nightStayAmount) || 0;
        const bonuses = Math.max(sameDayReturn + nightStay, Number(att.outsideTrip?.bonusAmount) || 0);
        const parking = att.punchOut?.parkingPaidBy !== 'Office' ? (Number(att.punchOut?.tollParkingAmount) || 0) : 0;
        console.log(`  Driver: ${driver?.name || String(att.driver)}, isFreelancer: ${isFreelancer}, wage: ${wage}, bonuses: ${bonuses}, parking: ${parking}`);
    }

    // 3. Check Outside Car Vouchers for 30-March-2026
    console.log('\n=== 3. OUTSIDE CAR VOUCHERS (#2026-03-30) ===');
    const outsideVehicles = await db.collection('vehicles').find({
        isOutsideCar: true,
        carNumber: { $regex: `#${targetDate}` }
    }).toArray();

    console.log(`Outside car vouchers found: ${outsideVehicles.length}`);
    outsideVehicles.forEach(v => {
        console.log(`  carNumber: ${v.carNumber}, dutyAmount: ${v.dutyAmount}`);
    });

    const outsideSalaryTotal = outsideVehicles.reduce((sum, v) => sum + (Number(v.dutyAmount) || 0), 0);
    console.log(`\n  Outside voucher salary total: ₹${outsideSalaryTotal}`);

    // 4. Summary calculation
    console.log('\n=== 4. SUMMARY - HOW ₹2,865 IS CALCULATED ===');
    let freelancerTotal = 0;
    
    for (const att of attendance) {
        const driver = att.driver ? await db.collection('users').findOne({ _id: att.driver }) : null;
        const isFreelancer = driver?.isFreelancer === true || att.isFreelancer === true;
        if (!isFreelancer) continue;

        const attWage = Number(att.dailyWage) || 0;
        const drvWage = Number(driver?.dailyWage) || 0;
        const wage = attWage || drvWage || 0;
        const sameDayReturn = Number(att.punchOut?.allowanceTA) || 0;
        const nightStay = Number(att.punchOut?.nightStayAmount) || 0;
        const bonuses = Math.max(sameDayReturn + nightStay, Number(att.outsideTrip?.bonusAmount) || 0);
        const parking = att.punchOut?.parkingPaidBy !== 'Office' ? (Number(att.punchOut?.tollParkingAmount) || 0) : 0;
        freelancerTotal += (wage + bonuses + parking);
        console.log(`  Freelancer att contribution: ₹${wage + bonuses + parking}`);
    }

    freelancerTotal += outsideSalaryTotal;
    console.log(`  Outside voucher contribution: ₹${outsideSalaryTotal}`);
    console.log(`\n  TOTAL FREELANCER SALARY = ₹${freelancerTotal}`);
    console.log(`  (Expected in Live Feed: ₹2,865)`);

    await mongoose.disconnect();
    console.log('\n✅ Done');
}

run().catch(e => { console.error(e); process.exit(1); });
