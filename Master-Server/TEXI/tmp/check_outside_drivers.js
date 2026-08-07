const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/ABHAY/OneDrive/Desktop/TEXI/taxi-fleet-crm/backend/.env' });
const User = require('c:/Users/ABHAY/OneDrive/Desktop/TEXI/taxi-fleet-crm/backend/src/models/User');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const drivers = await User.find({ name: /outside/i });
        console.log('Drivers with Outside in name:');
        console.log(JSON.stringify(drivers, null, 2));
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
run();
