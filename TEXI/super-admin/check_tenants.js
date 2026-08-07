const mongoose = require('mongoose');
const Tenant = require('./backend/src/models/Tenant');
require('dotenv').config({ path: './backend/.env' });

async function checkTenant() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Super Admin DB');
        const tenants = await Tenant.find({});
        console.log('Tenants:', JSON.stringify(tenants, null, 2));
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkTenant();
