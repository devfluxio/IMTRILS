require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const updates = [
  {
    id: '694ccb8b1056d3d13b19c77d',
    images: ['/assets/products/red-bralette.jpg'],
  },
  {
    id: '694cccdc1056d3d13b19c782',
    images: ['/assets/products/lace-lingerie.jpg', '/assets/products/beige-lace-bralette.jpg'],
  },
  {
    id: '694cce011056d3d13b19c787',
    images: ['/assets/products/ladies-lingerie-top.jpg', '/assets/products/red-lace-undergarment.jpg'],
  },
  {
    id: '694cdc2562ebd44823a3784b',
    images: ['/assets/products/red-lace-undergarment.jpg'],
  },
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
        console.log('Updated', p.title, 'with images:', u.images);
      } else {
        console.log('Product not found:', u.id);
      }
    } catch (err) {
      console.error('Error updating', u.id, err.message);
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
