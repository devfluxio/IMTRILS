require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const updates = [
  { id: '694ccb8b1056d3d13b19c77d', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4b5', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4ba', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4bc', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4be', images: ['/assets/hero.webp'] },
  { id: '694cccdc1056d3d13b19c782', images: ['/assets/hero.webp'] },
  { id: '694cce011056d3d13b19c787', images: ['/assets/hero.webp'] },
  { id: '694cdc2562ebd44823a3784b', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4c0', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4c2', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4c4', images: ['/assets/hero.webp'] },
  { id: '694cefff5246c927b5d6b4c6', images: ['/assets/hero.webp'] },
];

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  for (const u of updates) {
    try {
      const p = await Product.findByIdAndUpdate(u.id, { images: u.images }, { new: true });
      if (p) {
        console.log('✓', p.title, '→ placeholder');
      } else {
        console.log('✗ Not found:', u.id);
      }
    } catch (err) {
      console.error('✗ Error updating', u.id, ':', err.message);
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
