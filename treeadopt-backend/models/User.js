// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  userType: { type: String, required: true, enum: ['individual', 'organization', 'company'] },
  adoptedTrees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tree' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);