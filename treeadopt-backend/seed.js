// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

require('dotenv').config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await User.findOne({ email: 'admin@treeadopt.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        name: 'Admin',
        email: 'admin@treeadopt.com',
        password: hashedPassword,
        phone: '+6281234567890',
        role: 'admin',
        userType: 'individual',
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    mongoose.connection.close();
  }
};

seedAdmin();