const mongoose = require('mongoose');
const path = require('path');

// Try to load model with absolute path
const modelPath = path.join('c:', 'Users', 'ABHAY', 'OneDrive', 'Desktop', 'TEXI', 'taxi-fleet-crm', 'backend', 'src', 'models', 'AccidentLog.js');
const AccidentLog = require(modelPath);

async function checkAccidents() {
    try {
        const MONGO_URI = "mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true";
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected!');

        const logsCount = await AccidentLog.countDocuments({});
        console.log(`Total Accident Logs in DB: ${logsCount}`);

        const logs = await AccidentLog.find({}).sort({ date: -1 }).limit(5);
        console.log('Recent Logs:');
        logs.forEach(log => {
            console.log(`- ID: ${log._id}, Date: ${log.date}, Amount: ${log.amount}, Company: ${log.company}`);
        });

        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        console.log(`Checking range: ${start.toISOString()} to ${end.toISOString()}`);

        const monthlyTotal = await AccidentLog.aggregate([
            { $match: { date: { $gte: start, $lte: end } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        console.log(`Current Month Total: ${monthlyTotal[0]?.total || 0}`);

        // Also check if there are any logs for different companies
        const companyTotals = await AccidentLog.aggregate([
            { $group: { _id: '$company', total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);
        console.log('Company Totals:');
        companyTotals.forEach(ct => {
            console.log(`- CompanyID: ${ct._id}, Total Amount: ${ct.total}, Count: ${ct.count}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

checkAccidents();
