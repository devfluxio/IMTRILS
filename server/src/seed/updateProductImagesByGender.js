require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const updates = [
  // Men's products
  { id: '694ccb8b1056d3d13b19c77d', gender: 'men', images: ['/assets/products/men/boxer-black.jpg'] },
  { id: '694cefff5246c927b5d6b4b5', gender: 'men', images: ['/assets/products/men/silk-boxers.jpg'] },
  { id: '694cefff5246c927b5d6b4ba', gender: 'men', images: ['/assets/products/men/cotton-brief.jpg'] },
  { id: '694cefff5246c927b5d6b4bc', gender: 'men', images: ['/assets/products/men/thermal-set.jpg'] },
  { id: '694cefff5246c927b5d6b4be', gender: 'men', images: ['/assets/products/men/microfiber-trunk.jpg'] },
  
  // Women's products
  { id: '694cccdc1056d3d13b19c782', gender: 'women', images: ['/assets/products/women/cotton-bra-1.jpg', '/assets/products/women/cotton-bra-2.jpg'] },
  { id: '694cce011056d3d13b19c787', gender: 'women', images: ['/assets/products/women/camisole-black.jpg', '/assets/products/women/camisole-blush.jpg'] },
  { id: '694cdc2562ebd44823a3784b', gender: 'women', images: ['/assets/products/women/bra-comfort.jpg'] },
  { id: '694cefff5246c927b5d6b4c0', gender: 'women', images: ['/assets/products/women/lace-bra.jpg'] },
  { id: '694cefff5246c927b5d6b4c2', gender: 'women', images: ['/assets/products/women/bamboo-brief.jpg'] },
  { id: '694cefff5246c927b5d6b4c4', gender: 'women', images: ['/assets/products/women/pushup-bra.jpg'] },
  { id: '694cefff5246c927b5d6b4c6', gender: 'women', images: ['/assets/products/women/boyshort.jpg'] },
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
        console.log('✓', p.title, '→', u.images);
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
