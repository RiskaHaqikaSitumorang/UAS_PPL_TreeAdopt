const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const treeRoutes = require('./routes/treeRoutes');
const userRoutes = require('./routes/userRoutes');
const certificateRoutes = require('./routes/certificateRoutes'); 
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Connect to MongoDB
connectDB();

// Remove invalid index on certificates collection
async function removeInvalidIndex() {
  try {
    const collection = mongoose.connection.db.collection('certificates');
    const indexes = await collection.indexInformation();
    if (indexes['certificateId_1']) {
      await collection.dropIndex('certificateId_1');
      console.log('Berhasil menghapus indeks certificateId_1');
    } else {
      console.log('Indeks certificateId_1 tidak ditemukan');
    }
  } catch (error) {
    console.error('Gagal menghapus indeks certificateId_1:', error.message);
  }
}

// Pastikan koneksi database sudah terbuka sebelum menghapus indeks
mongoose.connection.once('open', () => {
  console.log('MongoDB terhubung');
  removeInvalidIndex();
});

// Routes
app.use('/api', treeRoutes);
app.use('/api', userRoutes);
app.use('/api', certificateRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(UploadsDir, { recursive: true });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Kesalahan server:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan di server!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));