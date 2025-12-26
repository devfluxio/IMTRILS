const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products?category=women&gender=women&page=1&pageSize=12
router.get('/', async (req, res) => {
  try {
    const { category, gender, page = 1, pageSize = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limit = Math.max(1, parseInt(pageSize, 10) || 12);

    const filter = {};
    if (gender) filter.gender = String(gender);
    if (category) {
      // match category in categories array (case-insensitive) or slug/title
      const cat = String(category).toLowerCase();
      filter.$or = [
        { categories: { $in: [new RegExp(cat, 'i')] } },
        { title: { $regex: new RegExp(cat, 'i') } },
      ];
    }

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    res.json({ products, totalCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id - single product
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
