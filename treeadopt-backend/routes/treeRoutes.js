const express = require('express');
const router = express.Router();
const Tree = require('../models/Tree');
const upload = require('../multer');
const fs = require('fs');
const path = require('path');

// Get all trees
router.get('/trees', async (req, res) => {
  try {
    const trees = await Tree.find();
    res.json(trees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single tree by ID
router.get('/trees/:id', async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Tree not found' });
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tree
router.post('/trees', upload.single('image'), async (req, res) => {
  const {
    name,
    category,
    price,
    location,
    description,
    benefits,
    co2Absorption,
    oxygenProduction,
    waterAbsorption,
    coordinates, // Added coordinates
  } = req.body;
  const image = req.file ? req.file.filename : '';

  if (!name || !category || !price || !location || !image) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const tree = new Tree({
    name,
    category,
    price: parseInt(price),
    location,
    image,
    description,
    benefits: benefits ? benefits.split(',').map(b => b.trim()) : [],
    coordinates: coordinates ? JSON.parse(coordinates) : [], // Parse coordinates as array
    co2Absorption: parseInt(co2Absorption) || 48,
    oxygenProduction: parseInt(oxygenProduction) || 12,
    waterAbsorption: parseInt(waterAbsorption) || 15,
  });

  try {
    const newTree = await tree.save();
    res.status(201).json(newTree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a tree
router.put('/trees/:id', upload.single('image'), async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Tree not found' });

    tree.name = req.body.name || tree.name;
    tree.category = req.body.category || tree.category;
    tree.price = req.body.price ? parseInt(req.body.price) : tree.price;
    tree.location = req.body.location || tree.location;
    tree.description = req.body.description || tree.description;
    tree.benefits = req.body.benefits ? req.body.benefits.split(',').map(b => b.trim()) : tree.benefits;
    tree.coordinates = req.body.coordinates ? JSON.parse(req.body.coordinates) : tree.coordinates; // Handle coordinates
    tree.co2Absorption = req.body.co2Absorption ? parseInt(req.body.co2Absorption) : tree.co2Absorption;
    tree.oxygenProduction = req.body.oxygenProduction ? parseInt(req.body.oxygenProduction) : tree.oxygenProduction;
    tree.waterAbsorption = req.body.waterAbsorption ? parseInt(req.body.waterAbsorption) : tree.waterAbsorption;

    if (req.file) {
      // Delete old image if a new one is uploaded
      const oldImagePath = path.join(__dirname, '../uploads', tree.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      tree.image = req.file.filename;
    }

    const updatedTree = await tree.save();
    res.json(updatedTree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tree
router.delete('/trees/:id', async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) {
      return res.status(404).json({ message: 'Tree not found' });
    }

    // Delete associated image file
    const imagePath = path.join(__dirname, '../Uploads', tree.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Tree.deleteOne({ _id: req.params.id });
    res.json({ message: 'Tree deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;