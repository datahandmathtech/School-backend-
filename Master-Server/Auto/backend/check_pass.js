require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); 

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: 'admin@gmail.com' });
        if (!user) {
            console.log('User not found');
            process.exit();
        }
        const isMatch = await user.matchPassword('123456');
        console.log(`Password match for 123456: ${isMatch}`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
