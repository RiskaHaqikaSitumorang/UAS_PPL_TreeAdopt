// models/Tree.js
const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  benefits: { type: [String], default: [] },
  coordinates: { type: [Number], default: [] }, // Added for latitude and longitude [lat, lng]
  co2Absorption: { type: Number, default: 48 },
  oxygenProduction: { type: Number, default: 12 },
  waterAbsorption: { type: Number, default: 15 },
  adopted: { type: Number, default: 0 },
  status: { type: String, default: 'Available' },
});

module.exports = mongoose.model('Tree', treeSchema);