const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const User = require('../backend/src/models/User');

const clearExecutives = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taxi-fleet';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const result = await User.deleteMany({ role: 'Executive' });
        console.log(`Deleted ${result.deletedCount} old executive admins.`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

clearExecutives();
