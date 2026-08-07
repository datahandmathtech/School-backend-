const mongoose = require('mongoose');
const uri = 'mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true';

async function heal() {
    await mongoose.connect(uri);
    const Company = mongoose.model('Company', new mongoose.Schema({ name: String, whatsappNumber: String }), 'companies');
    const User = mongoose.model('User', new mongoose.Schema({ mobile: String, role: String, company: mongoose.Schema.Types.ObjectId }), 'users');

    const companies = await Company.find({});
    console.log(`Found ${companies.length} companies. Healing...`);

    for (const c of companies) {
        if (c.whatsappNumber === '916367466426') {
            console.log(`Clearing hardcoded number from ${c.name}...`);
            
            // Try to find an Admin mobile to use as fallback in the DB?
            // Actually, frontend already handles fallback if we set it to null/undefined.
            await Company.findByIdAndUpdate(c._id, { $unset: { whatsappNumber: 1 } });
            console.log(`  Targetting ${c.name} for dynamic frontend fallback.`);
        }
    }
    await mongoose.disconnect();
    console.log('Database healed.');
}
heal();
