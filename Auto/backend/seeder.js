require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await User.findOne({ 
            $or: [{ email: 'admin@fleet.com' }, { email: 'admin@gmail.com' }] 
        });
        
        if (adminExists) {
            // Update existing admin if found
            adminExists.email = 'admin@gmail.com';
            adminExists.password = '123456';
            await adminExists.save();
            console.log('Admin user updated successfully');
            process.exit();
        }

        await User.create({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: '123456',
            role: 'admin'
        });

        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
