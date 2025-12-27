const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, requireAdmin } = require('../middleware/auth');

// Create product (admin)
router.post('/products', auth, requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    const product = new Product(data);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List products (admin)
router.get('/products', auth, requireAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', auth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
const fs = require('fs');
const path = require('path');

router.delete('/products/:id', auth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });

    // Delete all images associated with the product
    if (Array.isArray(product.images)) {
      product.images.forEach(imgPath => {
        // Only delete if path starts with /uploads/
        if (typeof imgPath === 'string' && imgPath.startsWith('/uploads/')) {
          const absPath = path.join(__dirname, '../../../public', imgPath);
          fs.unlink(absPath, err => {
            if (err) console.error('Failed to delete image:', absPath, err.message);
          });
        }
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
