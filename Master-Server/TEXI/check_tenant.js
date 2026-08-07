const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'c:/Users/ABHAY/OneDrive/Desktop/TEXI/super-admin/backend/.env' });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Tenant = mongoose.model('TCheck', new mongoose.Schema({ companyName: String, phone: String }), 'tenants');
        const tenant = await Tenant.findOne({ companyName: /GoGetGo/i });
        if (tenant) {
            console.log('Tenant Found:', tenant.companyName);
            console.log('Phone in Super Admin:', tenant.phone);
        } else {
            console.log('Tenant not found for GoGetGo');
        }
        await mongoose.connection.close();
    } catch (e) { console.error(e); process.exit(1); }
}
check();
