const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const gender = req.query.gender || 'unisex';
    const genderDir = path.join(uploadDir, gender);
    if (!fs.existsSync(genderDir)) {
      fs.mkdirSync(genderDir, { recursive: true });
    }
    cb(null, genderDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '';
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

// protected upload endpoint for admins
router.post('/', auth, requireAdmin, upload.array('images', 12), (req, res) => {
  try {
    const files = req.files || [];
    const gender = req.query.gender || 'unisex';
    const urls = files.map(f => `/assets/products/${gender}/${f.filename}`);
    res.json({ ok: true, files: urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Upload failed' });
  }
});

module.exports = router;
