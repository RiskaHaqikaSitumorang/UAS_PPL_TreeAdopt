const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  treeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  treeName: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  certificateUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
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

module.exports = mongoose.model('Certificate', certificateSchema);