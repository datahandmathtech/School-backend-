const mongoose = require('mongoose');
const path = require('path');

const modelPath = path.join('c:', 'Users', 'ABHAY', 'OneDrive', 'Desktop', 'TEXI', 'taxi-fleet-crm', 'backend', 'src', 'models', 'AccidentLog.js');
const AccidentLog = require(modelPath);

async function scanAccidents() {
    try {
        const MONGO_URI = "mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true";
        await mongoose.connect(MONGO_URI);

        const allLogs = await AccidentLog.find({});
        console.log(`Found ${allLogs.length} total accident logs.`);

        allLogs.forEach(log => {
            console.log(`LogID: ${log._id}, Date: ${log.date.toISOString()}, Amount: ${log.amount}, Company: ${log.company}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

scanAccidents();
