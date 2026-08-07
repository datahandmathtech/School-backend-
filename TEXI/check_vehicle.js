const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'c:/Users/ABHAY/OneDrive/Desktop/TEXI/taxi-fleet-crm/backend/.env' });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Vehicle = mongoose.model('VCheck', new mongoose.Schema({ carNumber: String, company: mongoose.Schema.Types.ObjectId }), 'vehicles');
        const Company = mongoose.model('CCheck', new mongoose.Schema({ name: String, whatsappNumber: String }), 'companies');
        
        const vehicle = await Vehicle.findOne({ carNumber: 'RJ-27-TA-5500' });
        if (vehicle) {
            console.log('Vehicle RJ-27-TA-5500 belongs to company ID:', vehicle.company);
            const comp = await Company.findById(vehicle.company);
            if (comp) {
                console.log('Company Name:', comp.name);
                console.log('WhatsApp Number in DB:', comp.whatsappNumber);
            } else {
                console.log('Company not found for ID');
            }
        } else {
            console.log('Vehicle RJ-27-TA-5500 not found in fleet');
        }
        await mongoose.connection.close();
    } catch (e) { console.error(e); process.exit(1); }
}
check();
