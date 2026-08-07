const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'c:/Users/ABHAY/OneDrive/Desktop/TEXI/taxi-fleet-crm/backend/.env' });

async function check() {
    try {
        console.log('Connecting to', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        const Schema = mongoose.Schema;
        const companySchema = new Schema({ name: String, whatsappNumber: String }, { collection: 'companies' });
        const Company = mongoose.model('CompCheck', companySchema);
        const companies = await Company.find({});
        console.log('--- CRM COMPANIES ---');
        companies.forEach(c => console.log('Name:', c.name, 'WhatsApp:', c.whatsappNumber));
        await mongoose.connection.close();
    } catch (e) { console.error(e); process.exit(1); }
}
check();
