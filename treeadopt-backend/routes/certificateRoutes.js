// Updated certificateRoutes.js to include /certificates/all and DELETE endpoint
const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const Tree = require('../models/Tree');
const User = require('../models/User');
const upload = require('../multer');
const { authMiddleware, adminMiddleware } = require('../middleware/auth'); // Ensure this is correctly imported
const path = require('path');
const fs = require('fs');

// Create a certificate
router.post('/certificates', upload.single('certificate'), async (req, res) => {
  const { userId, treeId, name, email, treeName, paymentMethod } = req.body;
  const certificateFile = req.file ? req.file.filename : '';

  if (!userId || !treeId || !name || !email || !treeName || !paymentMethod || !certificateFile) {
    console.log('Missing required fields:', { userId, treeId, name, email, treeName, paymentMethod, certificateFile });
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const tree = await Tree.findById(treeId);
    if (!tree) {
      console.log(`Invalid treeId: ${treeId}`);
      return res.status(404).json({ message: 'Tree not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log(`Invalid userId: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    tree.adopted = Number(tree.adopted) + 1;
    await tree.save();

    user.adoptedTrees.push(treeId);
    await user.save();

    const certificate = new Certificate({
      userId,
      treeId,
      name,
      email,
      treeName,
      paymentMethod,
      certificateUrl: certificateFile,
      date: new Date(),
    });

    const newCertificate = await certificate.save();
    res.status(201).json({
      _id: newCertificate._id,
      userId: newCertificate.userId,
      treeId: {
        _id: tree._id,
        category: tree.category,
        location: tree.location,
        price: tree.price,
        co2Absorption: tree.co2Absorption,
        oxygenProduction: tree.oxygenProduction,
        waterAbsorption: tree.waterAbsorption,
      },
      name: newCertificate.name,
      email: newCertificate.email,
      treeName: newCertificate.treeName,
      paymentMethod: newCertificate.paymentMethod,
      certificateUrl: newCertificate.certificateUrl ? `http://localhost:5000/uploads/${newCertificate.certificateUrl}` : null,
      date: newCertificate.date,
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate certificate error. Please try again.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Get all certificates (admin only)
router.get('/certificates/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching all certificates for admin`);
    const certificates = await Certificate.find()
      .populate({
        path: 'treeId',
        select: 'category location price co2Absorption oxygenProduction waterAbsorption',
      })
      .lean();
    
    if (!certificates || certificates.length === 0) {
      console.log('No certificates found');
      return res.status(200).json([]);
    }

    const formattedCertificates = certificates.map((cert) => ({
      _id: cert._id.toString(),
      name: cert.name,
      treeName: cert.treeName,
      treeId: {
        category: cert.treeId?.category || 'Unknown',
        location: cert.treeId?.location || 'Unknown',
        price: Number(cert.treeId?.price) || 0,
        co2Absorption: Number(cert.treeId?.co2Absorption) || 0,
        oxygenProduction: Number(cert.treeId?.oxygenProduction) || 0,
        waterAbsorption: Number(cert.treeId?.waterAbsorption) || 0,
      },
      date: cert.date,
      paymentMethod: cert.paymentMethod,
      certificateUrl: cert.certificateUrl ? `http://localhost:5000/uploads/${cert.certificateUrl}` : null,
    }));

    console.log(`[${new Date().toISOString()}] Returning ${formattedCertificates.length} certificates for admin`);
    res.status(200).json(formattedCertificates);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching all certificates:`, error);
    res.status(500).json({ message: 'Failed to fetch certificates: ' + error.message });
  }
});

// Get certificates by user ID
router.get('/certificates/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`[${new Date().toISOString()}] Fetching certificates for userId: ${userId}`);

    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`Invalid userId format: ${userId}`);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const certificates = await Certificate.find({ userId })
      .populate({
        path: 'treeId',
        select: 'category location price co2Absorption oxygenProduction waterAbsorption',
      })
      .lean();
    console.log(`[${new Date().toISOString()}] Found ${certificates.length} certificates for userId: ${userId}`, certificates);

    // Return empty array if no certificates found
    if (!certificates || certificates.length === 0) {
      console.log(`No certificates found for userId: ${userId}`);
      return res.status(200).json([]);
    }

    // Map certificates to match frontend expectations
    const formattedCertificates = certificates.map((cert) => ({
      _id: cert._id.toString(),
      name: cert.name,
      treeName: cert.treeName,
      treeId: {
        category: cert.treeId?.category || 'Unknown',
        location: cert.treeId?.location || 'Unknown',
        price: Number(cert.treeId?.price) || 0,
        co2Absorption: Number(cert.treeId?.co2Absorption) || 0,
        oxygenProduction: Number(cert.treeId?.oxygenProduction) || 0,
        waterAbsorption: Number(cert.treeId?.waterAbsorption) || 0,
      },
      date: cert.date,
      paymentMethod: cert.paymentMethod,
      certificateUrl: cert.certificateUrl ? `http://localhost:5000/uploads/${cert.certificateUrl}` : null,
    }));

    console.log(`[${new Date().toISOString()}] Returning ${formattedCertificates.length} certificates for userId: ${userId}`);
    res.status(200).json(formattedCertificates);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching certificates:`, error);
    res.status(500).json({ message: 'Failed to fetch certificates: ' + error.message });
  }
});

// Get a single certificate by ID (for download)
router.get('/certificates/:id', async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching certificate with id: ${req.params.id}`);
    const certificate = await Certificate.findById(req.params.id)
      .populate({
        path: 'treeId',
        select: 'category location price co2Absorption oxygenProduction waterAbsorption',
      })
      .lean();

    if (!certificate) {
      console.log(`Certificate not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({
      _id: certificate._id.toString(),
      name: certificate.name,
      treeName: certificate.treeName,
      treeId: {
        category: certificate.treeId?.category || 'Unknown',
        location: certificate.treeId?.location || 'Unknown',
        price: Number(certificate.treeId?.price) || 0,
        co2Absorption: Number(certificate.treeId?.co2Absorption) || 0,
        oxygenProduction: Number(certificate.treeId?.oxygenProduction) || 0,
        waterAbsorption: Number(certificate.treeId?.waterAbsorption) || 0,
      },
      date: certificate.date,
      paymentMethod: certificate.paymentMethod,
      certificateUrl: certificate.certificateUrl ? `http://localhost:5000/uploads/${certificate.certificateUrl}` : null,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching certificate:`, error);
    res.status(500).json({ message: 'Failed to fetch certificate: ' + error.message });
  }
});

// Delete a certificate by ID (admin only)
router.delete('/certificates/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Attempting to delete certificate with id: ${req.params.id}`);
    
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      console.log(`Certificate not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Update related Tree and User data
    const tree = await Tree.findById(certificate.treeId);
    if (tree) {
      tree.adopted = Math.max(0, Number(tree.adopted) - 1); // Decrease adopted count
      await tree.save();
    }

    const user = await User.findById(certificate.userId);
    if (user) {
      user.adoptedTrees = user.adoptedTrees.filter(
        (treeId) => treeId.toString() !== certificate.treeId.toString()
      );
      await user.save();
    }

    // Delete the certificate file from uploads if it exists
    if (certificate.certificateUrl) {
      const filePath = path.join(__dirname, '../Uploads', certificate.certificateUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }

    // Delete the certificate from the database
    await Certificate.findByIdAndDelete(req.params.id);
    
    console.log(`[${new Date().toISOString()}] Certificate deleted: ${req.params.id}`);
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error deleting certificate:`, error);
    res.status(500).json({ message: 'Failed to delete certificate: ' + error.message });
  }
});

module.exports = router;