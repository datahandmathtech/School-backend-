const mongoose = require('mongoose');
const AccidentLog = require('./taxi-fleet-crm/backend/src/models/AccidentLog');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

async function checkAccidents() {
    try {
        const MONGO_URI = "mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true";
        await mongoose.connect(MONGO_URI);
        const logs = await AccidentLog.find({}).sort({ date: -1 }).limit(10);
        console.log('Last 10 Accident Logs:');
        logs.forEach(log => {
            console.log(`- Date: ${log.date}, Amount: ${log.amount}, Company: ${log.company}`);
        });

        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const monthlyTotal = await AccidentLog.aggregate([
            { $match: { date: { $gte: start, $lte: end } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        console.log(`Current Month Total: ${monthlyTotal[0]?.total || 0}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAccidents();
