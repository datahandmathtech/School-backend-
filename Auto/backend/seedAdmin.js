require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); 

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
        if (existingAdmin) {
            console.log('Admin already exists!');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: 'password123', // I'll set a standard password
            role: 'admin'
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@gmail.com');
        console.log('Password: password123');
        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
