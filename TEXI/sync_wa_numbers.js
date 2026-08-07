const mongoose = require('mongoose');

async function syncAll() {
    const uri = 'mongodb://yatree_admin:Mayank123@ac-n3u3fkt-shard-00-00.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-01.iuq9w0n.mongodb.net:27017,ac-n3u3fkt-shard-00-02.iuq9w0n.mongodb.net:27017/taxi-fleet?authSource=admin&tls=true';
    try {
        console.log('Connecting to shared DB...');
        await mongoose.connect(uri);
        
        const Tenant = mongoose.model('Tenant', new mongoose.Schema({ companyId: String, phone: String, companyName: String }), 'tenants');
        const Company = mongoose.model('Company', new mongoose.Schema({ name: String, whatsappNumber: String }), 'companies');

        const tenants = await Tenant.find({});
        console.log(`Found ${tenants.length} tenants in registry.`);

        for (const t of tenants) {
            if (t.companyId && t.phone) {
                console.log(`Syncing ${t.companyName}...`);
                // Ensure number has no spaces/dashes
                const cleanPhone = t.phone.replace(/[^0-9]/g, '');
                const finalPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                
                await Company.findByIdAndUpdate(t.companyId, { whatsappNumber: finalPhone });
                console.log(`  Set WA to ${finalPhone}`);
            }
        }

        await mongoose.disconnect();
        console.log('Migration complete.');
    } catch (e) { 
        console.error('FAILED:', e); 
        process.exit(1);
    }
}

syncAll();
